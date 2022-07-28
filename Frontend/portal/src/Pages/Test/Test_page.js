import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import "./Test_page.css";
import AS_buttons from "../../Components/Buttons/AS_buttons";
import Death from "../../Graphs/death";


const Test_Page = () => {

    const {id} = useParams();

    return (
        <div>
            <p className="overskrift-miljo-bedrifter">{id}</p>
        <div className="btn-floater">
            <AS_buttons/>
        </div>
        <div></div>
        <div className="frame-floater">
            <Death org_nr="886813082"/>
        </div>
        </div>
    )  
    }

export default Test_Page;
