from calendar import c
from turtle import turtles
import psycopg2
import os
from configparser import ConfigParser
import pandas as pd
import numpy as np
import psycopg2.extras as extras
import requests as r
import math


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
            CREATE TABLE salmon_death(
                ID SERIAL PRIMARY KEY,
                loc_nr INTEGER,
                death_nr INTEGER,
                death_year VARCHAR(8),
                CONSTRAINT fk_loc_nr
                    FOREIGN KEY (loc_nr) 
                        REFERENCES location(loc_nr)
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

            # maybe populate smb and locnrs here? 
            cur.close()
            self.conn.commit()

        except (Exception, psycopg2.DatabaseError) as error:
            print("create", error)
            
        finally:
            if self.conn is not None:
                self.conn.close()
 
    def insert_lice_data(self, df):

        try: 
            self.conn = psycopg2.connect(
            host="localhost",
            database="postgres",
            user=os.environ["database_user"],
            password=os.environ["database_password"])
            
            df_list = df.values.tolist()
            for lst in df_list:
                tup = tuple(lst)
                print(tup)

                """ INSERT INTO salmonoid_lice (loc_nr, lice, lice_nr, lice_week, lice_year)
                    SELECT 10029, True, 0.4, 20, '2020'
                    WHERE  EXISTS (
                    SELECT loc_nr from location where loc_nr = 10029
                    FOR SHARE
                    );
                        """
                newtup = (tup[0], tup[1], tup[2], tup[3], tup[4], tup[0])
                stmt = """INSERT INTO salmonoid_lice (loc_nr, lice, lice_nr, lice_week, lice_year) SELECT %s, %s, %s, %s, %s WHERE EXISTS (SELECT loc_nr from location where loc_nr = %s
                    FOR SHARE);"""
                print(stmt)
                cursor = self.conn.cursor()

                try:
                    cursor.execute(stmt, newtup)
                    #extras.execute_values(cursor, query, df_tuple)
                    self.conn.commit()
                except (Exception, psycopg2.DatabaseError) as error:
                    print("Error: %s" % error)
                    self.conn.rollback()
                    cursor.close()
                    return 1
                print("the dataframe is inserted")
                cursor.close()
            

        except(Exception, psycopg2.DatabaseError) as error:
            print(error)

        finally: 
            if self.conn is not None:
                self.conn.close()

    def insert_escape_data(self, df, tablename):
        print("trying to insert data")

        command = "ON CONFLICT(loc_nr) DO NOTHING;"
        print(command)

        try: 
            self.conn = psycopg2.connect(
            host="localhost",
            database="postgres",
            user=os.environ["database_user"],
            password=os.environ["database_password"])
            
            df_list = df.values.tolist()
            print("len: " + str(len(df_list)))
            #print("df_list: ", df_list)
            for lst in df_list:
            
                query = 'INSERT INTO ' + str(tablename) + ' VALUES ' + str(tuple(lst)) + command
                print(query)
                cursor = self.conn.cursor()

                try:
                    cursor.execute(query)
                    #extras.execute_values(cursor, query, df_tuple)
                    self.conn.commit()
                except (Exception, psycopg2.DatabaseError) as error:
                    print("Error: %s" % error)
                    self.conn.rollback()
                    cursor.close()
                    return 1
                print("the dataframe is inserted")
                cursor.close()
            

        except(Exception, psycopg2.DatabaseError) as error:
            print(error)

        finally: 
            if self.conn is not None:
                self.conn.close()
    
    def get_locnrs(self):
        res = r.get(
        'https://www.barentswatch.no/bwapi/v1/geodata/fishhealth/localitieswithsalmonoids',
        headers = { 'Authorization' : 'Bearer ' + self.session.access_token })

        df = pd.DataFrame(res.json())

        locnrs = df['localityNo'].tolist()
        
        return locnrs
        
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
            print(stmt_smb)
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
        