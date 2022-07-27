import React from 'react';
import './Frame.css'

const Frame = props => {
    return (
        <div className="container-frame">

            <div className="overskrift-frame">
                <p className="p-oversrkfit overskrift-frame"> {props.overskrift} </p>
            </div>

            <div className="nøkkeltall-frame">
                <div className="nøkkeltall">
                    <p className="p-props tekst-nøkkeltall"> {props.nokkeltall1}</p>
                </div>
                <div className="nøkkeltall">
                    <p className="p-props tekst-nøkkeltall">{props.nokkeltall2}</p>
                </div>
                <div className="nøkkeltall">
                    <p className="p-props tekst-nøkkeltall">{props.nokkeltall3}</p>
                </div>
            </div>
            
            <div className="tekst-til-nøkkeltall">
                <p className="p-tekst"> Beskrivende tekst til nøkkeltall:</p>
            </div>

            <div>
                <div className="graf-frame">
                    <p className="p-graf">Props Testgraf</p>
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
