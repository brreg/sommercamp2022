import React, {useEffect, useState} from 'react';
import {useParams } from 'react-router-dom';
import Frame from './Frame';
import Nokkeltall from '../Nokkeltall/Nokkeltall'
import NokkeltallFly from '../Nokkeltall/NokkeltallFly'
import MiljoGraph from '../../Graphs/miljograph'
import Escape from '../../Graphs/Miljografer/escape'
import Lice from '../../Graphs/Miljografer/lice'
import Feed from '../../Graphs/Miljografer/feed'
import Production from '../../Graphs/Miljografer/production'

function FramesMiljo() {
    const {id} = useParams();

    const [value, setValue] = useState("");
    useEffect(() => {
        (async() => {
            setValue(""); // async funksjon
        })();
    }, []);


        return (
            <div className="container-frames">
            <div>{value}</div>
            <div className="row-frames">
                <div className="column-frames">
                
                    <Frame overskrift= {"Dødelighet"} 
                        nøkkeltall_en={<Nokkeltall id={id} miljo_over="Dødelighet_bedrift" miljo_under="Dødelighet_bedrift"/>} 
                        nøkkeltall_to={<Nokkeltall miljo_over="Dødelighet_bransje" id={id} miljo_under="Dødelighet_bedrift"/>} 
                        tekst={"Grafen viser prosentandelen av produsert laks som har dødd under produksjon fra 2017-2021"} 
                        graph={<MiljoGraph org_nr={id} apiurl_end="deadliness" chart_title="Deadliness data"/>}
                        dropDown={"Dødelighet er andelen av selskapets produksjon"}
                        show={"som har dødd under oppdrettsprosessen. Tallet er samlet for alle selskapets lokasjoner."}/>

                </div>
                <div className="column-frames">
                    <Frame overskrift={"Rømninger" }
                        nøkkeltall_en={<Nokkeltall id={id} miljo_over="Rømninger_bedrift" miljo_under="Rømninger_bedrift"/>} 
                        nøkkeltall_to={<Nokkeltall id={id} miljo_over="Rømninger_bransje" miljo_under="Rømninger_bedrift"/>} 
                        tekst={"Grafen viser antall rømninger per år fra 2017-2021"} 
                        graph={<MiljoGraph org_nr={id} apiurl_end="escapes" chart_title="Escape data"/>}
                        dropDown={"Rømningstallet viser antall røminger selskapet"}
                        show={"Rømninger innebærer at fisken har kommet ut av merden. Eventuelle redningsaksjoner er ikke tatt hensyn til i dette diagrammet."}/>
                        
                </div>
                <div className="column-frames">
                    <Frame overskrift={"Lakselus" }
                        nøkkeltall_en={<Nokkeltall id={id} miljo_over="Lakselus_bedrift" miljo_under="Lakselus_bedrift"/>} 
                        nøkkeltall_to={<Nokkeltall id={id} miljo_over="Lakselus_bransje" miljo_under="Lakselus_bedrift"/>} 
                        tekst={"Grafen viser gjennomsnittlig lakselus per fisk fra 2017-2021"} 
                        graph={<MiljoGraph org_nr={id} apiurl_end="licedata" chart_title="Lice data"/>}
                        dropDown={"Lusetallene er gjennomsnittlig hunnlus per fisk."}
                        show={"Lusetall er gjennomsnittlig hunnlus per fisk. Tallene er basert på data per uke for hver lokalitet og har blitt aggregert på årsnivå. Diagrammet viser bedriften sitt lusetall, gjennomsnittlig lusetall for bransjen, og tillatt grense for lakselus."}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift={"Co2 Fôrproduksjon"} 
                        nøkkeltall_en={<NokkeltallFly id={id} fly_over="Fôrproduksjon_bedrift" fly_under="Fôrproduksjon_bedrift"/>} 
                        nøkkeltall_to={<NokkeltallFly id={id} fly_over="Fôrproduksjon_bransje" fly_under="Fôrproduksjon_bransje"/>} 
                        tekst={"Tallene er basert på beregnet CO2-ekvivalent fra fôrforbruket i 2022"} 
                        graph={<MiljoGraph org_nr={id} apiurl_end="co2feed" chart_title="CO2 forproduksjon"/>}
                        dropDown={"CO2-utslippet er regnet ut ved å gange et fast"}
                        show={"klimaavtrykk per kilo fôr, med fôrforbruket per kilo laks (eFcr) og selskapets totale produksjon av laks. Det tas forbehold om at tallet er et estimat basert på et fast utslipp per kilo for, og at selskapet benytter samme fôrprodusent for hele produksjonen."}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift={"Co2 produksjon" }
                        nøkkeltall_en={<NokkeltallFly id={id} fly_over="CO2_bedrift" fly_under="CO2_bedrift"/>} 
                        nøkkeltall_to={<NokkeltallFly id={id} flyo_over="CO2_bransje" fly_under="CO2_bransje"/>} 
                        tekst={"Tallene er basert på beregnet CO2-ekvivalent fra produksjonen i 2022"} 
                        graph={<MiljoGraph org_nr={id} apiurl_end="co2production" chart_title="CO2 utslipp i produksjon"/>}
                        dropDown={"CO2 utslippet fra produksjon er beregnet etter"}
                        show={"drivstofforbruk under utvalgte aktiviteter i produksjonsprosessen. Disse aktivitetene er bruk av brønnbåter, produksjonsfarmer og servicebedriftbruk. Det benyttes en fast sats for utslipp  per liter brukt på 2.66 CO2 ekvivalenter."}/>

                </div>
            </div>
        </div>
        )
    }

export default FramesMiljo;