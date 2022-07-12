from turtle import turtles
import psycopg2
import os
from configparser import ConfigParser
import pandas as pd
import numpy as np
import psycopg2.extras as extras
import requests as r


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
                print(error)

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
                org_address VARCHAR(255),
                org_zipcode INTEGER,
                org_city VARCHAR(255),
                PRIMARY KEY(org_address, org_zipcode, org_city)
            )
            """,
            
            """
            CREATE TABLE smb (
                org_nr INTEGER PRIMARY KEY,
                org_name VARCHAR(255),
                org_address VARCHAR(255),
                CONSTRAINT fk_org_address 
                    FOREIGN KEY (org_address) 
                        REFERENCES address(org_address)
            )
            """,

        
            """
            CREATE TABLE location (
                loc_nr INTEGER PRIMARY KEY,
                org_nr INTEGER,
                loc_name VARCHAR(255),
                loc_capacity INTEGER,
                CONSTRAINT fk_org_nr 
                    FOREIGN KEY (org_nr)
                        REFERENCES smb(org_nr)
                
            )
            """,

            """
            CREATE TABLE salmonoid_lice (
                loc_nr INTEGER,
                lice BOOL,
                lice_nr FLOAT,
                lice_week INTEGER,
                lice_year INTERVAL,
                PRIMARY KEY(loc_nr, lice_year, lice_week),
                CONSTRAINT fk_loc_nr 
                    FOREIGN KEY (loc_nr) 
                        REFERENCES location(loc_nr)
            )
            """,

            """
            CREATE TABLE escapes (
                loc_nr INTEGER,
                escape_nr INTEGER,
                escape_year INTERVAL,
                escape_week INTEGER,
                CONSTRAINT fk_loc_nr    
                    FOREIGN KEY (loc_nr) 
                        REFERENCES location(loc_nr)
            )
            """,

            """
            CREATE TABLE salmon_death(
                loc_nr INTEGER,
                death_nr INTEGER,
                death_year INTERVAL,
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
            print(error)
            
        finally:
            if self.conn is not None:
                self.conn.close()

    
    def insert_data(self, df, tablename):
        print("trying to insert data")

        try: 
            self.conn = psycopg2.connect(
            host="localhost",
            database="postgres",
            user=os.environ["database_user"],
            password=os.environ["database_password"])

            #df = df.astype(str)
            #print(df)
            #tuples = [tuple(x) for x in df.to_numpy()]
            
            df_list = df.values.tolist()
            #print("df_list: ", df_list)
            for lst in df_list: 
            
                query = 'INSERT INTO ' + str(tablename) + ' VALUES ' + str(tuple(lst))
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
        
    def insert_address_and_locnr_from_csv(self, filename): 
        df = pd.read_csv(filename, sep = ';')

        addresses = []

        for tup in df.itertuples():
            address_record = (tup[3], int(tup[4]), tup[5])
            print(address)
            addresses.append(address_record)
            #locnr
            break
        
        """
        data = [
                ('Jane', date(2005, 2, 12)),
                ('Joe', date(2006, 5, 23)),
                ('John', date(2010, 10, 3)),
        ]
        stmt = "INSERT INTO employees (first_name, hire_date) VALUES (%s, %s)"
        cursor.executemany(stmt, data)

        """

        try: 
            self.conn = psycopg2.connect(
            host="localhost",
            database="postgres",
            user=os.environ["database_user"],
            password=os.environ["database_password"])

            ### execute many insertion commands

        except(Exception, psycopg2.DatabaseError) as error:
            print(error)

        finally: 
            if self.conn is not None:
                self.conn.close()
        

    def insert_address_record(self, address): 
        print("here comes a function to insert one address record into DB")

        
        
    def insert_locnr_record(self, record): 
        print("here comes a function to insert one locrnr record into DB")