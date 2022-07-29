import React from 'react';
import "./Forside.css";
import SearchBar from '../../Components/Searchbar/Search_bar';

function Forside() {
    return (
        <div className = "forside">
            <div className="tekstboks_forside">
                <p className="liten_overskrift_forside">Velkommen til</p>
                <p className="overskrift_forside">Bærekraftsportalen</p>
                <p className="tekstboks_overskrift_forside">«Bærekraft er en utvikling som tilfredstiller behovene til menneskene som lever nå, 
                    uten å ødelegge for mulighetene til fremtidige genrasjoner.» På denne nettsiden kan du lese om hvor bærekraftige ulike bedrifter er.</p>
                <SearchBar placeholder="Søk etter organisasjon..." />
            </div>
        
            <div className="row_forside">
                <div className="column_forside">
                    <div className="card_forside">
                        <p className="overskrift_card_forside">Virksomheter</p>
                        <p className="p_card_forside">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation .</p>
                    </div>
                </div>
                <div className="column_forside">
                    <div className="card_forside">
                        <p className="overskrift_card_forside">Bærekraft</p>
                        <p className="p_card_forside">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                    </div>
                </div>
                <div className="column_forside">
                    <div className="card_forside">
                        <p className="overskrift_card_forside">Regler</p>
                        <p className="p_card_forside">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                    </div>
                </div>                       
            </div>
        </div>
    );
  }

  
  export default Forside;
  
  