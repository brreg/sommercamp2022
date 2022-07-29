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
                    <Frame overskrift= "Soliditet"/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Likviditet"/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Lønnsomhet"/>
                </div>
            </div>
        </div>
        )
    }

export default FramesOkonomi;