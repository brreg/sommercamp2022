import React from "react";
import "./Bedrifter.css";
import { useNavigate, useParams } from "react-router-dom";
import AS_buttons from "../../Components/Buttons/AS_buttons";


const Bedrifter = () => {

    const {id} = useParams();

    return (
        
        <div>
        <p className="overskrift-general-bedrifter">{id}</p>
        <div className="btn-floater">
        <AS_buttons/>
        <div className="card" style = {{position: "absolute", top: 160}}></div>
        </div>
        </div>
    )
}

export default Bedrifter;
