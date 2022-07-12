class Licedata: 

    def __init__(self, locnr, lice_value, lice_binary, lice_week, lice_year):
        self.locnr = int(locnr)
        self.lice_value = lice_value
        self.lice_binary = bool(lice_binary)
        self.lice_week = lice_week
        self.lice_year = lice_year
        

    def print_licedata(self): 
        print("Printing licedata")
        print(self.locnr)
        print(self.lice_value)
        print(self.lice_binary)
        print(self.lice_week)
        print(self.lice_year)

    def getlist(self): 
        return [self.locnr, self.lice_binary, self.lice_value, self.lice_week, self.lice_year]