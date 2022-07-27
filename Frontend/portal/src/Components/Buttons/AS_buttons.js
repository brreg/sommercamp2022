import React, { Component } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import "./AS_buttons.css"


function AS_buttons() {

    const {id} = useParams();
    const navigate = useNavigate();

        return(
            <div className="btn-toolbar">

            <button onClick={function handleClick(){navigate(`/${id}`)}}>Generelt</button>
            <button onClick={function handleClick(){navigate(`/${id}/Miljo`)}}> Miljø</button>
            <button onClick={function handleClick(){navigate(`/${id}/Sosial`)}}>Sosial</button>
            <button onClick={function handleClick(){navigate(`/${id}/Okonomi`)}}>Økonomi</button>

            </div>
        )
}

export default AS_buttons;