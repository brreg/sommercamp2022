import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Card from '../../Components/Cards/Cards';
import "./Miljo.css";
import AS_buttons from "../../Components/Buttons/AS_buttons";

const Miljo = () => {

    const {id} = useParams();

    return (
        <div>
            <p className="overskrift-miljo-bedrifter">{id}</p>
            <div className="btn-floater">
            <AS_buttons/>
        </div>

            <div className="card-">
                <Card />
            </div>
        
        </div>
    )  

    }

export default Miljo;
