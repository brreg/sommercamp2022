import React from 'react';
import {useParams} from 'react-router-dom';
import Frame from './Frame';

function FramesMiljo() {
    const {id} = useParams();

        return (
            <div className="container-frames">
            <div className="row-frames">
                <div className="column-frames">
                    <Frame 
                    overskrift="Dødlighet"
                    nokkeltall1= {"Gjennomsnittlig " + " Tall \n"  + id }
                    />
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