import json
from pickle import FALSE, TRUE
import requests as r
from rauth.service import OAuth2Service
import os
import pandas as pd
import licedata as ld
import licedata_container as ldc
import escapedata as ed
import EscapedataContainer as edc
import random

## locality with lice data 45032
## locality with escape data 45017

filename = '/Users/ingunn/Documents/GitHub/sommercamp2022/Dataanalyse/smb.csv'

    
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
    
    def make_dfas(self, filename, locnrs):
        dfas = pd.read_csv(filename, sep = ';')
        dfas['LOK_KAP'] = dfas['LOK_KAP'].str.replace(',','.')
        #dfas.loc[dfas['LOK_NR'] == 10362]
        totalgood = 0
        totalfail = 0
        locnrmedas = []
        for locnr in locnrs:
            if len(dfas.loc[dfas['LOK_NR'] == locnr]) == 1:
                totalgood += 1
                locnrmedas.append(locnr)
            else:
                totalfail +=1
        return dfas

    
    # returns licedata from one year at one locnr in json format
    def get_lice_data(self, locnr, year):

        lice_res = r.get('https://www.barentswatch.no/bwapi/v1/geodata/fishhealth/locality/'+str(locnr)+'/avgfemalelice/'+str(year), 
        headers = {'Authorization' : 'Bearer ' + self.session.access_token})

        lice_json = lice_res.json()
        
        return lice_json

    # input is a list of locnrs and a list of years
    # returns a licedata container with many licedata objects inside
    def get_many_lice_data(self, locnrs, years):
        licedata_container = ldc.LicedataContainer() # container to store all lice data
        for year in years: 
            for locnr in locnrs: 

                licedata = self.get_lice_data(locnr, year)
                licedata.pop("type")
                licedata["data"] = self.make_week_dict_lice(licedata["data"])
                #print(licedata)

                # put one fishhealthdata record into multiple LiceData objects
                licedatalist = self.put_lice_data_into_objects(licedata)

                # put licedata objects into licedata container
                licedata_container.addLiceDataList(licedatalist)
                
        return licedata_container
    
    def get_escape_data(self, locnr, year):
        
        escape_res = r.get('https://www.barentswatch.no/bwapi/v1/geodata/fishhealth/locality/'+str(locnr)+'/escape/'+str(year),
        headers = { 'Authorization' : 'Bearer ' + self.session.access_token})
        
        
        escape_json = escape_res.json()
        
        return escape_json

    def get_many_escape_data(self, locnrs, years): 

        edcontainer = edc.EscapedataContainer()
        for year in years: 
            for locnr in locnrs: 

                escapedata = self.get_escape_data(locnr, year)
                ## check if there is any escape data! if no escape data, don't add to edcontainer
                if (len(escapedata["data"]) > 0):
                    escapedata_object = ed.Escapedata(escapedata["localityNo"], escapedata["year"], escapedata["data"])
                    edcontainer.add_escapedata(escapedata_object)
                else: 
                    pass

        return edcontainer


    def make_week_dict_lice(self, week_value_list):
        # input is a list of dictionaries with week and value
        week_dict = {}
        for dct in week_value_list: 
            week = dct["week"]
            value = dct["value"]
            week_dict[week] = value
        #output is a dictionary with key=week, value=value
        return week_dict

    def put_lice_data_into_objects(self, fishhealthdata) :
        # input is a dictionary of the form {localityNo: , year: , data: {weeks:values}}
        licedatalist = []
        for week in fishhealthdata["data"].keys():
            # if there are no lice, licebinary = FALSE, otherwise, licebinary = TRUE
            if (fishhealthdata["data"][week] > 0):
                licebinary = True
            else: 
                licebinary = False
            licedata = ld.Licedata(fishhealthdata["localityNo"], 
                                    fishhealthdata["data"][week], 
                                    licebinary, 
                                    week, 
                                    fishhealthdata["year"])
            licedatalist.append(licedata)
        #return list of LiceData objects
        return licedatalist



