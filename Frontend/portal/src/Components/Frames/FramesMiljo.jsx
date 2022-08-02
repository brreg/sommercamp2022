import React, {useEffect, useState} from 'react';
import {useParams } from 'react-router-dom';
import Frame from './Frame';
import Nokkeltall from '../Nokkeltall/Nokkeltall'
import NokkeltallFly from '../Nokkeltall/NokkeltallFly'
import Death from '../../Graphs/death'
import Escape from '../../Graphs/escape'
import Lice from '../../Graphs/lice'
import Feed from '../../Graphs/feed'
import Transport from '../../Graphs/transport'

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
                
                    <Frame overskrift= {"Dødlighet"} 
                        nøkkeltall_en={<Nokkeltall id={id} kpi="Dødlighet_bedrift" kpi2="Dødlighet_bedrift"/>} 
                        nøkkeltall_to={<Nokkeltall kpi="Dødlighet_bransje" id={id} kpi2="Dødlighet_bedrift"/>} 
                        tekst={"Grafen viser prosentandelen av produsert laks som har dødd under produksjon fra 2017-2021"} 
                        graph={<Death org_nr="886813082"/>}
                        dropDown={"Dødlighet er andelen av selskapets produksjon"}
                        show={"som har dødd under oppdrettsprosessen. Tallet er samlet for alle selskapets lokasjoner."}/>

                </div>
                <div className="column-frames">
                    <Frame overskrift={"Rømninger" }
                        nøkkeltall_en={<Nokkeltall id={id} kpi="Rømninger_bedrift" kpi2="Rømninger_bedrift"/>} 
                        nøkkeltall_to={<Nokkeltall id={id} kpi="Rømninger_bransje" kpi2="Rømninger_bedrift"/>} 
                        tekst={"Grafen viser antall rømninger per år fra 2017-2021"} 
                        graph={<Escape org_nr="886813082"/>}
                        dropDown={"Rømningstallet viser antall røminger selskapet"}
                        show={"Rømninger innebærer at fisken har kommet ut av merden. Eventuelle redningsaksjoner er ikke tatt hensyn til i dette diagrammet."}/>
                        
                </div>
                <div className="column-frames">
                    <Frame overskrift={"Lakselus" }
                        nøkkeltall_en={<Nokkeltall id={id} kpi="Lakselus_bedrift" kpi2="Lakselus_bedrift"/>} 
                        nøkkeltall_to={<Nokkeltall id={id} kpi="Lakselus_bransje" kpi2="Lakselus_bedrift"/>} 
                        tekst={"Grafen viser gjennomsnittlig lakselus per fisk fra 2017-2021"} 
                        graph={<Lice org_nr="886813082"/>}
                        dropDown={"Lusetallene er gjennomsnittlig hunnlus per fisk."}
                        show={"Lusetall er gjennomsnittlig hunnlus per fisk. Tallene er basert på data per uke for hver lokalitet og har blitt aggregert på årsnivå. Diagrammet viser bedriften sitt lusetall, gjennomsnittlig lusetall for bransjen, og tillatt grense for lakselus."}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift={"Co2 Fôrproduksjon"} 
                        nøkkeltall_en={<NokkeltallFly id={id} kpi3="Fôrproduksjon_bedrift" kpi4="Fôrproduksjon_bedrift"/>} 
                        nøkkeltall_to={<NokkeltallFly id={id} kpi3="Fôrproduksjon_bransje" kpi4="Fôrproduksjon_bransje"/>} 
                        tekst={"Tallene er basert på beregnet CO2-ekvivalent fra fôrforbruket i 2022"} 
                        graph={<Feed org_nr="886813082"/>}
                        dropDown={"CO2-utslippet er regnet ut ved å gange et fast"}
                        show={"klimaavtrykk per kilo fôr, med fôrforbruket per kilo laks (eFcr) og selskapets totale produksjon av laks. Det tas forbehold om at tallet er et estimat basert på et fast utslipp per kilo for, og at selskapet benytter samme fôrprodusent for hele produksjonen."}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift={"Co2 produksjon" }
                        nøkkeltall_en={<NokkeltallFly id={id} kpi3="CO2_bedrift" kpi4="CO2_bedrift"/>} 
                        nøkkeltall_to={<NokkeltallFly id={id} kpi3="CO2_bransje" kpi4="CO2_bransje"/>} 
                        tekst={"Tallene er basert på beregnet CO2-ekvivalent fra produksjonen i 2022"} 
                        graph={<Transport org_nr="886813082"/>}
                        dropDown={"CO2 utslippet fra produksjon er beregnet etter"}
                        show={"drivstofforbruk under utvalgte aktiviteter i produksjonsprosessen. Disse aktivitetene er bruk av brønnbåter, produksjonsfarmer og servicebedriftbruk. Det benyttes en fast sats for utslipp  per liter brukt på 2.66 CO2 ekvivalenter."}/>

                </div>
            </div>
        </div>
        )
    }

export default FramesMiljo;