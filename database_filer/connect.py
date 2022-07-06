import psycopg2
from config import config
import os

def connect(filename='database.ini', section='postgresql'):
    conn = None

    try:
        params = config()

        print("Connecting to the PostgreSQL database...")
        conn = psycopg2.connect(
            host="localhost",
            database="postgres",
            user=os.environ["database_user"],
            password=os.environ["database_password"])
        
        cur = conn.cursor()
        
        print("PostgreSQL database version:")
        cur.execute("SELECT version()")

        db_version = cur.fetchone()
        print(db_version)

        cur.close()

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        if conn is not None:
            conn.close()
            print("Database connection closed.")

if __name__ == "__main__":
    connect()