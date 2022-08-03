import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <div className="footer">
                <div className="footers footer-1">
                    <img src={require('./images/BR_logo-bokmaal_hvit.png')} className="img-footer"></img>
                    <p className="p-footer">Organisasjonsnummer:</p>
                    <p className="p-footer">974 760 673</p>
                </div>

                <div className="footers footer-2">
                    <p className="p-footer p-footer-bold">Linker</p>
                    <p className="p-footer">Om oss</p>
                    <p className="p-footer">Personvern</p>
                    <p className="p-footer">Jobb hos oss</p>
                    <p className="p-footer">Forenklingsloggen</p>
                    <p className="p-footer">Personvernerklæring</p>
                    <p className="p-footer">Driftsmeldinger</p>
                </div>

                <div className="footers footer-3">
                    <p className="p-footer p-footer-bold">Følg oss</p>
                    <div className="some">
                        <img src={require('./images/Facebook-icon.png')} className="img-some"></img>
                        <img src={require('./images/Linked-in.png')} className="img-some"></img>
                        <img src={require('./images/Insta-ikon.png')} className="img-some"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;