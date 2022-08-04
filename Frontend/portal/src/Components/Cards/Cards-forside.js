import React from 'react';
import './Cards-forside.css'

const CardForside = () => {
    return (
        <div className="row_forside">
                <div className="column_forside">
                    <div className="card_forside card-virksomheter">
                        <div>
                            <p className="overskrift_card_forside">Virksomheter</p>
                            <a href="/"><img src={require('./Images/Pil-ikon.png')} className="image-card" alt="logo"></img></a>
                        </div>
                        <div>
                            <p className="p_card_forside">Samlet oversikt over alle selskaper (AS) kategorisert etter bransje.</p>
                        </div>
                    </div>
                </div>
                <div className="column_forside">
                    <div className="card_forside card-barekraft">
                        <div>
                            <p className="overskrift_card_forside">Bærekraft</p>
                            <a href="/"><img src={require('./Images/Pil-ikon.png')} className="image-card" alt="logo"></img></a>
                        </div>
                        <div>
                            <p className="p_card_forside">Les mer om FNs bærekraftsmål og Norges handlingsplan for å nå bærekraftsmålene.</p>
                        </div>
                    </div>
                </div>
                <div className="column_forside">
                    <div className="card_forside card-regelverk">
                        <div>
                            <p className="overskrift_card_forside">Regelverk</p>
                            <a href="/"><img src={require('./Images/Pil-ikon.png')} className="image-card" alt="logo"></img></a>
                        </div>
                        <div>
                            <p className="p_card_forside">Oversikt over eksisterende og kommende regelverk på bærekraftsområde.</p>
                        </div>
       
                    </div>
                </div>                       
            </div>
    )   
}

export default CardForside;

