import threading
import time
import logging
from barentswatch_api import API
from licedata import Licedata
from licedata_container import LicedataContainer
from database import Database
import escapedata as ed
import escapedataContainer as edc


def main():
    database1 = Database()
    bapi = API()
    escapedata = bapi.get_escape_data(45017, 2022)
    #print(escapedata)
    escapedata_object = ed.Escapedata(escapedata["localityNo"], escapedata["year"], escapedata["data"])
    edcontainer = edc.EscapedataContainer()
    edcontainer.add_escapedata(escapedata_object)
    eddf = edcontainer.getDataFrame()
    #print(eddf)
    database1.connect()
    database1.config()
    database1.create_tables()
    database1.insert_lice_data(eddf, 'escapes')


main()