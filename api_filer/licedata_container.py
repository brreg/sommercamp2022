import pandas as pd

class licedataContainer:
    def __init__(self): 
        self.licedatalist = []

    def addLiceData(self, licedata): 
        self.licedatalist.append(licedata)

    def addLiceDataList(self, licedatalist):
        for licedata in licedatalist: 
            self.addLiceData(licedata)

    # should return a pandas dataframe with all the lice data
    def getDataFrame(self):
        df_list = []
        for licedata in self.licedatalist: 
            ldlist = licedata.getlist()
            df_list.append(ldlist)
        return pd.DataFrame(df_list)
