from calendar import c
from turtle import turtles
import psycopg2
import os
from configparser import ConfigParser
import pandas as pd
import numpy as np
import psycopg2.extras as extras
import requests as r
import json
import math
import time
import random

filename = '/Users/ingunn/Documents/GitHub/sommercamp2022/Dataanalyse/smb.csv'

class Database:

    def __init__(self):
        self.filename='database.ini'
        self.conn = None
        self.section='postgresql' 
    
    def connect(self):
        try:

            print("Connecting to the PostgreSQL database...")
            
            self.conn = psycopg2.connect(
                host="localhost",
                database="postgres",
                user=os.environ["database_user"],
                password=os.environ["database_password"])
            
            cur = self.conn.cursor()
            
            print("PostgreSQL database version:")
            cur.execute("SELECT version()")

            db_version = cur.fetchone()
            print(db_version)

            cur.close()

        except (Exception, psycopg2.DatabaseError) as error:
            
                print("connect",error)
            

        finally:
            if self.conn is not None:
                self.conn.close()
                print("Database connection closed.")

    def config(self):
        section=self.section
        parser = ConfigParser()
        parser.read(self.filename)

        # get section, default to postgresql
        db = {}
        if parser.has_section(section):
            params = parser.items(section)
            for param in params:
                db[param[0]] = param[1]
                print(param[0], param[1])
            print('Database configurated')
        else:
            raise Exception('Section {0} not found in the {1} file'.format(self.section, self.filename))

        return db
    
    # Creates database tables
    def create_tables(self):

        commands = (

            """
            CREATE TABLE address (
                ID SERIAL PRIMARY KEY,
                org_address VARCHAR(255),
                org_zipcode INTEGER,
                org_city VARCHAR(255),
                UNIQUE(org_address, org_zipcode, org_city)
            )
            """,
            
            """
            CREATE TABLE smb (
                org_nr INTEGER PRIMARY KEY,
                org_name VARCHAR(255),
                org_address_id INTEGER,
                CONSTRAINT fk_org_address_id
                    FOREIGN KEY (org_address_id) 
                        REFERENCES address(ID)
            )
            """,

        
            """
            CREATE TABLE location (
                loc_nr INTEGER PRIMARY KEY,
                org_nr INTEGER,
                loc_name VARCHAR(255),
                loc_capacity FLOAT,
                CONSTRAINT fk_org_nr 
                    FOREIGN KEY (org_nr)
                        REFERENCES smb(org_nr)
                
            )
            """,

            """
            CREATE TABLE salmonoid_lice (
                ID SERIAL PRIMARY KEY,
                loc_nr INTEGER,
                lice BOOL,
                lice_nr FLOAT,
                lice_week INTEGER,
                lice_year VARCHAR(8),
                UNIQUE(loc_nr, lice_week, lice_year),
                CONSTRAINT fk_loc_nr 
                    FOREIGN KEY (loc_nr) 
                        REFERENCES location(loc_nr)
            )
            """,

            """
            CREATE TABLE escapes (
                ID SERIAL PRIMARY KEY,
                loc_nr INTEGER,
                escape_year VARCHAR(8),
                escape_week INTEGER,
                escape_count INTEGER,
                escape_captured INTEGER,
                escape_capturestart BOOL,
                escape_description VARCHAR(1000),
                CONSTRAINT fk_loc_nr    
                    FOREIGN KEY (loc_nr) 
                        REFERENCES location(loc_nr)
            )
            """,

            """
            CREATE TABLE producers (
                producer_id INTEGER PRIMARY KEY,
                producer VARCHAR(255),
                co2_ekvival FLOAT
            )
            """, 

            """
            CREATE TABLE salmon_death (
                ID SERIAL PRIMARY KEY,
                loc_nr INTEGER,
                death_nr INTEGER,
                death_year VARCHAR(8),
                CONSTRAINT fk_loc_nr
                    FOREIGN KEY (loc_nr) 
                        REFERENCES location(loc_nr)
            )

            """,

            """
            CREATE TABLE greenhouse_gas_emissions (
                ID SERIAL PRIMARY KEY,
                loc_nr INTEGER,
                year VARCHAR(8),
                producer_id INTEGER,
                eFcr FLOAT,
                production FLOAT,
                co2e_feed FLOAT,
                co2e_transport FLOAT,
                CONSTRAINT fk_loc_nr
                    FOREIGN KEY(loc_nr)
                        REFERENCES location(loc_nr),
                CONSTRAINT fk_producer_id
                    FOREIGN KEY(producer_id)
                        REFERENCES producers(producer_id)
              
            )
            """, 

            """
            CREATE TABLE key_financial_figures (
                ID SERIAL PRIMARY KEY,
                org_nr INTEGER,
                year VARCHAR(8),
                liquidity_ratio FLOAT,
                return_on_assets FLOAT,
                solidity FLOAT,
                CONSTRAINT fk_org_nr
                    FOREIGN KEY(org_nr)
                        REFERENCES smb(org_nr)
            )
            """,

            """
            CREATE TABLE social_figures (
                ID SERIAL PRIMARY KEY,
                org_nr INTEGER,
                year VARCHAR(8),
                female_percent FLOAT,
                male_percent FLOAT,
                CONSTRAINT fk_org_nr
                    FOREIGN KEY(org_nr)
                        REFERENCES smb(org_nr)

            )
            """
        )

        try:

            self.conn = psycopg2.connect(
                host="localhost",
                database="postgres",
                user=os.environ["database_user"],
                password=os.environ["database_password"]
            )
            cur = self.conn.cursor()

            for command in commands:
                cur.execute(command)

            cur.close()
            self.conn.commit()

        except (Exception, psycopg2.DatabaseError) as error:
            print("create", error)
            
        finally:
            if self.conn is not None:
                self.conn.close()
    
    ### Inserts data in df into either salmonoid_lice ELLER escapes tables in our database
    def insert_data(self, df, tablename):
        print("Inserting data")
        try: 
            self.conn = psycopg2.connect(
            host="localhost",
            database="postgres",
            user=os.environ["database_user"],
            password=os.environ["database_password"])
            
            df_list = df.values.tolist()
            for lst in df_list:
                
                if (tablename == "salmonoid_lice"): 
                    newtup = (lst[0], lst[1], lst[2], lst[3], lst[4], lst[0])
                    stmt = """INSERT INTO salmonoid_lice (loc_nr, lice, lice_nr, lice_week, lice_year) 
                                SELECT %s, %s, %s, %s, %s 
                                WHERE EXISTS (SELECT loc_nr from location where loc_nr = %s
                                FOR SHARE);"""

                elif (tablename == "escapes"): 
                    newtup = (lst[0], lst[1], lst[2], lst[3], lst[4], lst[5], lst[6], lst[0])
                    stmt = """INSERT INTO escapes (loc_nr, escape_year, escape_week, escape_count, escape_captured, escape_capturestart, escape_description) 
                                SELECT %s, %s, %s, %s, %s, %s, %s
                                WHERE EXISTS (SELECT loc_nr from location where loc_nr = %s
                                FOR SHARE);"""

                elif (tablename == "salmon_death"): 
                    newtup = (lst[0], lst[1], lst[2], lst[0])
                    stmt = """INSERT INTO salmon_death (loc_nr, death_nr, death_year) 
                                SELECT %s, %s, %s
                                WHERE EXISTS (SELECT loc_nr from location where loc_nr = %s
                                FOR SHARE);"""
                
                elif (tablename == "key_financial_figures"):
                    newtup = (lst[0], lst[1], lst[2], lst[3], lst[4], lst[0])
                    print(newtup)
                    stmt = """INSERT INTO key_financial_figures (org_nr, year, liquidity_ratio, return_on_assets, solidity) 
                                SELECT %s, %s, %s, %s, %s
                                WHERE EXISTS (SELECT org_nr from smb where org_nr = %s
                                FOR SHARE);"""
                
                else: 
                    print("Tablename should be salmonoid_lice, salmon_death, key_financial_figures or escape")
                    break

                cursor = self.conn.cursor()

                try:
                    cursor.execute(stmt, newtup)
                    self.conn.commit()
                except (Exception, psycopg2.DatabaseError) as error:
                    print("Error: %s" % error)
                    self.conn.rollback()
                    cursor.close()
                    return 1
                cursor.close()
            

        except(Exception, psycopg2.DatabaseError) as error:
            print(error)

        finally: 
            if self.conn is not None:
                self.conn.close()

    # Returns a list of location numbers with salmonoids that are fetched from Barentswatch
    def get_locnrs(self):
        res = r.get(
        'https://www.barentswatch.no/bwapi/v1/geodata/fishhealth/localitieswithsalmonoids',
        headers = { 'Authorization' : 'Bearer ' + self.session.access_token })

        df = pd.DataFrame(res.json())

        locnrs = df['localityNo'].tolist()
        
        return locnrs
    
    # Inserts address, smb and locnr data from the filename.csv and inserts it into our database
    def insert_address_smb_locnr_csv(self, filename): 
        df = pd.read_csv(filename, sep = ';')
        df['LOK_KAP'] = df['LOK_KAP'].str.replace(',','.')
        addresses = []
        smbs = []
        locs = []

        for tup in df.itertuples():
            if (math.isnan(tup[4])):
                postcode = 0000
            else: 
                postcode = int(tup[4])
            address_record = (str(tup[3]), postcode, str(tup[5]))
            addresses.append(address_record)
            smb_record = (int(tup[1]), str(tup[2]), str(tup[3]))
            smbs.append(smb_record)
            loc_record = (int(tup[6]), int(tup[1]), str(tup[7]), float(tup[10]))
            locs.append(loc_record)

        try:
            self.conn = psycopg2.connect(
            host="localhost",
            database="postgres",
            user=os.environ["database_user"],
            password=os.environ["database_password"])

            cur = self.conn.cursor()

            ### execute many insertion commands for address, smb and loc
            stmt_address = """INSERT INTO address (org_address, org_zipcode, org_city) VALUES(%s, %s, %s) ON CONFLICT (org_address, org_zipcode, org_city) DO NOTHING;"""
            cur.executemany(stmt_address, addresses)
            
            ## how to get this statement to convert org_address to org_address_ID ???? 
            ## need to select ID where org_address = org_address
            stmt_smb = """INSERT INTO smb (org_nr, org_name, org_address_id) VALUES(%s, %s, (SELECT ID from address WHERE org_address=%s LIMIT 1)) ON CONFLICT (org_nr) DO NOTHING;"""
            #print(stmt_smb)
            cur.executemany(stmt_smb, smbs)


            stmt_loc = """INSERT INTO location (loc_nr, org_nr, loc_name, loc_capacity) VALUES(%s, %s, %s, %s) ON CONFLICT (loc_nr) DO NOTHING;"""
            cur.executemany(stmt_loc, locs)

            self.conn.commit()
            cur.close()

        except(Exception, psycopg2.DatabaseError) as error:
            print(error)

        finally: 
            if self.conn is not None:
                self.conn.close()

    def generate_deadliness_data(self, locnrs, filename, year): 
        dfdead = pd.DataFrame()
        dfas = pd.read_csv(filename, sep = ';')
        dfas['LOK_KAP'] = dfas['LOK_KAP'].str.replace(',','.')

        totalgood = 0
        totalfail = 0
        locnrmedas = []
        for i in locnrs:
            if len(dfas.loc[dfas['LOK_NR'] == i]) == 1:
                totalgood += 1
                locnrmedas.append(i)
            else:
                totalfail +=1

        deadlighet = []
        for i in locnrmedas:
            enhet = dfas.loc[dfas['LOK_NR'] == i]['LOK_ENHET'].values[0]
            #kapasitet = dfas.loc[dfas['LOK_NR'] == i]['LOK_KAP'].values[0]
            
            if enhet == 'STK':
                konvertert = int(int(dfas.loc[dfas['LOK_NR'] == i]['LOK_KAP'].values[0])/5)
                dfas['LOK_KAP'][dfas.loc[dfas['LOK_NR']==i].index[0]] = konvertert
                dfas['LOK_ENHET'][dfas.loc[dfas['LOK_NR']==i].index[0]] = 'TN'
            elif enhet == 'KG':
                konvertert = int(int(dfas.loc[dfas['LOK_NR'] == i]['LOK_KAP'].values[0])/1000)
                dfas['LOK_KAP'][dfas.loc[dfas['LOK_NR']==i].index[0]] = konvertert
                dfas['LOK_ENHET'][dfas.loc[dfas['LOK_NR']==i].index[0]] = 'TN'
            elif enhet == 'M3':
                konvertert = int(int(dfas.loc[dfas['LOK_NR'] == i]['LOK_KAP'].values[0])*0.005)
                dfas['LOK_KAP'][dfas.loc[dfas['LOK_NR']==i].index[0]] = konvertert
                dfas['LOK_ENHET'][dfas.loc[dfas['LOK_NR']==i].index[0]] = 'TN'
               
            deadlighet.append(int(float(dfas.loc[dfas['LOK_NR'] == i]['LOK_KAP'].values[0])*random.uniform(12.5, 17.5)/100))
            
        dictdead = {'LOK_NR':locnrmedas,'Deadlighet':deadlighet, 'Year': year}#, 'Enhet': 'TN'}
        dfdead = pd.DataFrame(dictdead)
        return dfdead
