import React from 'react';
import transform_kpi from '../Transform_KPI';
import './Maaltall.css'

function Maaltall (props) {

    return (
        <div className="nøkkeltall"> 
        <p className="p-props tekst-nøkkeltall"> {transform_kpi(props.tekst)} </p>
    </div>
    )
}

export default Maaltall