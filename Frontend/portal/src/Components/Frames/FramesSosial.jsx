import React from 'react';
import {useParams} from 'react-router-dom';
import Frame from './Frame';
import NokkeltallAreal from '../Nokkeltall/NokkeltallAreal';
import Kjonngraf from '../../Graphs/Sosialgrafer/Kjonnsfordeling/kjonngraf';
import MiljoGraph from '../../Graphs/miljograph'


function FramesSosial() {
    const {id} = useParams();

        return (
            <div className="container-frames">
            <div className="row-frames">
                <div className="column-frames">
                    <Frame overskrift= "Kjønnsfordeling" 
                            graph={<Kjonngraf/>} 
                            tekst={"Dette diagrammet viser andelen menn og kvinner i selskapet målt i prosent"}
                            dropDown={"Kjønnsfordeling forklart"}
                            show={"Kjønnsfordeling viser andelen av kvinner og menn i selskapet."}
                            kilde={"Konstruert tall basert på Konstruert tall basert på https://www.fiskeridir.no/Tall-og-analyse/Statistikkbanken"}
                            />
                </div>
                <div className="column-frames">
                    <Frame overskrift="Arealbruk" 
                            nøkkeltall_en={<NokkeltallAreal id={id} areal_over="Arealbruk_bedrift" areal_under="Arealbruk_bedrift"/>}
                            nøkkeltall_to={<NokkeltallAreal id={id} areal_over="Arealbruk_bransje" areal_under="Arealbruk_bransje"/>}
                            tekst={"Disse tallene viser hvor stort areal hvert selskap benytter målt i m2"}
                            dropDown={"Arealbruk forklart"}
                            show={"Arealbruk viser hvor stort område selskapet benytter for å drive med oppdrettsaktivitet."}
                            kilde={"Kilde: https://open-data-fiskeridirektoratet-fiskeridir.hub.arcgis.com/datasets/48f1b90ebe3049deb6bf33bcd67263ac/explore"}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Ufrivillig deltidsprosent" 
                            tekst={"Grafen viser antall arbeidere i ufrivillig deltid målt i prosent"}
                            dropDown={"Ufrivillig deltidsprosent forklart"}
                            show={"Den ufrivillige deltidsprosenten viser hvor stor del andel av ansatte i selskapet som ønsker, og er tilgjengelige for å jobbe mer."}
                            kilde={"Konstruert tall basert på https://www.ssb.no/statbank/table/09368/"}
                            graph={<MiljoGraph org_nr={id} apiurl_end="ufrivilligdeltid/" chart_title="Ufrivillig Deltid"/>} 
                            />
                </div>
            </div>
        </div>
        )
    }

export default FramesSosial;