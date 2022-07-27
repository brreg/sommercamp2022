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

def fill_db(locnrs, years):
    ### function that fills the database in every category for the given locnrs and years
    print("a")

def main():

    db = Database()
    db.connect()
    db.config()
    db.create_tables()
    db.insert_address_smb_locnr_csv(filename)

    bapi = API()
    #locnrs = bapi.get_locnrs()[0:50]
    locnrs = [29276, 20776, 18015, 20595, 25835, 29336, 11611, 32877, 24735, 28976, 11651, 
    13563, 26595, 13641, 13653, 11758, 11687, 11690, 11649, 13209, 13823, 12131]
    years = [2017, 2018, 2019, 2020, 2021]#[0:1]

    #### Inserting all lice data into database, for each year and each location number
    #licedata_container = bapi.get_many_lice_data(locnrs, years)
    #df = licedata_container.getDataFrame()
    #db.insert_data(df, "salmonoid_lice") 

    #### Inserting all escape data into database
    #edcontainer = bapi.get_many_escape_data(locnrs, years)
    #eddf = edcontainer.getDataFrame()
    #print(eddf)
    #db.insert_data(eddf, "escapes")
    
    ### Generating all deadliness data and inserting into database
    #dfdead = db.generate_deadliness_data(locnrs, filename, 2017)
    #print(dfdead)
    #db.insert_data(dfdead, "salmon_death")
    
    #rapi = RegnskapsAPI()
    #orgnrs = rapi.get_orgnrs()[0:50]
    #rdcontainer = rapi.get_many_nokkeltall(orgnrs, years)
    #df_regnskap = rdcontainer.get_dataframe()
    #db.insert_data(df_regnskap, "key_financial_figures")


main()
