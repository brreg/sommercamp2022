import React, {useState, useEffect} from "react";
import "./Sosial.css";
import { useNavigate, useParams } from "react-router-dom";
import AS_buttons from "../../Components/Buttons/AS_buttons";
import FramesSosial from "../../Components/Frames/FramesSosial";


const Sosial = () => {

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
        <p className="overskrift-sosial-bedrifter">{orgname}</p>
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
