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

#filename = 'smb.csv'

def fill_db():

    years = [2021]
    
    #Export passwords for both API's
    #Files: 'as.csv', 'smb.csv', 'arealbruk3.csv', 'lice_limit.csv', 'part_time_percentages.csv'

    #Creating database and tables
    db = Database()
    db.connect()
    db.config()
    #db.create_tables()

    """
    db.create_tables()

    time.sleep(3)
    
    #Fill licedata:
    bapi = API()
    locs = bapi.get_locnrs()
    locnrs = db.get_valid_orgs(locs)
    locnrs = list(dict.fromkeys(locnrs))
    print(len(locnrs))
    licedata_container = bapi.get_many_lice_data(locnrs, years)
    df = licedata_container.getDataFrame()
    db.insert_data(df, 'salmonoid_lice')
    time.sleep(1)
    
    #Insert lice limit
    #db.insert_lice_limit('lice_limit.csv')
    #time.sleep(1)
    
    '''
    #Fill basic data about locations, addresses and orgs
    db.insert_address_smb_locnr_csv('smb.csv')
    

    
    #Insert lice limit
    db.insert_lice_limit('lice_limit.csv')
    time.sleep(1)
    
    #Generate and insert escape data
    edcontainer = bapi.get_many_escape_data(locnrs, years)
    eddf = edcontainer.getDataFrame()
    print(eddf)
    db.insert_data(eddf, 'escapes')
    time.sleep(1)
    
    #Generate and insert deadliness data
    for year in years:
        dfdead = db.generate_deadliness_data(locnrs, 'as.csv', year)
        db.insert_data(dfdead, 'salmon_death')
        time.sleep(1)
    time.sleep(1)
    
    
    #Get account data from API and insert to database
    rapi = RegnskapsAPI()
    orgnrs = rapi.get_orgnrs()[0:20]
    rdcontainer = rapi.get_many_nokkeltall(orgnrs, years)
    df_regnskap = rdcontainer.get_dataframe()
    db.insert_data(df_regnskap, "key_financial_figures")
    time.sleep(1)
    
    #Insert producers
    db.add_producers()
    time.sleep(1)
    
    #Generate and insert co2 data
    for year in years:
        dfas = db.getasdata('as.csv') 
        dfdead = db.generate_deadliness_data(locnrs, 'as.csv', year)
        co2df = db.generate_co2_data(locnrs, year, dfas, dfdead)
        db.insert_data(co2df, 'greenhouse_gas_emissions')
        time.sleep(1)
    
    #Insert areal data
    db.insert_areal_data('arealbruk3.csv')
    time.sleep(1)
    
    #Generate and insert social data
    socialdf = db.generate_social_figures(years)
    db.insert_data(socialdf, 'social_figures')
    time.sleep(1)

    #Generate and insert part time data
    db.insert_part_time_data('part_time_percentages.csv')
    time.sleep(1)

    '''
    #db.update_db_averages()


    
    db.update_db_averages()
    """

fill_db()


'''
def main():

    dfdead = db.generate_deadliness_data(locnrs, 'as.csv', years)
    db.insert_data(dfdead, 'salmon_death')
    time.sleep(1)
    db = Database()
    db.connect()
    db.config()
    db.create_tables()
    db.insert_address_smb_locnr_csv(filename)

    #bapi = API()
    #locnrs = bapi.get_locnrs()[0:50]
    locnrs = [29276, 20776, 18015, 20595, 25835, 29336, 11611, 32877, 24735, 28976, 11651, 
    13563, 26595, 13641, 13653, 11758, 11687, 11690, 11649, 13209, 13823, 12131]
    years = [2017, 2018, 2019, 2020, 2021]#[0:1]
    


    #### Inserting all lice data into database, for each year and each location number
    #licedata_container = bapi.get_many_lice_data(locnrs, years)
    #df = licedata_container.getDataFrame()
    #db.insert_data(df, "salmonoid_lice") 
    #db.insert_lice_limit("hello")

    #### Inserting all escape data into database
    #edcontainer = bapi.get_many_escape_data(locnrs, years)
    #eddf = edcontainer.getDataFrame()
    #print(eddf)
    #db.insert_data(eddf, "escapes")
    
    ### Generating all deadliness data and inserting into database
    # for year in years:
    #     dfdead = db.generate_deadliness_data(locnrs, "smb.csv", year)
    #     print(dfdead)
    #     db.insert_data(dfdead, "salmon_death")
    

    #rapi = RegnskapsAPI()
    #orgnrs = rapi.get_orgnrs()[0:50]
    #orgnrs = [886813082]
    #rdcontainer = rapi.get_many_nokkeltall(orgnrs, years)
    #df_regnskap = rdcontainer.get_dataframe()
    #db.insert_data(df_regnskap, "key_financial_figures")
    
    ###Generating and inserting co2 data. Needs to use dfas and dfdead

    #db.add_producers()
    dfas = db.getasdata('as.csv') 
    #print(dfas)
    #dfdead = db.generate_deadliness_data(locnrs, 'as.csv', 2017)
    #print(dfdead)
    #co2df = db.generate_co2_data(locnrs, years, dfas, dfdead)
    #db.insert_data(co2df, 'greenhouse_gas_emissions')

    ###Generate and insert gender data:
    df_gender = db.generate_social_figures(years)
    db.insert_data(df_gender, 'social_figures')

main()
'''
