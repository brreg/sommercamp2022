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
                            <p className="p_card_forside">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
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
                            <p className="p_card_forside">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
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
                            <p className="p_card_forside">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                        </div>
       
                    </div>
                </div>                       
            </div>
    )   
}

export default CardForside;

