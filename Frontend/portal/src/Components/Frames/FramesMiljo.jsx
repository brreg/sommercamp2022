import React, {useEffect, useState} from 'react';
import {useParams } from 'react-router-dom';
import Frame from './Frame';
import Nokkeltall from '../Nokkeltall/Nokkeltall'
import Death from '../../Graphs/death'
import Escape from '../../Graphs/escape'
import Lice from '../../Graphs/lice'

function FramesMiljo() {
    const {id} = useParams();

    const [value, setValue] = useState("");
    useEffect(() => {
        (async() => {
            setValue("eksempel");
        })();
    }, [])


        return (
            <div className="container-frames">
            <div>{value}</div>
            <div className="row-frames">
                <div className="column-frames">
                    <Frame overskrift= "Dødlighet" nøkkeltall_en={<Nokkeltall id={id}/>} nøkkeltall_to={<Nokkeltall kpi="gjennomsnittlig dødlighet" id={id}/>} graph={<Death org_nr="886813082"/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Rømninger" nøkkeltall_en={<Nokkeltall id={id}/>} nøkkeltall_to={<Nokkeltall id={id}/>} graph={<Escape org_nr="886813082"/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Lakselus" nøkkeltall_en={<Nokkeltall id={id}/>} nøkkeltall_to={<Nokkeltall id={id}/>} graph={<Lice org_nr="886813082"/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Fôrproduksjon" nøkkeltall_en={<Nokkeltall id={id}/>} nøkkeltall_to={<Nokkeltall id={id}/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="CO2" nøkkeltall_en={<Nokkeltall id={id}/>} nøkkeltall_to={<Nokkeltall id={id}/>}/>
                </div>
            </div>
        </div>
        )
    }

export default FramesMiljo;