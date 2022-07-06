import psycopg2
from config import config
import os

def create_tables():

    commands = (
        """
        CREATE TABLE smb (
            org_nr INTERGER(9) PRIMARY KEY,
            org_name VARCHAR(255),
            org_kommune VARCHAR(255),
            leader VARCHAR(255),
        )
        """
    )

    conn = None

    try:
        params = config()
        conn = psycopg2.connect(
            host="localhost",
            port="5433",
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

