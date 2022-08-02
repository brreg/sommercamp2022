import React from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import "./AS_buttons.css"


function AS_buttons() {

    const {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname.includes("Miljo")){
        return(
            <div className="btn-toolbar">
                <button id="selected" onClick={function handleClick(){navigate(`/${id}/Miljo`)}}> Miljø</button>
                <button onClick={function handleClick(){navigate(`/${id}/Sosial`)}}>Sosial</button>
                <button onClick={function handleClick(){navigate(`/${id}/Okonomi`)}}>Økonomi</button>
            </div>
        )
    }
    else if (location.pathname.includes("Sosial")){
        return(
            <div className="btn-toolbar">
                <button onClick={function handleClick(){navigate(`/${id}/Miljo`)}}> Miljø</button>
                <button id="selected" onClick={function handleClick(){navigate(`/${id}/Sosial`)}}>Sosial</button>
                <button onClick={function handleClick(){navigate(`/${id}/Okonomi`)}}>Økonomi</button>
            </div>
        )
    }
    else if (location.pathname.includes("Okonomi")){
        return(
            <div className="btn-toolbar">
                <button onClick={function handleClick(){navigate(`/${id}/Miljo`)}}> Miljø</button>
                <button onClick={function handleClick(){navigate(`/${id}/Sosial`)}}>Sosial</button>
                <button id="selected" onClick={function handleClick(){navigate(`/${id}/Okonomi`)}}>Økonomi</button>
            </div>
        )
    }


        
}

export default AS_buttons;