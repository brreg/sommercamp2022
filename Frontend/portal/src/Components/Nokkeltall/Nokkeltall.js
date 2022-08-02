import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './Nokkeltall.css'

function Nokkeltall (props) {

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

    const transform_kpi = (kpi) => {

        switch(kpi) {
            case "Dødlighet_bedrift": 
                return `${orgname} hadde gjennomsnittlig`;
            case "Dødlighet_bransje": 
                return "Bransjen hadde i gjennomsnitt";
            case "Lakselus_bedrift": 
                return `${orgname} hadde gjennomsnittlig`;
            case "Lakselus_bransje": 
                return "Bransjen hadde totalt";
            case "Rømninger_bedrift": 
                return `${orgname} hadde gjennomsnittlig`;
            case "Rømninger_bransje": 
                return "Bransjen hadde totalt";
            default:
                return "kunne ikke finne";
            }
        };
    
    const transformed_kpi = transform_kpi(props.kpi)


    const transform_kpi2 = (kpi2) => {

        switch(kpi2) {
            case "Dødlighet_bedrift": 
                return "dødlighet i 2022";
            case "Dødlighet_bransje": 
                return "dødlight i 2022";
            case "Lakselus_bedrift": 
                return "lakselus i 2022";
            case "Lakselus_bransje": 
                return "lakselus 2022";
            case "Rømninger_bedrift": 
                return "rømninger i 2022";
            case "Rømninger_bransje": 
                return "rømninger i 2022";
            default:
                return "kunne ikke finne";
            }
        };
    
    const transformed_kpi2 = transform_kpi2(props.kpi2)
    
    return (
        <div className="nøkkeltall"> 
            <div className="overtekst-nøkkeltall"> {transformed_kpi} </div>
            <div className="tall-overskrift"> 300 </div>
            <div className="undertekst-nøkkeltall"> {transformed_kpi2} </div>
        </div>
    )
}

export default Nokkeltall