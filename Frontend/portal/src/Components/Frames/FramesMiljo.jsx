import React, {useEffect, useState} from 'react';
import {useParams } from 'react-router-dom';
import Frame from './Frame';
import Nokkeltall from '../Nokkeltall/Nokkeltall'
import NokkeltallFly from '../Nokkeltall/NokkeltallFly'
import MiljoGraph from '../../Graphs/miljograph'


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
                        dropDown={"Dødlighet forklart"}
                        show={"Dødlighet er andelen av selskapets produksjon som har dødd under oppdrettsprosessen. Tallet er samlet for alle selskapets lokasjoner."}
                        kilde={"Kilde: Konstruert tall"}
                        graph={<MiljoGraph org_nr={id} apiurl_end="deadliness" chart_title="Deadliness data"/>} />

                </div>
                <div className="column-frames">
                    <Frame overskrift={"Rømninger" }
                        nøkkeltall_en={<Nokkeltall id={id} miljo_over="Rømninger_bedrift" miljo_under="Rømninger_bedrift"/>} 
                        nøkkeltall_to={<Nokkeltall id={id} miljo_over="Rømninger_bransje" miljo_under="Rømninger_bedrift"/>} 
                        tekst={"Grafen viser antall rømninger per år fra 2017-2021"} 
                        dropDown={"Rømninger forklart"}
                        show={"Rømningstallet viser antall rømniger selskapet har hatt i løpet av et år. Rømninger innebærer at fisken har kommet ut av merden og sluppet ut i havet. Eventuelle redningsaksjoner er ikke tatt hensyn til i dette diagrammet."}
                        kilde={"Kilde: https://www.barentswatch.no/fiskehelse/"}
                        graph={<MiljoGraph org_nr={id} apiurl_end="escapes" chart_title="Escape data"/>} />
                        
                </div>
                <div className="column-frames">
                    <Frame overskrift={"Lakselus" }
                        nøkkeltall_en={<Nokkeltall id={id} miljo_over="Lakselus_bedrift" miljo_under="Lakselus_bedrift"/>} 
                        nøkkeltall_to={<Nokkeltall id={id} miljo_over="Lakselus_bransje" miljo_under="Lakselus_bedrift"/>} 
                        tekst={"Grafen viser gjennomsnittlig lakselus per fisk fra 2017-2021"} 
                        dropDown={"Lakselus forklart"}
                        show={"Lusetall er gjennomsnittlig hunnlus per fisk. Tallene er basert på data som innrapporteres hver uke på lokasjonsnivå. Dataen er samlet på årsnivå i diagrammet. Diagrammet viser bedriftens lusetall, gjennomsnittlig lusetall for bransjen, og tillatt grense for lakselus."}
                        kilde={"Kilde: https://www.barentswatch.no/fiskehelse/"}
                        graph={<MiljoGraph org_nr={id} apiurl_end="licedata" chart_title="Lice data"/>} />

                </div>
                <div className="column-frames">
                    <Frame overskrift={"Co2 Fôrproduksjon"} 
                        nøkkeltall_en={<NokkeltallFly id={id} fly_over="Fôrproduksjon_bedrift" fly_under="Fôrproduksjon_bedrift"/>} 
                        nøkkeltall_to={<NokkeltallFly id={id} fly_over="Fôrproduksjon_bransje" fly_under="Fôrproduksjon_bransje"/>} 
                        tekst={"Tallene er basert på beregnet CO2-ekvivalent fra fôrforbruket i 2022"} 

                        dropDown={"Co2 fôrproduksjon forklart"}
                        show={"CO2-utslippet er regnet ut ved å gange et fast klimaavtrykk per kilo fôr, med fôrforbruket per kilo laks (eFcr) og selskapets totale produksjon av laks. Det tas forbehold om at tallet er et estimat basert på et fast utslipp per kilo for, og at selskapet benytter samme fôrprodusent for hele produksjonen."}
                        kilde={"Kilde: Konstruert tall basert på https://www.sintef.no/contentassets/25338e561f1a4270a59ce25bcbc926a2/report-carbon-footprint-norwegian-seafood-products-2017_final_040620.pdf/"}
                        graph={<MiljoGraph org_nr={id} apiurl_end="co2feed" chart_title="CO2 forproduksjon"/>} />
       
                </div>
                <div className="column-frames">
                    <Frame overskrift={"Co2 Produksjon" }
                        nøkkeltall_en={<NokkeltallFly id={id} fly_over="CO2_bedrift" fly_under="CO2_bedrift"/>} 
                        nøkkeltall_to={<NokkeltallFly id={id} flyo_over="CO2_bransje" fly_under="CO2_bransje"/>} 
                        tekst={"Tallene er basert på beregnet CO2-ekvivalent fra produksjonen i 2022"} 
                        dropDown={"Co2 produkjson forklart"}
                        show={"CO2 utslippet fra produksjon er beregnet etter drivstofforbruk under utvalgte aktiviteter i produksjonsprosessen. Disse aktivitetene er bruk av brønnbåter, produksjonsfarmer og servicebedriftbruk. Det benyttes en fast sats for utslipp  per liter brukt på 2.66 CO2 ekvivalenter."}
                        kilde={"Kilde: Konstruert tall basert på https://www.sintef.no/contentassets/25338e561f1a4270a59ce25bcbc926a2/report-carbon-footprint-norwegian-seafood-products-2017_final_040620.pdf/"}
                        graph={<MiljoGraph org_nr={id} apiurl_end="co2production" chart_title="CO2 utslipp i produksjon"/>} />

                </div>
            </div>
        </div>
        )
    }

export default FramesMiljo;