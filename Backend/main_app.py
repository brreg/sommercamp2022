import threading
import time
import logging
from barentswatch_api import API
from licedata import Licedata
import licedata_container as ldc
from database import Database
import escapedata as ed
import EscapedataContainer as edc
from regn import RegnskapsAPI


# 45032 og 45017

# locality 30156 has escape data in year 2016

filename = 'smb.csv'


def main():
    database1 = Database()
    database1.connect()
    database1.config()

    bapi = API()
    locnrs = bapi.get_locnrs()[0:50]
    years = [2017, 2018, 2019, 2020, 2021]#[0:1]

    #### Inserting all lice data into database, for each year and each location number
    licedata_container = bapi.get_many_lice_data(locnrs, years)
    df = licedata_container.getDataFrame()
    database1.insert_data(df, "salmonoid_lice") 

    #### Inserting all escape data into database
    #edcontainer = bapi.get_many_escape_data(locnrs, years)
    #eddf = edcontainer.getDataFrame()
    #database1.insert_data(eddf, "escapes")
    
    ### Generating all deadliness data and inserting into database
    #dfdead = database1.generate_deadliness_data(locnrs, filename, 2022)
    #print(dfdead)
    #database1.insert_data(dfdead, "salmon_death")
    
    #rapi = RegnskapsAPI()
    #orgnrs = rapi.get_orgnrs()[0:50]
    #rdcontainer = rapi.get_many_nokkeltall(orgnrs, years)
    #df_regnskap = rdcontainer.get_dataframe()
    #database1.insert_data(df_regnskap, "key_financial_figures")


main()
