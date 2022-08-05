import React from 'react';
import "./Forside.css";
import SearchBar from '../../Components/Searchbar/Search_bar';
import CardForside from '../../Components/Cards/Cards-forside';


function Forside() {

    return (

        <div className = "forside">
            <img src={require('./Images/Forside7.png')} className="background-img"></img>
            <div className="tekstboks_forside">
                <p className="liten_overskrift_forside">Velkommen til</p>
                <p className="overskrift_forside">Bærekraftsportalen</p>
                <p className="tekstboks_overskrift_forside">«Bærekraft er en utvikling som tilfredstiller behovene til menneskene som lever nå, 
                    uten å ødelegge for mulighetene til fremtidige genrasjoner.» <br></br>På denne nettsiden kan du lese om hvor bærekraftige ulike bedrifter er.</p>
                <SearchBar placeholder="Søk etter organisasjon..." />
            </div>
            <div>
                <CardForside />
            </div>
            
        </div>
    );
  }

  export default Forside;
  
  