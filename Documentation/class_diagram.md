```mermaid
classDiagram

    Main <|-- BarentswatchAPIController
    Main <|-- RegnskapsAPIController
    Main <|-- RegnDataContainer
    RegnDataContainer <|-- RegnData
    Database <|-- Main
	Database <|-- DatabaseINI
	LiceData <|-- BarentswatchAPIController
	Escapedata <|-- BarentswatchAPIController
	Main <|-- LicedataContainer
	LicedataContainer <|-- LiceData
	EscapedataContainer <|-- Escapedata
	Main <|-- EscapedataContainer
	RegnData <|-- RegnskapsAPIController
	RegnDataContainer <|-- RegnskapsAPIController
	
    
	
	class Main {
          main()
    }

    class BarentswatchAPIController {
      + get_lice_data()
	  + get_escape_data()
	  + get_locnrs()
	  + init()
    }

    class RegnskapsAPIController {
      + get_orgnrs()
	  + get_regnskap()
	  + get_nokkeltall()
	  + get_many_nokkeltall()
	  + get_object()
	  + init()
    }



    class Database {
      + config()
	  + connect()
	  + create_table()
	  + insert_lice_data(lice_data)
    }
	    
	class DatabaseINI {
      + host
	  + database
	  + user
	  + password
      
    }

	class LicedataContainer {
      + dict = 'lice_data'
	  + addLiceData()
	  + addLiceDataList()
	  + getDataFrame()
	  
    }

	class LiceData {
      + locnr
	  + lice_binary
	  + lice_week
	  + lice_year
    }
	
	class Escapedata {
      + init()
	  + getlist()
	  + print_data()
	  
    }
	class RegnData {
      + init()
	  + get_list()
    }
    
    class RegnDataContainer {
      + init()
	  + add_regndata()
	  + add_regndata_list()
	  + get_dataframe()
    }
	
	class EscapedataContainer {
      + init()
	  + add_escapedata()
	  + getDataFrame()
	  
    }
	

	
```