import './Navbar.css'

const NavBar = () => {
    return (
        <div>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <nav className="navbar">
                <div className="navbar-img">
                        <a href="/"><img src={require('./images/BR_logo-bokmaal_hvit.png')} className="image-nav" alt="logo"></img></a>
                </div>
                        <a className="nav-a" href="/Bedrifter/Miljo" >Virksomheter</a>
                        <a className="nav-a" href="">Bærekraft</a>
                        <a className="nav-a" href="">Regelverk</a>
                        <a className="nav-a">Meny</a>
            </nav>
       </div>
    )
}

export default NavBar;
