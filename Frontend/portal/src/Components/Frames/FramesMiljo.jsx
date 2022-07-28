import React from 'react';
import {useParams} from 'react-router-dom';
import Frame from './Frame';
import Maaltall from '../Maaltall/Maaltall'

function FramesMiljo() {
    const {id} = useParams();

        return (
            <div className="container-frames">
            <div className="row-frames">
                <div className="column-frames">
                    <Frame overskrift= "Dødlighet" nøkkeltall1={<Maaltall tekst="gjennomsnittlig_lus_bedrift"/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Rømninger"/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Lakselus"/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Fôrproduksjon"/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="CO2"/>
                </div>
            </div>
        </div>
        )
    }

export default FramesMiljo;