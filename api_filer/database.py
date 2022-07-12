from turtle import turtles
import psycopg2
import os
from configparser import ConfigParser
import pandas as pd
import numpy as np
import psycopg2.extras as extras

class Database:

    def __init__(self):
        self.filename='database.ini'
        self.conn = None
    
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
                org_address VARCHAR(255) PRIMARY KEY,
                org_zipcode INTEGER,
                org_city VARCHAR(255)
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
                loc_nr INTEGER PRIMARY KEY,
                lice BOOL,
                lice_nr FLOAT,
                lice_week INTEGER,
                live_year INTERVAL,
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

            cur.close()
            self.conn.commit()

        except (Exception, psycopg2.DatabaseError) as error:
            print("create", error)
            
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
            df_tuple = tuple(df_list[0])

            print("df_tuple: ", df_tuple)

            #cols = ','.join(list(df.columns))
            #print(cols)
            
            
            query = 'INSERT INTO ' + str(tablename) + ' VALUES ' + str(df_tuple)
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
        
        
        

    def insert_data(self):
        
        #sql = "INSERT INTO samlonoid_lice(loc_nr, lice, lice_nr, lice_limit, lice_week, live_year) VALUES(%s, %s, %s, %s, %s, %s)"
        #sql = "INSERT INTO samlonoid_lice VALUES (45017, True, 3, '4', '5', '6');"
        
        try:

            cur = conn.cursor()
            cur.execute(sql)
            conn.commit()
            cur.close()
        
            
                   
        except (Exception, psycopg2.DatabaseError) as error:
            print("insert", error)


        finally:
            if self.conn is not None:
                self.conn.close()
                print('Database connection closed.')

    
    def insert_loc_nr(self, filename):
        data = pd.read_csv(filename, delimiter=';')
        loc_nr = data['LOK_NR'].tolist()
        print(loc_nr)