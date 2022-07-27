import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import "./Miljo.css";
import AS_buttons from "../../Components/Buttons/AS_buttons";
import Frame from "../../Components/Frames/Frame"


const Miljo = () => {

    const {id} = useParams();

    return (
        <div>
            <p className="overskrift-miljo-bedrifter">{id}</p>
        <div className="btn-floater">
            <AS_buttons/>
        </div>
        <div className="frame-floater">
            <Frame/>
        </div>
        </div>
    )  

    }

export default Miljo;
