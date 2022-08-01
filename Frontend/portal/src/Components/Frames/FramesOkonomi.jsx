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
                    <Frame overskrift= "Soliditet" tekst={"Dette diagrammet viser bedriftens økonomiske soliditet for 2021"}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Likviditet" tekst={"Dette diagrammet viser bedriftens økonomiske likviditet for 2021"}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Lønnsomhet" tekst={"Dette diagrammet viser bedriftens økonomiske lønnsomhet for 2021"}/>
                </div>
            </div>
        </div>
        )
    }

export default FramesOkonomi;