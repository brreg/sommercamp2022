import json
import requests as r
from rauth.service import OAuth2Service
import os
import pandas as pd

def make_week_dict(week_value_list):
    # input is a list of dictionaries with week and value
    week_dict = {}
    for dct in week_value_list: 
        week = dct["week"]
        value = dct["value"]
        week_dict[week] = value
    #output is a dictionary with key=week, value=value
    return week_dict

    
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
    
        
def __main__(): 
    bapi = API()
    
    #locnrs= bapi.get_locnrs()
    
    fishhealthdata = bapi.get_lice_data(45032, 2022)
    escapedata = bapi.get_escape_data(45032, 2022)
    
    print(fishhealthdata)
    fishhealthdata["data"] = make_week_dict(fishhealthdata["data"])
    print(fishhealthdata)
    fishhealthdata.pop("type")
    print(fishhealthdata)
    df = pd.DataFrame(fishhealthdata)

    print(df)

if __name__ == "__main__":
    __main__()
