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

    const [nokkeltallDod, setNokkeltallDod] = useState("")
    const [yearDod, setYearDod] = useState("")

    useEffect(() => {
        
        axios.get(`http://10.172.205.152:105/orgs/${props.id}/deadliness`)
        .then( res=> {
            setNokkeltallDod(res.data.data[4].thiscomp)
            setYearDod(res.data.data[4].year)
        })
        .catch( err=> {
            console.log(err)
        })
      
    }, []);

    const [nokkeltallLice, setNokkeltallLice] = useState("")
    const [yearLice, setYearLice] = useState("")

    useEffect(() => {
        
        axios.get(`http://10.172.205.152:105/orgs/${props.id}/licedata/`)
        .then( res=> {
            setNokkeltallLice(res.data.data[4].thiscomp)
            setYearLice(res.data.data[4].year)
        })
        .catch( err=> {
            console.log(err)
        })
      
    }, []);

    const [nokkeltallEscapes, setNokkeltallEscapes] = useState("")
    const [nokkeltallEscapeYear, setNokkeltallEscapesYear] = useState("")

    useEffect(() => {
        //127.0.0.1:5000
        //10.172.205.152:105
        axios.get(`http://10.172.205.152:105/orgs/${props.id}/escapes/`)
        .then( res=> {
            setNokkeltallEscapes(res.data.data[0].thiscomp)
            setNokkeltallEscapesYear(res.data.data[0].year)
        })
        .catch( err=> {
            console.log(err)
        })
      
    }, []);

    const [averageDeadliness, setAverageDeadliness] = useState("")

    useEffect(() => {
        
        axios.get(`http://10.172.205.152:105/averages/deadliness`)
        .then( res=> {
            setAverageDeadliness(res.data.data[2].average_all)
        })
        .catch( err=> {
            console.log(err)
        })
      
    }, []);

    const [averageLice, setAverageLice] = useState("")

    useEffect(() => {
        
        axios.get(`http://10.172.205.152:105/averages/licedata`)
        .then( res=> {
            setAverageLice(res.data.data[4].average_all)
        })
        .catch( err=> {
            console.log(err)
        })
      
    }, []);

    const [averageEscapes, setAverageEscapes] = useState("")
    const [averageEscapesYear, setAverageEscapesYear] = useState("")

    useEffect(() => {
        
        axios.get(`http://10.172.205.152:105/averages/escapes`)
        .then( res=> {
            setAverageEscapes(res.data.data[0].average_all)
            setAverageEscapesYear(res.data.data[0].year)
        })
        .catch( err=> {
            console.log(err)
        })
      
    }, []);

    const [tallJenter, setTallJenter] = useState("")
    const [tallGutter, setTallGutter] = useState("")
    const [avgJenter, setAvgJenter] = useState("")
    const [avgGutter, setAvgGutter] = useState("")

    useEffect(() => {
        
        axios.get(`http://10.172.205.152:105/nokkeltall/${props.id}/kjonn`)
        .then( res=> {
            setTallJenter(res.data.data[0].female_percent)
            setTallGutter(res.data.data[1].male_percent)            
            setAvgJenter(res.data.data[2].female_percent_avg)
            setAvgGutter(res.data.data[3].male_percent_avg)
        })
        .catch( err=> {
            console.log(err)
        })
      
    }, []);

    const transform_miljo_over = (miljo_over) => {

        switch(miljo_over) {
            case "Dødelighet_bedrift": 
                return `${orgname} hadde gjennomsnittlig`;
            case "Dødelighet_bransje": 
                return "Bransjen hadde i gjennomsnitt";
            case "Lakselus_bedrift": 
                return `${orgname} hadde gjennomsnittlig`;
            case "Lakselus_bransje": 
                return "Bransjen hadde gjennomsnittlig";
            case "Rømninger_bedrift": 
                return `${orgname} hadde`;
            case "Rømninger_bransje": 
                return "Bransjen hadde gjennomsnittlig";
            case "Kjønn_bedrift": 
                return `${orgname} hadde `;
            case "Kjønn_bransje": 
                return "Bransjen hadde gjennomsnittlig";
            default:
                return "kunne ikke finne";
            }
        };
    
    const transformed_miljo_over = transform_miljo_over(props.miljo_over)


    const transform_miljo_under = (miljo_under) => {

        switch(miljo_under) {
            case "Dødelighet_bedrift": 
                return `dødlighet i ${yearDod}`;
            case "Dødelighet_bransje": 
                return `dødlighet i ${yearDod}`;
            case "Lakselus_bedrift": 
                return `lakelus i ${yearLice}`;
            case "Lakselus_bransje": 
                return `lakelus i ${yearLice}`;
            case "Rømninger_bedrift": 
                return `rømninger i ${nokkeltallEscapeYear}`;
            case "Rømninger_bransje": 
                return `rømninger i ${averageEscapesYear}`;
            case "Kjønn_bedrift": 
                return "i 2021";
            case "Kjønn_bransje": 
                return "i 2021";
            default:
                return "kunne ikke finne";
            }
        };
    
    const transformed_miljo_under = transform_miljo_under(props.miljo_under)

    const transform_miljo_nokkeltall = (miljo_nokkeltall) => {

        switch(miljo_nokkeltall) {
            case "Dødelighet_bedrift_tall": 
                return `${nokkeltallDod}%`;
            case "Dødelighet_bransje_tall": 
                return `${averageDeadliness}%`;
            case "Lakselus_bedrift_tall": 
                return `${nokkeltallLice}`;
            case "Lakselus_bransje_tall": 
                return `${averageLice}`;
            case "Rømninger_bedrift_tall": 
                return `${nokkeltallEscapes}`;
            case "Rømninger_bransje_tall": 
                return `${averageEscapes}`;
            case "Kjønn_bedrift_tall": 
                return `${tallJenter}% kvinner    ${tallGutter}% menn`;
            case "Kjønn_bransje_tall": 
                return `${avgJenter}% kvinner    ${avgGutter}% menn`;
            default:
                return "xxx";
            }
        };
    
    const transformed_miljo_nokkeltall = transform_miljo_nokkeltall(props.miljo_nokkeltall)
    
    return (
        <div className="nøkkeltall"> 
            <div className="overtekst-nøkkeltall"> {transformed_miljo_over} </div>
            <div className="tall-overskrift"> {transformed_miljo_nokkeltall} </div>
            <div className="undertekst-nøkkeltall"> {transformed_miljo_under} </div>
        </div>
    )
}

export default Nokkeltall