class Escapedata: 

    def __init__(self, locnr, year, data):
        self.locnr = locnr
        self.year = year
        if (not data==None): 
            twotup = self.calculate_escape_count(data)
            self.data = twotup[1] # list of escape events in this year
            self.escape_count_sum = twotup[0]
            #self.loc_capacity = data[0]["escapes"][0]["localityCapacity"]

        else: 
            self.data = None
            self.escape_count_sum = None
            #self.loc_capacity = None

    def getlist(self): 
        return [self.locnr, self.year, self.data, self.escape_count_sum]

    def print_data(self):
        print("Printing EscapeData")
        print("Locnr " + str(self.locnr))
        print("Year " + str(self.year))
        print("Data " + str(self.data))
        print("Escapecountsum " + str(self.escape_count_sum))
     

    def calculate_escape_count(self, data):
        # input is a list with many dictionaries
        escape_count_total = 0
        captured_total = 0

        escape_events = []
        for week in data:
            for escape in week['escapes']:
                ## add to total escapes and total captures
                if (escape['count'] is not None):
                    escape_count_total += escape['count']
                    captured_total += escape['recapturesCompleted']

                    ## add an escape event with only the data we want to keep to our list
                    modified_escape_event = {'week': escape['week'], 'loc_capacity': escape['localityCapacity'],
                                        'count': escape['count'], 'recaptures_completed': escape['recapturesCompleted'],
                                        'escape_description': escape['description']}
                    escape_events.append(modified_escape_event)

        ## returning a total count of escapes and a list of escape events with descriptions
        ## will usually only be one element in escape_events list. 
        return (escape_count_total, escape_events)