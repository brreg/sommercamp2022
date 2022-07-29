import React, {useState, useEffect} from "react";
import "./Sosial.css";
import { useNavigate, useParams } from "react-router-dom";
import AS_buttons from "../../Components/Buttons/AS_buttons";
import FramesSosial from "../../Components/Frames/FramesSosial";
import Header from "../../Components/Header/Header";


const Sosial = () => {

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
            <FramesSosial />
        </div>
        </div>
    )
}

export default Sosial;
