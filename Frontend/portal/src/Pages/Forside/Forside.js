import React from "react";
import "./Forside.css";
import SearchBar from "../../Components/Searchbar/Search_bar";
import CardForside from "../../Components/Cards/Cards-forside";

function Forside() {
  return (
    <div className="forside">
      <img
        src={require("./Images/Forside13.png")}
        className="background-img"
      ></img>
      <div className="tekstboks_forside">
        <p className="liten_overskrift_forside">Velkommen til</p>
        <p className="overskrift_forside">Bærekraftsportalen</p>
        <p className="tekstboks_overskrift_forside">
          Bærekraftsportalen viser ulike selskapers bærekraftstall opp mot
          bransjens gjennomsnitt. Bevissthet og handling er veien til
          bærekraftig utvikling.
        </p>
        <SearchBar placeholder="Søk etter organisasjon..." />
      </div>
      <div>
        <CardForside />
      </div>
    </div>
  );
}

export default Forside;
