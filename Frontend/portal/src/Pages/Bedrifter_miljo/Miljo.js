import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from 'react-router-dom';
import "./Miljo.css";
import AS_buttons from "../../Components/Buttons/AS_buttons";
import FramesMiljo from "../../Components/Frames/FramesMiljo";
import Header from "../../Components/Header/Header";


const Miljo = () => {
    
    const {id} = useParams();

    return (
        <div>
            <div>
                <Header id={id}/>
            </div>
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
