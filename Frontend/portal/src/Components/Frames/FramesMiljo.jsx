import React, {useEffect, useState} from 'react';
import {useParams } from 'react-router-dom';
import Frame from './Frame';
import Nokkeltall from '../Nokkeltall/Nokkeltall'
import Death from '../../Graphs/death'
import Escape from '../../Graphs/escape'
import Lice from '../../Graphs/lice'
import Feed from '../../Graphs/feed'
import Transport from '../../Graphs/transport'

function FramesMiljo() {
    const {id} = useParams();

    const [value, setValue] = useState("");
    useEffect(() => {
        (async() => {
            setValue("eksempel"); // async funksjon
        })();
    }, []);


        return (
            <div className="container-frames">
            <div>{value}</div>
            <div className="row-frames">
                <div className="column-frames">
                    <Frame overskrift= "Dødlighet" nøkkeltall_en={<Nokkeltall id={id} kpi="Dødlighet_bedrift"/>} nøkkeltall_to={<Nokkeltall kpi="Dødlighet_bransje" id={id}/>} graph={<Death org_nr="886813082"/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Rømninger" nøkkeltall_en={<Nokkeltall id={id} kpi="Rømninger_bedrift"/>} nøkkeltall_to={<Nokkeltall id={id} kpi="Rømninger_bransje"/>} graph={<Escape org_nr="886813082"/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Lakselus" nøkkeltall_en={<Nokkeltall id={id} kpi="Lakselus_bedrift"/>} nøkkeltall_to={<Nokkeltall id={id} kpi="Lakselus_bransje"/>} graph={<Lice org_nr="886813082"/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Fôrproduksjon" nøkkeltall_en={<Nokkeltall id={id} kpi="Forproduksjon_bedrift"/>} nøkkeltall_to={<Nokkeltall id={id} kpi="Forproduksjon_bransje"/>} graph={<Feed org_nr="886813082"/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="CO2" nøkkeltall_en={<Nokkeltall id={id} kpi="CO2_bedrift"/>} nøkkeltall_to={<Nokkeltall id={id} kpi="CO2_bransje"/>} graph={<Transport org_nr="886813082"/>}/>
                </div>
            </div>
        </div>
        )
    }

export default FramesMiljo;