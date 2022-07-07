from turtle import turtles
import psycopg2
import os
from configparser import ConfigParser
import pandas as pd
import numpy as np
import psycopg2.extras as extras

class Database_class:

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
                port="5433",
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
            CREATE TABLE samlonoid_lice (
                loc_nr INTEGER PRIMARY KEY,
                lice BOOL,
                lice_nr INTEGER,
                lice_limit INTEGER,
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
                port="5433",
                user=os.environ["database_user"],
                password=os.environ["database_password"]
            )
            cur = self.conn.cursor()

            for command in commands:
                cur.execute(command)

            cur.close()
            self.conn.commit()

        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
            
        finally:
            if self.conn is not None:
                self.conn.close()

    def insert_lice_data(self, df, table):
        tuples = [tuple(x) for x in df.to_numpy()]

        cols = ','.join(list(df.columns))

        query = "INSERT INTO %s(%s) VALUES %%s" % (table, cols)
        cursor = self.conn.cursor()

        try:
            extras.execute_values(cursor, query, tuples)
            self.conn.commit()
        except (Exception, psycopg2.DatabaseError) as error:
            print("Error: %s" % error)
            self.conn.rollback()
            cursor.close()
            return 1
        print("the dataframe is inserted")
        cursor.close()

        self.conn = psycopg2.connect(
            host="localhost",
                database="postgres",
                port="5433",
                user=os.environ["database_user"],
                password=os.environ["database_password"]
        )


    


'''
database1 = Database()
database1.connect()
database1.config()
database1.create_tables()
'''