import pandas as pd

class LicedataContainer:
    def __init__(self): 
        self.licedatalist = []

    def addLiceData(self, licedata): 
        self.licedatalist.append(licedata)

    def addLiceDataList(self, licedatalist):
        for licedata in licedatalist: 
            self.addLiceData(licedata)

    # should return a pandas dataframe with all the lice data
    def getDataFrame(self):
        return pd.DataFrame(self.licedatalist)
