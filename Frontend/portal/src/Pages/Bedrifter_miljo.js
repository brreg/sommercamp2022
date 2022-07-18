import React from 'react';
import "./Bedrifter_miljo.css"
import Card from '../Components/Cards/Cards'

const Bedrifter_miljo = () => {

    return (
        <div>
            <div className="btn-toolbar" style = {{position: "absolute", top: 140}}>
                <button>Generelt</button>
                <button>Miljø</button>
                <button>Sosial</button>
                <button>Økonomi</button>

            </div>

            <div className="card-">
                <Card />
            </div>
        
        </div>
    )  
}

export default Bedrifter_miljo;
