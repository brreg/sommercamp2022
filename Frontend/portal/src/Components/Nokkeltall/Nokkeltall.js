import React, { useEffect } from 'react';
import transform_kpi from '../Transform_KPI';
import './Nokkeltall.css'

function Nokkeltall (props) {

    const transform_kpi = (kpi) => {

        switch(kpi) {
            //Dødlighet
            case "Dødlighet_bedrift": 
                return "Bedriften hadde gjennomsnittlig";
            case "Dødlighet_bransje": 
                return "Bransjen hadde i gjennomsnitt";
            //Lakselus
            case "Lakselus_bedrift": 
                return "Bedriften hadde totalt";
            case "Lakselus_bransje": 
                return "Bransjen hadde totalt";
            //Rømninger
            case "Rømninger_bedrift": 
                return "Bedriften hadde totalt";
            case "Rømninger_bransje": 
                return "Bransjen hadde totalt";
            //Forproduksjon
            case "Forproduksjon_bedrift": 
                return "Bedriften slapp i gjennomsnitt ut";
            case "Forproduksjon_bransje": 
                return "Bransjen slapp i gjennomsnitt ut";
            //CO2
            case "CO2_bedrift": 
                return "Bedriften slapp i gjennomsnitt ut";
            case "CO2_bransje": 
                return "Bransjen slapp i gjennomsnitt ut";
            default:
                return "kunne ikke finne";
            }
        };
    
    const transformed_kpi = transform_kpi(props.kpi)

    return (
        <div className="nøkkeltall"> 
        <p className="p-props tekst-nøkkeltall"> {transformed_kpi} </p>
    </div>
    )
}

export default Nokkeltall