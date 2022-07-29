import React from "react";
import "./Bedrifter.css";
import { useNavigate, useParams } from "react-router-dom";
import AS_buttons from "../../Components/Buttons/AS_buttons";


const Bedrifter = () => {

    const {id} = useParams();

    return (   
        <div>
            <div className="header-container">
                <p className="overskrift-generell-bedrifter">{id}</p>
                <p className="organisasjonsnummer"> Organisasjonsnummer </p>
                <p className="kommune"> Kommune </p>
                <p className="adresse"> Adresse </p>
            </div>
        <div className="btn-floater">
        <AS_buttons className="btn-placement"/>
        </div>
        </div>
    )
}

export default Bedrifter;
