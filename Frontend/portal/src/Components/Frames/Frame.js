import React from 'react';

const Frame = props => {

    return (
        <div className="container">
            <div className="overskrift-frame">
                <h1> Overskrift </h1>
            </div>
            <div className="nøkkeltall-frame">
                <div className="nøkkeltall-1">
                    123
                </div>
                <div className="nøkkeltall-2">
                    123
                </div>
                <div className="nøkkeltall-3">
                    123
                </div>
                <p> Beskrivende tekst til nøkkeltall</p>
            </div>
            <div>
                <div className="graf-frame">
                    TestGraf
                </div>
                <div className="tekstboks-frame">
                    Beskrivende tekst til grafen
                </div>
            </div>
        </div>
    )

};

export default Frame;
