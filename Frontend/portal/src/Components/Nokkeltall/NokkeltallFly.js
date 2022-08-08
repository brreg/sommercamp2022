import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './NokkeltallFly.css';

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

    const [orgFlightsFeed, setOrgFlightsFeed] = useState("")
    const [orgFlightsProd, setOrgFlightsProd] = useState("")
    const [orgProd, setOrgProd] = useState("")
    const [orgFeed, setOrgFeed] = useState("")
    const [yearCO2, setYearCO2] = useState("")

    useEffect(() => {
        
        axios.get(`http://10.172.205.152:105/orgs/${props.id}/flights/`)
        .then( res=> {
            console.log(res.data.data[0].flights_feed)
            setOrgFlightsFeed(res.data.data[0].flights_feed)
            setOrgFlightsProd(res.data.data[0].flights_production)
            setOrgFeed(res.data.data[0].feed_co2_string)
            setOrgProd(res.data.data[0].prod_co2_string)
            setYearCO2(res.data.data[0].year)
        })
        .catch( err=> {
            console.log(err)
        })
      
    }, []);

    const [avgFlightsFeed, setAvgFlightsFeed] = useState("")
    const [avgFeed, setAvgFeed] = useState("")
    const [yearFeed, setYearFeed] = useState("")

    useEffect(() => {
        
        axios.get(`http://10.172.205.152:105/averages/co2feed/`)
        .then( res=> {
            console.log(res.data.data[2].flights_feed)
            setAvgFlightsFeed(res.data.data[2].average_all_feed_flights)
            setAvgFeed(res.data.data[2].average_all_string)
            setYearFeed(res.data.data[2].year)

        })
        .catch( err=> {
            console.log(err)
        })
      
    }, []);

    const [avgFlightsProd, setAvgFlightsProd] = useState("")
    const [avgProd, setAvgProd] = useState("")
    const [yearProd, setYearProd] = useState("")

    useEffect(() => {
        
        axios.get(`http://10.172.205.152:105/averages/co2production/`)
        .then( res=> {
            console.log(res.data.data[4].flights_production)
            setAvgFlightsProd(res.data.data[4].average_all_production_flights)
            setAvgProd(res.data.data[4].average_all_string)
            setYearProd(res.data.data[4].year)

        })
        .catch( err=> {
            console.log(err)
        })
      
    }, []);

    const transform_fly_over = (fly_over) => {

        switch(fly_over) {
            case "Fôrproduksjon_bedrift": 
                return `${orgname} slapp ut`;
            case "Fôrproduksjon_bransje": 
                return `Bransjen slapp ut gjennomsnittlig`;
            case "CO2_bedrift": 
                return `${orgname} slapp ut`;
            case "CO2_bransje": 
                return `Bransjen slapp ut gjennomsnittlig`;
            default:
                return "kunne ikke finne";
            }
        };
    
    const transformed_fly_over = transform_fly_over(props.fly_over)

    const transform_fly_under = (fly_under) => {

        switch(fly_under) {
            case "Fôrproduksjon_bedrift": 
                return "CO2-ekvivalenter per produserte tonn fisk i 2021";
            case "Fôrproduksjon_bransje": 
                return `CO2-ekvivalenter per produserte tonn fisk i ${yearFeed}`;
            case "CO2_bedrift": 
                return "CO2-ekvivalenter per produserte tonn fisk i 2021";
            case "CO2_bransje": 
                return `CO2-ekvivalenter per produserte tonnn fisk i ${yearProd}`;
            default:
                return "kunne ikke finne";
            }
        };
    
    const transformed_fly_under = transform_fly_under(props.fly_under)


    const transform_numbers = (flight_number) => {

        switch(flight_number) {
            case "Fôr_bedrift_numbers_flights":
                return `${orgFlightsFeed}`;
            case "Prod_bedrift_numbers_flights":
                return `${orgFlightsProd}`;
            case "Fôr_bransje_numbers_flights":
                return `${avgFlightsFeed}`;
            case "Prod_bransje_numbers_flights":
                    return `${avgFlightsProd}`;
            default:
                return "xxx";
        }
    };
    const transformed_numbers = transform_numbers(props.numbers)

    

    const transform_co2 = (co2_number) => {

        switch(co2_number) {
            case "Fôr_bedrift_co2":
                return `${orgFeed} tonn`;
            case "Prod_bedrift_co2":
                    return `${orgProd} tonn`;
            case "Fôr_bransje_co2":
                return `${avgFeed} tonn`;
            case "Prod_bransje_co2":
                    return `${avgProd} tonn`;
            default:
                return "xxx";
        }
    };
    const transformed_co2 = transform_co2(props.co2)

    return (
        <div className="nøkkeltallFly"> 
            <div className="overtekst-nøkkeltallFly"> {transformed_fly_over} </div>
            <div className="tall-overskriftFly"> {transformed_co2} </div>
            <div className="undertekst-nøkkeltallFly"> {transformed_fly_under} </div>
            <div className="strek"/>
            <div className="under_strek">
            <div><img className="fly_bilde" src={require('./Fly.png')}></img></div>
            <div className="fly_tekst">Tilsvarer {transformed_numbers} flyreiser fra Oslo til Bergen </div>
            </div> 
        </div>
    )
}

export default NokkeltallFly