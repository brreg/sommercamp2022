class LiceData: 

    def __init__(self, locnr, lice_value, lice_binary, lice_week, lice_year):
        self.locnr = locnr
        self.lice_value = lice_value
        self.lice_binary = lice_binary
        self.lice_week = lice_week
        self.lice_year = lice_year
        

    def print_licedata(self): 
        print("Printing licedata")
        print(self.locnr)
        print(self.lice_value)
        print(self.lice_binary)
        print(self.lice_week)
        print(self.lice_year)
