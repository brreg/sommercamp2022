import requests
import os
import pandas as pd
from regndata import Regndata
from regndatacontainer import RegndataContainer
import time
import json
from database import Database

class RegnskapsAPI:

    def __init__(self):

        self.rapi_user = os.environ["rapi_user"]
        self.rapi_password = os.environ["rapi_password"]

    #Get list of orgnrs
    def get_orgnrs(self):

        dfas = pd.read_csv('as.csv', sep = ';')
        dfas['LOK_KAP'] = dfas['LOK_KAP'].str.replace(',','.')
        as_liste = dfas['ORG.NR/PERS.NR'].tolist()
        return as_liste

    def get_regnskap(self, orgnr, year):
        url = 'https://data.brreg.no/regnskapsregisteret/regnskap/'+str(orgnr)+'?%C3%A5r='+str(year)+'&regnskapstype=SELSKAP'
        response = requests.get(url, auth=(self.rapi_user, self.rapi_password))
        time.sleep(2)
        return response.json()
    
    def get_nokkeltall(self, orgnr, year):

        try:
            url = 'https://data.brreg.no/regnskapsregisteret/regnskap/'+str(orgnr)+'?%C3%A5r='+str(year)+'&regnskapstype=SELSKAP'
            response = requests.get(url, auth=(self.rapi_user, self.rapi_password))
            res = response.json()
            try:
                finansKostnader = res[0]['resultatregnskapResultat']['finansresultat']['finanskostnad']['sumFinanskostnad']
            except:
                finansKostnader = 0
            try: 
                sumKortsiktigGjeld = res[0]['egenkapitalGjeld']['gjeldOversikt']['kortsiktigGjeld']['sumKortsiktigGjeld']
            except:
                sumKortsiktigGjeld = 0
                
            sumOmlopsmidler = res[0]['eiendeler']['omloepsmidler']['sumOmloepsmidler']
            ordinertResultatForSkatt = res[0]['resultatregnskapResultat']['ordinaertResultatFoerSkattekostnad']
            sumGjeldEgenkapital = res[0]['egenkapitalGjeld']['sumEgenkapitalGjeld']
            sumEgenkapital = res[0]['egenkapitalGjeld']['egenkapital']['sumEgenkapital']
            
            resFjor = self.get_regnskap(orgnr,year-1)
            sumGjeldEgenkapitalFjor = resFjor[0]['egenkapitalGjeld']['sumEgenkapitalGjeld']
            
            likviditetsgrad = sumOmlopsmidler/sumKortsiktigGjeld
            
            lonnsomhet = ((ordinertResultatForSkatt+finansKostnader)*100)/((sumGjeldEgenkapital+sumGjeldEgenkapitalFjor)/2)
            
            soliditet = (sumEgenkapital*100)/(sumGjeldEgenkapital)
            
            dictNokTall = {
                        "org_nr":(orgnr),
                        "year":(year),
                        "liquidity_ratio": round(likviditetsgrad, 2),
                        "return_on_assets": round(lonnsomhet, 2),
                        "solidity": round(soliditet, 2)
                        }
            time.sleep(2)
            return dictNokTall
        
        except:
            dictNokTall = {
                            "org_nr":(orgnr),
                            "year":(year),
                            "liquidity_ratio": 0,
                            "return_on_assets": 0,
                            "solidity": 0
                            }
            time.sleep(2)
            return (dictNokTall)


    def get_many_nokkeltall(self, orgnrs, years):

        rdcontainer = RegndataContainer()

        for year in years:
            for org in orgnrs:
                regndata = self.get_nokkeltall(org, year)
                print(regndata)
                print(type(regndata))
                object = Regndata(org, year, regndata['liquidity_ratio'], regndata['return_on_assets'], regndata['solidity'])
                rdcontainer.add_regndata(object)
        
        return rdcontainer

    #Take in list as parameter, return as regndata-object
    def get_object(self, tall):

        regndata = Regndata(tall[0], tall[1], tall[2], tall[3], tall[4])
        return regndata



#eksempel insert:
'''db1 = Database()
db1.connect()
rapi = RegnskapsAPI()
orgnrs = rapi.get_orgnrs()[0:5]
year = [2020]
regndata_container = rapi.get_many_nokkeltall(orgnrs, year)
df = regndata_container.get_dataframe()
db1.insert_data(df, "key_financial_figures")
'''