import pandas as pd

class EscapedataContainer: 

    def __init__(self):
        self.escapedatalist = []

    def add_escapedata(self, escapedata): 
        self.escapedatalist.append(escapedata)

    # should return a pandas dataframe with all the lice data
    # Kolonne navn:
    # Locnr, Year, Week, EscapeCount, Captured, CaptureStart, EscapeDescription
    def getDataFrame(self):
        df_list = []
        for escapedata in self.escapedatalist: 
            edlist = escapedata.getlist()
            df_list.append(edlist)
        return pd.DataFrame(df_list)