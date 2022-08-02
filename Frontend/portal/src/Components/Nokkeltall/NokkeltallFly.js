import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './NokkeltallFly.css';

function NokkeltallFly (props) {

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

    const transform_kpi3 = (kpi3) => {

        switch(kpi3) {
            case "Fôrproduksjon_bedrift": 
                return `${orgname} slapp ut`;
            case "Fôrproduksjon_bransje": 
                return `Bransjen slapp ut`;
            case "CO2_bedrift": 
                return `${orgname} hadde totalt`;
            case "CO2_bransje": 
                return `Bransjen slapp ut`;
            case "Arealbruk_bedrift": 
                return `${orgname} brukte totalt`;
            case "Arealbruk_bransje": 
                return `Bransjen brukte totalt`;
            default:
                return "kunne ikke finne";
            }
        };
    
    const transformed_kpi3 = transform_kpi3(props.kpi3)

    const transform_kpi4 = (kpi4) => {

        switch(kpi4) {
            case "Fôrproduksjon_bedrift": 
                return "tonn CO2e i 2022";
            case "Fôrproduksjon_bransje": 
                return "tonn CO2e i 2022";
            case "CO2_bedrift": 
                return "tonn CO2e i 2022";
            case "CO2_bransje": 
                return "tonn CO2e i 2022";
            case "Arealbruk_bedrift": 
                return "areal i 2022";
            case "Arealbruk_bransje": 
                return "areal i 2022";
            default:
                return "kunne ikke finne";
            }
        };
    
    const transformed_kpi4 = transform_kpi4(props.kpi4)

    return (
        <div className="nøkkeltallFly"> 
            <div className="overtekst-nøkkeltallFly"> {transformed_kpi3} </div>
            <div className="tall-overskriftFly"> 300 </div>
            <div className="undertekst-nøkkeltallFly"> {transformed_kpi4} </div>
            <div className="strek"/>
            <div className="under_strek">
            <div><img className="fly_bilde" src={require('./plane2.png')}></img></div>
            <div className="fly_tekst"> Dette tilsvarer 50 flyreiser Oslo - New York </div>
            </div> 
        </div>
    )
}

export default NokkeltallFly