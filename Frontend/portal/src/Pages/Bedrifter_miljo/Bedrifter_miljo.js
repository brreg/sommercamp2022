import React from 'react';
import "./Bedrifter_miljo.css"
import Card from '../../Components/Cards/Cards'
import {useNavigate} from 'react-router-dom'


const Bedrifter_miljo = () => {
    
    const navigate = useNavigate();

    return (
        <div>
            <div className="btn-toolbar" style = {{position: "absolute", top: 140}}>
            <button onClick={function handleClick(){navigate("/Bedrifter")}}>Generelt</button>
            <button onClick={function handleClick(){navigate("/Bedrifter_miljo")}}> Miljø</button>
            <button onClick={function handleClick(){navigate("/Bedrifter_sosial")}}>Sosial</button>
            <button onClick={function handleClick(){navigate("/Bedrifter_okonomi")}}>Økonomi</button>
        </div>

            <div className="card-">
                <Card />
            </div>
        
        </div>
    )  

    }

export default Bedrifter_miljo;
