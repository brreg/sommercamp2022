import threading
import time
import logging
from barentswatch_api import API
from licedata import Licedata
import licedata_container as ldc
from database import Database
import escapedata as ed
import escapedataContainer as edc


# 45032 og 45017

def main():
    database1 = Database()
    bapi = API()
    #escapedata = bapi.get_escape_data(45032, 2022)
    #print(escapedata)
    #escapedata_object = ed.Escapedata(escapedata["localityNo"], escapedata["year"], escapedata["data"])
    #edcontainer = edc.EscapedataContainer()
    #edcontainer.add_escapedata(escapedata_object)
    #eddf = edcontainer.getDataFrame()
    #print(eddf)

    licedata = bapi.get_lice_data(45017, 2022)
    licedata.pop("type")
    licedata["data"] = bapi.make_week_dict_lice(licedata["data"])
    print(licedata)

    # put one fishhealthdata record into multiple LiceData objects
    licedatalist = bapi.putlicedataintoobjects(licedata)

    # put licedata objects into licedata container
    licedata_container = ldc.LicedataContainer()
    licedata_container.addLiceDataList(licedatalist)

    df = licedata_container.getDataFrame()
    database1.connect()
    database1.config()
    database1.create_tables()
    database1.insert_data(df, 'samlonoid_lice')


main()