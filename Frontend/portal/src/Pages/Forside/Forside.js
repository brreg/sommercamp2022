import React from 'react';
import "./Forside.css";
import SearchBar from '../../Components/Searchbar/Search_bar';
import OrgData from "./smb.json";

function Forside() {
    return (
        <div className = "forside">
            <div className = "background_color">
                <div className = "logo">
                    <p>Bærekraftsportalen</p>
                </div>
            </div>
                <div className="container">
                    <SearchBar placeholder="Søk etter organisasjon..." data={OrgData} />
                </div>
        </div>
    );
  }

  
  export default Forside;
  
  