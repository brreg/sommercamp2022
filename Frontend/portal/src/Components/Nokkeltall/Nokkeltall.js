import React, { useEffect } from 'react';
import transform_kpi from '../Transform_KPI';
import './Nokkeltall.css'

function Nokkeltall (props) {

    const transform_kpi = (kpi) => {

        switch(kpi) {
            case "gjennomsnittlig dødlighet": 
                return "Dødlighets gjennomsnitt";
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