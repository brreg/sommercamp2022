import "./Navbar.css";
import React from "react";

const NavBar = () => {
  return (
    <div>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <nav className="navbar">
        <a href="/">
          <img
            src={require("./images/BR_logo-bokmaal_hvit.png")}
            className="image-nav navbar-img"
            alt="logo"
          ></img>
        </a>
        <a className="nav-a nav-left nav-virksomheter" href="/Bedrifter/Miljo">
          Virksomheter
        </a>
        <a className="nav-a nav-left" href="">
          Bærekraft
        </a>
        <a className="nav-a nav-left" href="">
          Regelverk
        </a>
        <a className="nav-a nav-right" href="">
          Meny
        </a>
        <a className="nav-a nav-right" href="">
          Språk
        </a>
      </nav>
    </div>
  );
};

export default NavBar;
