import './Navbar.css'
import React from 'react';

const NavBar = () => {
    return (
        <div>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <nav className="navbar">
                <div className="navbar-img">
                        <a href="/"><img src={require('./images/BR_logo-bokmaal_hvit.png')} className="image-nav" alt="logo"></img></a>
                </div>
                        <a className="nav-a-left" href="/Bedrifter/Miljo" >Virksomheter</a>
                        <a className="nav-a-left" href="">Bærekraft</a>
                        <a className="nav-a-left" href="">Regelverk</a>
                        <a className="nav-a-right" href="">Meny</a>
                        <a className="nav-a-right" href="">Språk</a>
                        
                        

            </nav>
       </div>
    )
}

export default NavBar;
