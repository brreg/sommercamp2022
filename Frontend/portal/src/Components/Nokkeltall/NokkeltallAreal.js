import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './NokkeltallAreal.css';

function NokkeltallFly (props) {

    const {id} = useParams();

    const [orgname, setOrgname] = useState("")
    const axios = require('axios')

    useEffect(() => {
        
        axios.get(`http://10.172.205.152:105/orgs/${props.id}`)
        .then( res=> {
            console.log(res.data.data[0].org_name)
            setOrgname(res.data.data[0].org_name)
        })
        .catch( err=> {
            console.log(err)
        })
      
    }, []);

    const transform_areal_over = (areal_over) => {

        switch(areal_over) {
            case "Arealbruk_bedrift": 
                return `${orgname} brukte totalt`;
            case "Arealbruk_bransje": 
                return `Bransjen brukte totalt`;
            default:
                return "kunne ikke finne";
            }
        };
    
    const transformed_areal_over= transform_areal_over(props.areal_over)

    const transform_areal_under = (areal_under) => {

        switch(areal_under) {
            case "Arealbruk_bedrift": 
                return "areal i 2022";
            case "Arealbruk_bransje": 
                return "areal i 2022";
            default:
                return "kunne ikke finne";
            }
        };
    
    const transformed_areal_under = transform_areal_under(props.areal_under)

    return (
        <div className="nøkkeltallFly"> 
            <div className="overtekst-nøkkeltallAreal"> {transformed_areal_over} </div>
            <div className="tall-overskriftAreal"> 300 </div>
            <div className="undertekst-nøkkeltallAreal"> {transformed_areal_under} </div>
            <div className="strek"/>
            <div className="under_strek">
            <div><img className="areal_bilde" src={require('./Fotball.png')}></img></div>
            <div className="areal_tekst"> Dette tilsvarer 50 fotballbaner </div>
            </div> 
        </div>
    )
}

export default NokkeltallFly