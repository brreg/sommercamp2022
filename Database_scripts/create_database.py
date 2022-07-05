import psycopg2
import config
from configparser import ConfigParser
import os


def config(filename='database.ini', section='postgresql'):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)

    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))

    return db

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

