from multiprocessing.sharedctypes import Value
import pandas as pd

class LicedataContainer:
    def __init__(self): 
        self.licedatalist = []

    def addLiceData(self, licedata): 
        if licedata is not None:
            self.licedatalist.append(licedata)

    def addLiceDataList(self, licedatalist):
        for licedata in licedatalist: 
            self.addLiceData(licedata)

    # should return a pandas dataframe with all the lice data
    def getDataFrame(self):
        df_dict = {}
        locnr = []
        data = []
        binary = []
        year = []
        average = []

        for licedata in self.licedatalist: 
            ldlist = licedata.getlist()
            locnr.append(ldlist[0])
            binary.append(ldlist[1])
            data.append(ldlist[2])
            year.append(str(ldlist[3]))
            average.append(ldlist[4])
            
        df_dict["locnr"] = locnr
        df_dict["binary"] = binary
        df_dict["data"] = data
        df_dict["year"] = year
        df_dict["average"] = average
        return pd.DataFrame(df_dict)
