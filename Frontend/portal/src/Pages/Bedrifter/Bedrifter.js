import React, {useState, useEffect} from "react";
import { useParams} from "react-router-dom";
import "./Bedrifter.css";
import Header from "../../Components/Header/Header"
import AS_buttons from "../../Components/Buttons/AS_buttons";


const Bedrifter = () => {
    
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
            <div>
                <Header id={id}/>
            </div>
            <div className="btn-floater">
                <AS_buttons className="btn-placement"/>
            </div>
        </div> 
    )
}

export default Bedrifter;
