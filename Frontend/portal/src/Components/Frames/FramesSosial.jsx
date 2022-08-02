import React from 'react';
import {useParams} from 'react-router-dom';
import Frame from './Frame';
import Nokkeltall from '../Nokkeltall/Nokkeltall'
import NokkeltallFly from '../Nokkeltall/NokkeltallFly';
import Kjonngraf from '../../Graphs/Kjonnsfordeling/kjonngraf';

function FramesSosial() {
    const {id} = useParams();

        return (
            <div className="container-frames">
            <div className="row-frames">
                <div className="column-frames">
                    <Frame overskrift= "Kjønnsfordeling" 
                            graph={<Kjonngraf/>} 
                            tekst={"Dette diagrammet viser andelen menn og kvinner i selskapet målt i prosent"} />
                </div>
                <div className="column-frames">
                    <Frame overskrift="Arealbruk" 
                            nøkkeltall_en={<NokkeltallFly id={id} kpi3="Arealbruk_bedrift" kpi4="Arealbruk_bedrift"/>}
                            nøkkeltall_to={<NokkeltallFly id={id} kpi3="Arealbruk_bransje" kpi4="Arealbruk_bransje"/>}
                            tekst={"Disse tallene viser hvor stort areal hvert selskap benytter målt i m2"}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Deltidsprosent" 
                            tekst={"Grafen viser antall arbeidere i ufrivillig deltid målt i prosent"}/>
                </div>
            </div>
        </div>
        )
    }

export default FramesSosial;