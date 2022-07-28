import React from 'react';
import {useParams} from 'react-router-dom';
import Frame from './Frame';
import Nokkeltall from '../Nokkeltall/Nokkeltall'

function FramesMiljo() {
    const {id} = useParams();

        return (
            <div className="container-frames">
            <div className="row-frames">
                <div className="column-frames">
                    <Frame overskrift= "Dødlighet" nøkkeltall_en={<Nokkeltall/>} nøkkeltall_to={<Nokkeltall/>} nøkkeltall_tre={<Nokkeltall/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Rømninger" nøkkeltall_en={<Nokkeltall/>} nøkkeltall_to={<Nokkeltall/>} nøkkeltall_tre={<Nokkeltall/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Lakselus" nøkkeltall_en={<Nokkeltall/>} nøkkeltall_to={<Nokkeltall/>} nøkkeltall_tre={<Nokkeltall/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Fôrproduksjon" nøkkeltall_en={<Nokkeltall/>} nøkkeltall_to={<Nokkeltall/>} nøkkeltall_tre={<Nokkeltall/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="CO2" nøkkeltall_en={<Nokkeltall/>} nøkkeltall_to={<Nokkeltall/>} nøkkeltall_tre={<Nokkeltall/>}/>
                </div>
            </div>
        </div>
        )
    }

export default FramesMiljo;