import React from 'react';
import "./Bedrifter_sosial.css";
import { useNavigate } from "react-router-dom";

const Bedrifter_sosial = () => {

    const navigate = useNavigate();

    return (
        <div className="btn-toolbar" style = {{position: "absolute", top: 140}}>
            <button onClick={function handleClick(){navigate("/Bedrifter")}}>Generelt</button>
            <button onClick={function handleClick(){navigate("/Bedrifter_miljo")}}> Miljø</button>
            <button onClick={function handleClick(){navigate("/Bedrifter_sosial")}}>Sosial</button>
            <button onClick={function handleClick(){navigate("/Bedrifter_okonomi")}}>Økonomi</button>
        
       
        
        <div className="card" style = {{position: "absolute", top: 160}}>
        <div className="container">
                <p><h4>Sosial</h4></p>
        </div>
        </div>
        </div>

    )
}

export default Bedrifter_sosial;
