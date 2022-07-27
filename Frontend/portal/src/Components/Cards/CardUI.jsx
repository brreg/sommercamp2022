import React from 'react';
import './Cards.css';

const Card = props => {
    return (
        <div className="small text-center">
            <div>
                {props.graph}
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

export default Card;