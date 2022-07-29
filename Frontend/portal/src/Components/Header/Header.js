import React, {useState, useEffect} from "react";
import "./Header.css";
import { useNavigate, useParams} from "react-router-dom";


const Header = (props) => {

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
                <p className="overskrift-generell-bedrifter"> {orgname} </p>
                <p className="organisasjonsnummer"> Organisasjonsnummer </p>
                <p className="kommune"> Kommune </p>
                <p className="adresse"> Adresse </p>
            </div>
        </div>

    )
}

export default Header;