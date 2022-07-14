import React from "react";

import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <div>
            <NavLink to="/Bedrifter">Bedrifter</NavLink>
            <NavLink to="/Bedrifter_miljo">Bedrifter Miljo</NavLink>
        </div>
    )
}

export default Navigation;