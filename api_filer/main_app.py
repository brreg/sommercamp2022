import threading
import time
import logging
from barentswatch_api import API
from licedata import LiceData
from licedata_container import LicedataContainer
from database_filer.database import Database

class MainApp:
    
    def __init__(self):
        self.database = Database()
        