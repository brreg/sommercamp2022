import React from 'react';
import "./Forside.css";
import { useNavigate } from "react-router-dom";

function Forside() {

    const navigate = useNavigate();

    return (
        <div className = "forside">
            <div class = "background_color">
                <div class = "logo">
                    <p>Bærekraftsportalen</p>
                </div>
            </div>

            <p> Alle virksomheter </p>

            <div className = "bedrift_button">
                <button onClick={function handleClick(){navigate("/Bedrifter")}}>
                    <div className = "header">
                        Sea AS
                    </div>
                    <div>
                        <p>Bedriftsinfo</p>
                        <p>I Salma AS har som mål å produsere næringsrik og velsmakende sjømat av ypperste kvalitet. 
                            Vi dekker en femtedel av den globale etterspørselen etter atlantisk oppdrettslaks, og 
                            drivkraften vår er kontinuerlig innovasjon og viljen til å produsere laks på en 
                            stadig mer bærekraftig måte.</p>
                    </div>
                </button>
            </div>
        </div>
    );
  }


  
  export default Forside;
  
  