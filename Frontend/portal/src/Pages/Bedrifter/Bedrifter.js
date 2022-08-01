import React, {useState, useEffect} from "react";
import { useParams} from "react-router-dom";
import "./Bedrifter.css";
import Header from "../../Components/Header/Header"
import AS_buttons from "../../Components/Buttons/AS_buttons";


const Bedrifter = () => {
    
    const {id} = useParams();

    return (   
        <div>
            <div>
                <Header id={id}/>
            </div>
            <div className="btn-floater">
                <AS_buttons className="btn-placement"/>
            </div>
        </div> 
    )
}

export default Bedrifter;
