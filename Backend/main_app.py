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

# locality 30156 has escape data in year 2016

filename = '/Users/ingunn/Documents/GitHub/sommercamp2022/Dataanalyse/smb.csv'


def main():
    database1 = Database()
    database1.connect()
    database1.config()
    database1.create_tables()
    database1.insert_address_smb_locnr_csv(filename)

    bapi = API()
    locnrs = bapi.get_locnrs()[10:50]
    years = [2015, 2016, 2017, 2018, 2019, 2020, 2021][2:4]

    #### Inserting all lice data into database, for each year and each location number
    licedata_container = bapi.get_many_lice_data(locnrs, years)
    df = licedata_container.getDataFrame()
    database1.insert_lice_data(df) 

    #### Inserting all escape data into database
    #edcontainer = bapi.get_many_escape_data(locnrs, years)
    #eddf = edcontainer.getDataFrame()
    #database1.insert_data(eddf, 'escapes')
    
    ### Generating all deadliness data and inserting into database
    
    

main()
