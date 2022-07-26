import React from "react";
import "./Okonomi.css";
import { useNavigate, useParams } from "react-router-dom";
import AS_buttons from "../../Components/Buttons/AS_buttons";


const Okonomi = () => {

    const {id} = useParams();

    return (
        
        <div>
        <p className="overskrift-okonomi-bedrifter">{id}</p>
        <div className="btn-floater">
        <AS_buttons/>
        <div className="card" style = {{position: "absolute", top: 160}}></div>
        </div>
        </div>
    )
}

export default Okonomi;
