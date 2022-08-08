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

    const [orgAreal, seOrgAreal] = useState("")
    const [avgAreal, setAvgAreal] = useState("")
    const [orgFootball, setOrgFootball] = useState("")
    const [avgFootball, setAvgFootball] = useState("")

    useEffect(() => {
        
        axios.get(`http://10.172.205.152:105/orgs/${props.id}/areal/`)
        .then( res=> {
            console.log(res.data)
            seOrgAreal(res.data.data[2].this_org_areal_string)
            setAvgAreal(res.data.data[5].all_org_areal_string)
            setOrgFootball(res.data.data[1].this_org_areal_football)
            setAvgFootball(res.data.data[4].all_org_areal_football)

        })
        .catch( err=> {
            console.log(err)
        })
      
    }, []);

    const transform_areal_tall = (areal_tall) => {

        switch(areal_tall) {
            case "Arealbruk_bedrift": 
                return `${orgAreal}`;
            case "Arealbruk_bransje": 
                return `${avgAreal}`;
            default:
                return "kunne ikke finne";
            }
        };
    
    const transformed_areal_tall = transform_areal_tall(props.areal_tall)

    const transform_areal_ball = (areal_ball) => {

        switch(areal_ball) {
            case "Fotball_bedrift": 
                return `${orgFootball}`;
            case "Fotball_bransje": 
                return `${avgFootball}`;
            default:
                return "kunne ikke finne";
            }
        };
    
    const transformed_areal_ball= transform_areal_ball(props.areal_ball)

    const transform_areal_over = (areal_over) => {

        switch(areal_over) {
            case "Arealbruk_bedrift": 
                return `${orgname} brukte totalt`;
            case "Arealbruk_bransje": 
                return `Bransjen brukte gjennomsnittlig`;
            default:
                return "kunne ikke finne";
            }
        };
    
    const transformed_areal_over= transform_areal_over(props.areal_over)

    const transform_areal_under = (areal_under) => {

        switch(areal_under) {
            case "Arealbruk_bedrift": 
                return "areal per produserte tonn fisk i 2022";
            case "Arealbruk_bransje": 
                return "areal per produserte tonn fisk i 2022";
            default:
                return "kunne ikke finne";
            }
        };
    
    const transformed_areal_under = transform_areal_under(props.areal_under)

    return (
        <div className="nøkkeltallFly"> 
            <div className="overtekst-nøkkeltallAreal"> {transformed_areal_over} </div>
            <div className="tall-overskriftAreal"> {transformed_areal_tall} m<sup>2</sup></div>
            <div className="undertekst-nøkkeltallAreal"> {transformed_areal_under} </div>
        </div>
    )
}

export default NokkeltallFly