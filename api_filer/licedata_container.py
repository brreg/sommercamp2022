from multiprocessing.sharedctypes import Value
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
        df_dict = {}
        locnr = []
        value = []
        binary = []
        week = []
        year = []

        for licedata in self.licedatalist: 
            ldlist = licedata.getlist()
            locnr.append(ldlist[0])
            binary.append(ldlist[1])
            value.append(ldlist[2])
            week.append(ldlist[3])
            year.append(ldlist[4])
            
        df_dict["locnr"] = locnr
        df_dict["value"] = value
        df_dict["binary"] = binary
        df_dict["week"] = week
        df_dict["year"] = year
        return pd.DataFrame(df_dict)
