import React, {useEffect, useState} from 'react';
import {useParams } from 'react-router-dom';
import Frame from './Frame';
import Nokkeltall from '../Nokkeltall/Nokkeltall'
import NokkeltallFly from '../Nokkeltall/NokkeltallFly'
import Death from '../../Graphs/death'
import Escape from '../../Graphs/escape'
import Lice from '../../Graphs/lice'
import Feed from '../../Graphs/feed'
import Production from '../../Graphs/production'

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
                    <Frame overskrift= "Dødlighet" nøkkeltall_en={<Nokkeltall id={id} kpi="Dødlighet_bedrift" kpi2="Dødlighet_bedrift"/>} nøkkeltall_to={<Nokkeltall kpi="Dødlighet_bransje" id={id} kpi2="Dødlighet_bedrift"/>} tekst={"Grafen viser prosentandelen av produsert laks som har dødd under produksjon fra 2017-2021"} graph={<Death org_nr={id}/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Rømninger" nøkkeltall_en={<Nokkeltall id={id} kpi="Rømninger_bedrift" kpi2="Rømninger_bedrift"/>} nøkkeltall_to={<Nokkeltall id={id} kpi="Rømninger_bransje" kpi2="Rømninger_bedrift"/>} tekst={"Grafen viser antall rømninger per år fra 2017-2021"} graph={<Escape org_nr={id}/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Lakselus" nøkkeltall_en={<Nokkeltall id={id} kpi="Lakselus_bedrift" kpi2="Lakselus_bedrift"/>} nøkkeltall_to={<Nokkeltall id={id} kpi="Lakselus_bransje" kpi2="Lakselus_bedrift"/>} tekst={"Grafen viser gjennomsnittlig lakselus per fisk fra 2017-2021"} graph={<Lice org_nr={id}/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Fôrproduksjon" nøkkeltall_en={<NokkeltallFly id={id} kpi3="Fôrproduksjon_bedrift" kpi4="Fôrproduksjon_bedrift"/>} nøkkeltall_to={<NokkeltallFly id={id} kpi3="Fôrproduksjon_bransje" kpi4="Fôrproduksjon_bransje"/>} tekst={"Tallene er basert på beregnet CO2-ekvivalent fra fôrforbruket i 2022"} graph={<Feed org_nr={id}/>}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="CO2" nøkkeltall_en={<NokkeltallFly id={id} kpi3="CO2_bedrift" kpi4="CO2_bedrift"/>} nøkkeltall_to={<NokkeltallFly id={id} kpi3="CO2_bransje" kpi4="CO2_bransje"/>} tekst={"Tallene er basert på beregnet CO2-ekvivalent fra produksjonen i 2022"} graph={<Production org_nr={id}/>}/>
                </div>
            </div>
        </div>
        )
    }

export default FramesMiljo;