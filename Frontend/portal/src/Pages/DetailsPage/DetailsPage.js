import React from 'react';
import "./DetailsPage.css";
import { useParams } from "react-router-dom";

const DetailsPage = () => {

    const {id} = useParams();

    return(
        <p className="overskrift-detailspage">{id}</p>
    )
}

export default DetailsPage;
