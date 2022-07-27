import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import "./Miljo.css";
import AS_buttons from "../../Components/Buttons/AS_buttons";
import FramesMiljo from "../../Components/Frames/FramesMiljo"


const Miljo = () => {

    const {id} = useParams();

    return (
        <div>
            <p className="overskrift-miljo-bedrifter">{id}</p>
        <div className="btn-floater">
            <AS_buttons/>
        </div>
        <div className="frame-floater">
            <FramesMiljo />
        </div>
        </div>
    )  

    }

export default Miljo;
