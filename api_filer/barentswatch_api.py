import json
from pickle import FALSE, TRUE
import requests as r
from rauth.service import OAuth2Service
import os
import pandas as pd
import licedata as ld
import licedata_container as ldc


    
#Get fishhealth data 

class API:
    
    
    def __init__(self):
        
        self.barentswatch = OAuth2Service(
        name='barentswatch',
        client_id= os.environ["api_user"],
        client_secret=os.environ["api_password"],
        authorize_url='https://id.barentswatch.no/connect/authorize',
        access_token_url='https://id.barentswatch.no/connect/token',
        base_url='https://www.barentswatch.no/bwapi/')
                         
        self.data = {
            'scope': 'api',
            'grant_type': 'client_credentials',
            }
        
        self.session = self.barentswatch.get_auth_session(data=self.data, decoder=json.loads)
        
    
    def get_locnrs(self):
        res = r.get(
        'https://www.barentswatch.no/bwapi/v1/geodata/fishhealth/localitieswithsalmonoids',
        headers = { 'Authorization' : 'Bearer ' + self.session.access_token })

        df = pd.DataFrame(res.json())

        locnrs = df['localityNo'].tolist()
        
        return locnrs
        
    def get_lice_data(self, locnr, year):

        lice_res = r.get('https://www.barentswatch.no/bwapi/v1/geodata/fishhealth/locality/'+str(locnr)+'/avgfemalelice/'+str(year), 
        headers = {'Authorization' : 'Bearer ' + self.session.access_token})

        lice_json = lice_res.json()
        
        return lice_json
    
    def get_escape_data(self, locnr, year):
        
        escape_res = r.get('https://www.barentswatch.no/bwapi/v1/geodata/fishhealth/locality/'+str(locnr)+'/escape/'+str(year),
        headers = { 'Authorization' : 'Bearer ' + self.session.access_token})
        
        escape_json = escape_res.json()
        
        return escape_json
    
    def make_week_dict(self, week_value_list):
        # input is a list of dictionaries with week and value
        week_dict = {}
        for dct in week_value_list: 
            week = dct["week"]
            value = dct["value"]
            week_dict[week] = value
        #output is a dictionary with key=week, value=value
        return week_dict

    def putlicedataintoobject(self, fishhealthdata) :
        # input is a dictionary of the form {localityNo: , year: , data: {weeks:values}}
        licedatalist = []
        for week in fishhealthdata["data"].keys():
            # if there are no lice, licebinary = FALSE, otherwise, licebinary = TRUE
            if (fishhealthdata["data"][week] > 0):
                licebinary = True
            else: 
                licebinary = False
            licedata = ld.LiceData(fishhealthdata["localityNo"], 
                                    fishhealthdata["data"][week], 
                                    licebinary, 
                                    week, 
                                    fishhealthdata["year"])
            licedatalist.append(licedata)
        #return list of LiceData objects
        return licedatalist
        
def __main__(): 
    bapi = API()
    
    #locnrs= bapi.get_locnrs()
    #escapedata = bapi.get_escape_data(45032, 2022)

    # gets lice data about one locnr, in a given year, as a dictionary
    fishhealthdata = bapi.get_lice_data(45032, 2022)
    fishhealthdata.pop("type")

    # changing form of the week data to a dictionary with weeks as keys and values as values
    fishhealthdata["data"] = bapi.make_week_dict(fishhealthdata["data"])
    print(fishhealthdata)

    # put one fishhealthdata record into multiple LiceData objects
    licedatalist = bapi.putlicedataintoobject(fishhealthdata)

    # put licedata objects into licedata container
    licedata_container = ldc.LicedataContainer()
    licedata_container.addLiceDataList(licedatalist)

    df = licedata_container.getDataFrame()
    print(df)

if __name__ == "__main__":
    __main__()


api = API()