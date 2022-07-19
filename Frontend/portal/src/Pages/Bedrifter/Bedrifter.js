import React from "react";
import "./Bedrifter.css";
import { useNavigate } from "react-router-dom";


const Bedrifter = () => {

    const navigate = useNavigate();

    return (

        <div class="btn-toolbar" style = {{position: "absolute", top: 140}}>
    
            <button onClick={function handleClick(){navigate("/Bedrifter")}}>Generelt</button>
            <button onClick={function handleClick(){navigate("/Bedrifter_miljo")}}> Miljø</button>
            <button onClick={function handleClick(){navigate("/Bedrifter_sosial")}}>Sosial</button>
            <button onClick={function handleClick(){navigate("/Bedrifter_okonomi")}}>Økonomi</button>
        
       
        
        <div class="card" style = {{position: "absolute", top: 160}}>
        <div class="container">
            <p><h4>Generelt</h4></p>
        </div>
        </div>
        </div>

    )
}

export default Bedrifter;
