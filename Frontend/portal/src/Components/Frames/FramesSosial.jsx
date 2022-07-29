import React from 'react';
import {useParams} from 'react-router-dom';
import Frame from './Frame';
import Nokkeltall from '../Nokkeltall/Nokkeltall'

function FramesSosial() {
    const {id} = useParams();

        return (
            <div className="container-frames">
            <div className="row-frames">
                <div className="column-frames">
                    <Frame overskrift= "Kjønnsfordeling"/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Arealbruk"/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Deltidsprosent" nøkkeltall_en={<Nokkeltall/>} nøkkeltall_to={<Nokkeltall/>}/>
                </div>
            </div>
        </div>
        )
    }

export default FramesSosial;