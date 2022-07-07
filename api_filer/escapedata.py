class EscapeData: 

    def __init__(self, locnr, year, data):
        self.locnr = locnr
        self.year = year
        self.week = data[0]["week"]
        self.escapecount = data[0]["escapes"][0]["count"]
        self.captured = data[0]["escapes"][0]["recapturesCompleted"]
        self.capturestart = data[0]["escapes"][0]["recaptureStarted"]
        self.escapedescription = data[0]["escapes"][0]["description"]
        
    def print_data(self):
        print("Printing EscapeData")
        print("Locnr " + str(self.locnr))
        print("Year " + str(self.year))
        print("Week " + str(self.week))
        print("Escapecount " + str(self.escapecount))
        print("Captured " + str(self.captured))
        print("Capturestart " + str(self.capturestart))
        print("Escape description: " + str(self.escapedescription))