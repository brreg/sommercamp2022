import json
import requests as r
from rauth.service import OAuth2Service
import pandas as pd
import numpy as np
import os

barentswatch = OAuth2Service(
    name='barentswatch',
    client_id=os.environ["b_user"],
    client_secret=os.environ["b_password"],
    authorize_url='https://id.barentswatch.no/connect/authorize',
    access_token_url='https://id.barentswatch.no/connect/token',
    base_url='https://www.barentswatch.no/bwapi/')

data = {
    'scope': 'api',
    'grant_type': 'client_credentials',
    }

session = barentswatch.get_auth_session(data=data, decoder=json.loads)

lokalitet = '45017'

res = r.get('https://www.barentswatch.no/bwapi/v1/geodata/fishhealth/locality/'+lokalitet+'/avgfemalelice/2022', 
headers = {'Authorization' : 'Bearer ' + session.access_token})

print(res.json())