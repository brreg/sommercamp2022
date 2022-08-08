import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Frame from './Frame';
import NokkeltallAreal from '../Nokkeltall/NokkeltallAreal';
import Kjonngraf from '../../Graphs/Sosialgrafer/Kjonnsfordeling/kjonngraf';
import MiljoGraph from '../../Graphs/miljograph'
import Nokkeltall from '../Nokkeltall/Nokkeltall';

function FramesSosial() {
    const {id} = useParams();


    const [orgname, setOrgname] = useState("")
    const axios = require('axios')
    
    useEffect(() => {
        getOrg()
    }, []);

    const getOrg = async() => {
        await axios.get(`http://10.172.205.152:105/orgs/${id}`)
        .then( res=> {
            console.log("TEST2", res.data.data[0].org_name)
            setOrgname(res.data.data[0].org_name)
        })
        .catch( err=> {
            console.log(err)
        })
    }

        return (
            <div className="container-frames">
            <div className="row-frames sosial-frame">
                <div className="column-frames">
                    <Frame overskrift= "Kjønnsfordeling" 
                            nøkkeltall_en={<Nokkeltall id={id} miljo_over="Kjønn_bedrift" miljo_under="Kjønn_bedrift" miljo_nokkeltall="Kjønn_bedrift_tall"/>} 
                            nøkkeltall_to={<Nokkeltall miljo_over="Kjønn_bransje" id={id} miljo_under="Kjønn_bedrift" miljo_nokkeltall="Kjønn_bransje_tall"/>} 
                            graph={<Kjonngraf id={id}/>} 
                            tekst={"Diagrammet viser andelen menn og kvinner i selskapet målt i prosent."}
                            dropDown={"Kjønnsfordeling forklart"}
                            show={"Kjønnsfordeling viser andelen av kvinner og menn i selskapet. Diagrammet tar ikke høyde for kjønnsmangfold utenom mann og kvinne da det ikke rapporteres på dette."}
                            kilde={<div>Konstruerte tall basert på: <a href="https://www.fiskeridir.no/Tall-og-analyse/Statistikkbanken">Fiskeridirektoratet</a></div>}/>

                </div>
                <div className="column-frames">
                    <Frame overskrift="Arealbruk" 
                            nøkkeltall_en={<NokkeltallAreal id={id} areal_over="Arealbruk_bedrift" areal_under="Arealbruk_bedrift" areal_tall="Arealbruk_bedrift" areal_ball="Fotball_bedrift"/>}
                            nøkkeltall_to={<NokkeltallAreal id={id} areal_over="Arealbruk_bransje" areal_under="Arealbruk_bransje" areal_tall="Arealbruk_bransje" areal_ball="Fotball_bransje"/>}
                            tekst={"Tallene viser hvor stort areal hvert selskap benytter målt i kvadratmeter."}
                            dropDown={"Arealbruk forklart"}
                            show={"Arealbruk viser hvor stort område selskapet benytter for å drive med oppdrettsaktivitet."}
                            kilde={<div>Konstruerte tall basert på: <a href="https://open-data-fiskeridirektoratet-fiskeridir.hub.arcgis.com/datasets/48f1b90ebe3049deb6bf33bcd67263ac/explore">Fiskeridirektoratet</a></div>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Ufrivillig deltidsprosent" 
                            tekst={"Grafen viser antall arbeidere i ufrivillig deltid målt i prosent."}
                            dropDown={"Ufrivillig deltidsprosent forklart"}
                            show={"Den ufrivillige deltidsprosenten viser hvor stor del andel av ansatte i selskapet som ønsker, og er tilgjengelige for å jobbe mer."}
                            kilde={<div>Konstruerte tall basert på: <a href="https://www.ssb.no/statbank/table/09368/">Statistisk Sentralbyrå</a></div>}
                            graph={<MiljoGraph org_nr={id} apiurl_end="ufrivilligdeltid/" chart_title="Ufrivillig Deltid" bedrifter={orgname}/>} 
                            />
                </div>
            </div>
        </div>
        )
    }

export default FramesSosial;