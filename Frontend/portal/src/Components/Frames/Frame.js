import React from 'react';
import './Frame.css'

const Frame = props => {
/*
    const [hover, setHover] = useState(false);
    const onHover = () => {
        setHover(true);
    };

    const onHover = () => {
        setHover(false);
    } */

    return (
        <div className="container-frame">

            <div className="overskrift-frame">
                <p className="p-overskrift-frame"> {props.overskrift} </p>
                <div className="p-spørsmålstegn-frame">
                    <p className="p-spørsmålstegn">?</p>
                </div>
            </div>

            <div className="nøkkeltall-frame">
           
                {props.nøkkeltall_en}
                {props.nøkkeltall_to}
                {props.nøkkeltall_tre}
            </div>
            
            <div className="tekst-til-nøkkeltall">
                <p className="p-tekst"> Beskrivende tekst til nøkkeltall:</p>
            </div>

            <div>
                <div className="graf-frame">
                    <p className="p-graf">{props.graph}</p>
                </div>
                <div className="tekstboks-frame">
                    <p className="p-tekst">
                        Beskrivende tekst til grafen:
                    <br></br> 
                    <br></br> 
                        Kilde: 

                    </p>
                </div>
            </div>

        </div>
    )

};

export default Frame;
