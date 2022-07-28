import React from "react";
import "./Okonomi.css";
import { useNavigate, useParams } from "react-router-dom";
import AS_buttons from "../../Components/Buttons/AS_buttons";
import FramesOkonomi from "../../Components/Frames/FramesOkonomi"

const Okonomi = () => {

    const {id} = useParams();

    return (
        <div>
        <p className="overskrift-okonomi-bedrifter">{id}</p>
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
