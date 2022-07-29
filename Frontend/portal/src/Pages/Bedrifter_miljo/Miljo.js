import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from 'react-router-dom';
import "./Miljo.css";
import AS_buttons from "../../Components/Buttons/AS_buttons";
import FramesMiljo from "../../Components/Frames/FramesMiljo"


const Miljo = () => {

    const {id} = useParams();
    const [orgname, setOrgname] = useState("")
    const axios = require('axios')

    useEffect(() => {
        
        axios.get(`http://127.0.0.1:5000/orgs/${id}`)
        .then( res=> {
            console.log(res.data.data[0].org_name)
            setOrgname(res.data.data[0].org_name)
        })
        .catch( err=> {
            console.log(err)
        })
      
    }, []);

    return (
        <div>
            <p className="overskrift-miljo-bedrifter">{orgname}</p>
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
