import psycopg2
from config import config
import os

def create_tables():

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

    conn = None

    try:
        params = config()
        conn = psycopg2.connect(
            host="localhost",
            database="postgres",
            user=os.environ["database_user"],
            password=os.environ["database_password"]
        )
        cur = conn.cursor()

        for command in commands:
            cur.execute(command)

        cur.close()
        conn.commit()

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        
    finally:
        if conn is not None:
            conn.close()

if __name__ == '__main__':
    create_tables()

