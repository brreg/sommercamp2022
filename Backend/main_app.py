import threading
import time
import logging
from barentswatch_api import API
from licedata import Licedata
import licedata_container as ldc
from database import Database
import escapedata as ed
import EscapedataContainer as edc


# 45032 og 45017
filename = '/Users/ingunn/Documents/GitHub/sommercamp2022/Dataanalyse/smb.csv'


def main():
    database1 = Database()
    database1.connect()
    database1.config()
    database1.create_tables()
    database1.insert_address_smb_locnr_csv(filename)

    bapi = API()
    locnrs = bapi.get_locnrs()
    years = [2015, 2016, 2017, 2018, 2019, 2020, 2021]

    #### Inserting all lice data into database, for each year and each location number? 
    licedata_container = bapi.get_many_lice_data(locnrs, years)
    # After extracting all licedata from barentswatch API, insert into our DB
    df = licedata_container.getDataFrame()
    database1.insert_data(df, 'salmonoid_lice')


    #### Inserting all escape data into database

    #escapedata = bapi.get_escape_data(45032, 2022)
    #print(escapedata)
    #escapedata_object = ed.Escapedata(escapedata["localityNo"], escapedata["year"], escapedata["data"])
    #edcontainer = edc.EscapedataContainer()
    #edcontainer.add_escapedata(escapedata_object)
    #eddf = edcontainer.getDataFrame()

    
    ### Inserting all deadliness data into database
    
    
    

    

main()
