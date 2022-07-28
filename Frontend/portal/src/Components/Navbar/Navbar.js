import './Navbar.css'

const NavBar = () => {
    return (
        <div>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <nav className="navbar">
                <div className="navbar-img">
                        <a href="/"><img src={require('../Navbar/images/BR_logo-bokmaal_hvit.png')} className="image-nav" width="300" alt="logo"></img></a>
                </div>
                        <a className="nav-a" href="/Bedrifter" >Virksomheter</a>
                        <a className="nav-a" href="/Bærekraft">Bærekraft</a>
                        <a className="nav-a" href="/about">Regelverk</a>
                        <a className="nav-a">Meny</a>
            </nav>
       </div>
    )
}

export default NavBar;
