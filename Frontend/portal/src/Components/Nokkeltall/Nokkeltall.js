import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './Nokkeltall.css'

function Nokkeltall (props) {

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

    const transform_miljo_over = (miljo_over) => {

        switch(miljo_over) {
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
    
    const transformed_miljo_over = transform_miljo_over(props.miljo_over)


    const transform_miljo_under = (miljo_under) => {

        switch(miljo_under) {
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
    
    const transformed_miljo_under = transform_miljo_under(props.miljo_under)
    
    return (
        <div className="nøkkeltall"> 
            <div className="overtekst-nøkkeltall"> {transformed_miljo_over} </div>
            <div className="tall-overskrift"> 300 </div>
            <div className="undertekst-nøkkeltall"> {transformed_miljo_under} </div>
        </div>
    )
}

export default Nokkeltall