class Licedata: 

    def __init__(self, locnr, lice_binary, lice_data, lice_year, lice_average):
        self.locnr = int(locnr)
        self.lice_binary = bool(lice_binary)
        self.lice_data = lice_data # json format
        self.lice_year = lice_year
        self.lice_average = lice_average
        

    def print_licedata(self): 
        print("Printing licedata")
        print(self.locnr)
        print(self.lice_binary)
        print(self.lice_data)
        print(self.lice_year)
        print(self.lice_average)

    def getlist(self): 
        return [self.locnr, self.lice_binary, self.lice_data, self.lice_year, self.lice_average]