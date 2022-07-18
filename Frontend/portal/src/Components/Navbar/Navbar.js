import navbar from './Navbar.module.css'

const NavBar = () => {
    return (
        <div className={navbar.Navbar}>
            <nav>
                <ul>
                    <li> 
                        <a href="/"><img src={require('../Navbar/images/logo.jpeg')} className={navbar.Image} width="300" alt="logo"></img></a>
                    </li>
                    <li>
                        <a href="/Bærekraft">Bærekraft</a>
                    </li>
                    <li>
                        <a href="/Bedrifter">Bedrifter</a>
                    </li> 
                    <li>
                        <a href="/about">Om oss</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;
