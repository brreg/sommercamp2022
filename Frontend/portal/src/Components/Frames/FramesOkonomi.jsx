import React from 'react';
import {useParams} from 'react-router-dom';
import Frame from './Frame';
import Nokkeltall from '../Nokkeltall/Nokkeltall'

function FramesOkonomi() {
    const {id} = useParams();

        return (
            <div className="container-frames">
            <div className="row-frames">
                <div className="column-frames">
                    <Frame overskrift= "Soliditet" nøkkeltall_en={<Nokkeltall/>} nøkkeltall_to={<Nokkeltall/>} nøkkeltall_tre={<Nokkeltall/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Likviditet" nøkkeltall_en={<Nokkeltall/>} nøkkeltall_to={<Nokkeltall/>} nøkkeltall_tre={<Nokkeltall/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Lønnsomhet" nøkkeltall_en={<Nokkeltall/>} nøkkeltall_to={<Nokkeltall/>} nøkkeltall_tre={<Nokkeltall/>}/>
                </div>
            </div>
        </div>
        )
    }

export default FramesOkonomi;