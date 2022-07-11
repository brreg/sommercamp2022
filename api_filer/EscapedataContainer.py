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
        df_dict = {}
        locnr = []
        year = []
        week = []
        escapecount = []
        captured = []
        capturestart = []
        escapedescription = []

        #self.locnr, self.year, self.week, self.escapecount, self.captured, self.capturestart, self.escapedescription
        for escapedata in self.escapedatalist: 
            edlist = escapedata.getlist()
            locnr.append(edlist[0])
            year.append(edlist[1])
            week.append(edlist[2])
            escapecount.append(edlist[3])
            captured.append(edlist[4])
            capturestart.append(edlist[5])
            escapedescription.append(edlist[6])
            
        df_dict["locnr"] = locnr
        df_dict["year"] = year
        df_dict["week"] = week
        df_dict["escapecount"] = escapecount
        df_dict["captured"] = captured
        df_dict["capturestart"] = capturestart
        df_dict["escapedescription"] = escapedescription

        return pd.DataFrame(df_dict)

