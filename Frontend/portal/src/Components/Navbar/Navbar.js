import navbar from './Navbar.module.css'

const NavBar = () => {
    return (
        <div className={navbar.Navbar}>
            <nav>
                <ul>
                    <li>
                        <a href="/">Hjem</a>
                    </li>
                    <li>
                        <a href="/#about">Om oss</a>
                    </li>
                    <li>
                        <a href="/#Bærekraft">Bærekraft</a>
                    </li>
                    <li>
                        <a href="/#Bedrifter">Bedrifer</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;
