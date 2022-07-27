import pandas as pd

class EscapedataContainer: 

    def __init__(self):
        self.escapedatalist = []

    def add_escapedata(self, escapedata): 
        self.escapedatalist.append(escapedata)

    # should return a pandas dataframe with all the lice data
    # Kolonne navn:
    # Locnr, Year, Week, Data, EscapeCountSum
    def getDataFrame(self):
        df_dict = {}
        locnr = []
        year = []
        data = []
        escape_count_sum = []
 

        #self.locnr, self.year, self.data, self.escape_count_sum
        for escapedata in self.escapedatalist: 
            edlist = escapedata.getlist()
            locnr.append(edlist[0])
            year.append(edlist[1])
            data.append(edlist[2])
            escape_count_sum.append(edlist[3])
        
            
        df_dict["locnr"] = locnr
        df_dict["year"] = year
        df_dict["data"] = data
        df_dict["escape_count_sum"] = escape_count_sum

        return pd.DataFrame(df_dict)

