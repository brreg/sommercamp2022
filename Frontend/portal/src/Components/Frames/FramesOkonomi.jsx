import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Frame from './Frame';
import Soliditet from '../../Graphs/Okonomigrafer/soliditet';
import Likviditet from '../../Graphs/Okonomigrafer/likviditet';
import Lonnsomhet from '../../Graphs/Okonomigrafer/lonnsomhet';

function FramesOkonomi() {

    const {id} = useParams();
    
    const [orgname, setOrgname] = useState("")
    const axios = require('axios')

    useEffect(() => {
        
        axios.get(`http://10.172.205.152:105/orgs/${id}`)
        .then( res=> {
            setOrgname(res.data.data[0].org_name)
        })
        .catch( err=> {
            console.log(err)
        })
      
    }, []);

        return (
            <div className="container-frames">
            <div className="row-frames">
                <div className="column-frames">
                    <Frame overskrift= "Soliditet" 
                            tekst={`Dette diagrammet viser ${orgname} økonomiske soliditet for 2021`} 
                            graph={<Soliditet id={id}/>}
                            dropDown={"Soliditet forklart"}
                            show={"Soliditet viser hvor stor andel av eiendelene som er finansiert med egenkapital. Hvis egenkapital er under 100 000 kr anses soliditeten som svak. Tallene er hentet fra regnskapsregisteret."}
                            kilde={"Kilde: Regnskapsregisteret"}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Likviditet" 
                            tekst={`Dette diagrammet viser ${orgname} økonomiske likviditet for 2021`}
                            graph={<Likviditet id={id}/>}
                            dropDown={"Likviditet forklart"}
                            show={"Likviditet viser selskapets evne til å betale sine forpliktelser når de forfaller. Tallet regnes ut ved å dele selskapets omløpsmidler (tilgjengelige midler) på kortsiktig gjeld. Dataen er hentet fra regnskapsregisteret."}
                            kilde={"Kilde: Regnskapsregisteret"}/>
                </div>
                <div className="column-frames">
                    <Frame overskrift="Lønnsomhet" 
                            tekst={`Dette diagrammet viser ${orgname} økonomiske likviditet for 2021`}                            
                            graph={<Lonnsomhet id={id}/>}
                            dropDown={"Lønnsomhet forklart"}
                            show={"Lønnsomheten (totalkapitalrentabilitet) i et foretak er et mål på avkastningen på selskapets eiendeler. Et vanlig lønnsomhetsnivå er 10 - 15%, men lønnsomhetsnivået bør ligge over det selskapet betaler for sine lån. Tallene er hentet fra regnskapsregisteret."}
                            kilde={"Kilde: Regnskapsregisteret"}/>
                </div>
            </div>
        </div>
        )
    }

export default FramesOkonomi;