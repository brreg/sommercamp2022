import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import "./Header.css";


const Header = (props) => {

    const {id} = useParams();
    const [orgname, setOrgname] = useState("")
    const axios = require('axios')

    useEffect(() => {
        
        axios.get(`http://127.0.0.1:5000/orgs/${props.id}`)
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
            <div className="header-container">
                <div className="generell-info">
                    <div className="overskrift-generell-bedrifter"> {orgname} </div>
                    <div className="info org_nr"> <p className="info-title">Organisasjonsnummer</p> {"\n"} <p className="info-text">{id}</p> </div>
                    <div className="info kommune"> <p className="info-title">Kommune</p>{"\n"} <p className="info-text">xxxxx</p> </div> 
                    <div className="info adresse"> <p className="info-title">Adresse</p>{"\n"} <p className="info-text">xxxxx</p> </div>
                </div>
            </div>
        </div>

    )
}

export default Header;