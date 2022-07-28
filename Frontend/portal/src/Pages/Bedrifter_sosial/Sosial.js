import React from "react";
import "./Sosial.css";
import { useNavigate, useParams } from "react-router-dom";
import AS_buttons from "../../Components/Buttons/AS_buttons";
import FramesSosial from "../../Components/Frames/FramesSosial";


const Sosial = () => {

    const {id} = useParams();

    return (
        <div>
        <p className="overskrift-sosial-bedrifter">{id}</p>
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
