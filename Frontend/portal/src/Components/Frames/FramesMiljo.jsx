import React from 'react';
import {useParams} from 'react-router-dom';
import Frame from './Frame';
import Nokkeltall from '../Nokkeltall/Nokkeltall'
import Death from '../../Graphs/death'
import Escape from '../../Graphs/escape'
import Lice from '../../Graphs/lice'

function FramesMiljo() {
    const {id} = useParams();

        return (
            <div className="container-frames">
            <div className="row-frames">
                <div className="column-frames">
                    <Frame overskrift= "Dødlighet" nøkkeltall_en={<Nokkeltall/>} nøkkeltall_to={<Nokkeltall/>} graph={<Death org_nr="886813082"/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Rømninger" nøkkeltall_en={<Nokkeltall/>} nøkkeltall_to={<Nokkeltall/>} graph={<Escape org_nr="886813082"/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Lakselus" nøkkeltall_en={<Nokkeltall/>} nøkkeltall_to={<Nokkeltall/>} graph={<Lice org_nr="886813082"/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Fôrproduksjon" nøkkeltall_en={<Nokkeltall/>} nøkkeltall_to={<Nokkeltall/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="CO2" nøkkeltall_en={<Nokkeltall/>} nøkkeltall_to={<Nokkeltall/>}/>
                </div>
            </div>
        </div>
        )
    }

export default FramesMiljo;