import React from 'react';
import './Frame.css'

const Frame = props => {

    return (
        <div className="container-frame">

            <div className="overskrift-frame">
                <p className="p-overskrift-frame"> {props.overskrift} </p>
            </div>

            <div className="nøkkeltall-frame">
           
                {props.nøkkeltall_en}
                {props.nøkkeltall_to}
            </div>
            
            <div className="tekst-til-nøkkeltall">
                <p className="p-tekst"> Beskrivende tekst til nøkkeltall:</p>
            </div>

            <div>
                <div className="graf-frame">
                    {props.graph}
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
