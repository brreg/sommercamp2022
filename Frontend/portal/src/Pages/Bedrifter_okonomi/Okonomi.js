import React, {useState, useEffect} from "react";
import "./Okonomi.css";
import { useNavigate, useParams } from "react-router-dom";
import AS_buttons from "../../Components/Buttons/AS_buttons";
import FramesOkonomi from "../../Components/Frames/FramesOkonomi";
import Header from "../../Components/Header/Header";

const Okonomi = () => {

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
            <FramesOkonomi/>
        </div>
        </div>
    )
}

export default Okonomi;
