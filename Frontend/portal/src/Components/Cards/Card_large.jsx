import React from 'react';
import './Cards.css';

const Card_Large = props => {
    return (
        <div className="card large text-center">
            <div>
                <img src={props.imgsrc} alt="Image" className="card-img"/>
            </div>
            <div className="card-body">
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Ipsam perspiciatis laboriosam quod rem sequi et magni, 
                    tenetur adipisci pariatur blanditiis.
                </p>
            </div>
        </div>
    )
}

export default Card_Large;