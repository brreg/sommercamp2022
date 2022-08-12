```mermaid
classDiagram

    BarentswatchAPIController <|-- Main
    RegnskapsAPIController <|-- Main
    RegnDataContainer <|-- RegnskapsAPIController
    RegnDataContainer <|-- RegnData
    Database <|-- Main
	LiceData <|-- BarentswatchAPIController
	Escapedata <|-- BarentswatchAPIController
	LicedataContainer <|-- LiceData
	EscapedataContainer <|-- Escapedata
	
    
	
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
	  + config()
	  + create_table()
	  + update_db_averages()
	  + insert_data(df, tablename)
	  + get_locnrs()
	  + insert_areal_data(filename)
	  + insert_part_time_data(filename)
	  + getasdata(filename)
	  + add_producers()
	  + insert_address_smb_locnr_csv(filename)
	  + insert_lice_limit(filename)
	  + get_valid_orgs(locnrs)
	  + generate_co2_data(locnrs, year, dfas, dfdead)
	  + generate_social_figures(years)
	  + generate_deadliness_data(locnrs, filename, year)
	  + generate_social_figures(years)
	  
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
