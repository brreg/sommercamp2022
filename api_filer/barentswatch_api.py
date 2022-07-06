import json
import requests as r
from rauth.service import OAuth2Service
import os

#Get fishhealth data 

def get_api_data(locnumber):

    barentswatch = OAuth2Service(
        name='barentswatch',
        client_id= os.environ["api_user"],
        client_secret=os.environ["api_password"],
        authorize_url='https://id.barentswatch.no/connect/authorize',
        access_token_url='https://id.barentswatch.no/connect/token',
        base_url='https://www.barentswatch.no/bwapi/')

    data = {
        'scope': 'api',
        'grant_type': 'client_credentials',
        }

    session = barentswatch.get_auth_session(data=data, decoder=json.loads)

    res = r.get('https://www.barentswatch.no/bwapi/v1/geodata/fishhealth/locality/'+locnumber+'/avgfemalelice/2022', 
    headers = {'Authorization' : 'Bearer ' + session.access_token})

    rjson = (res.json())
    return rjson
    
print(get_api_data('45017'))

#lage en deserealizer tar inn json og spytter ut data som vi kan håndtere i kode