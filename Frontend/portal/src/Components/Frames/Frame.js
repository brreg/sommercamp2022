import React, {useState} from 'react';
import './Frame.css'

const Frame = props => {

    const [show, setShow] = useState(false);

    function toggleHidden() {
        setShow(!show)
    }

    return (
        <div className="container-frame">

            <div className="overskrift-frame">
                <p className="p-overskrift-frame"> {props.overskrift} </p>
            </div>

            <div>
                <button onClick={toggleHidden}>{props.dropDown}</button>
                <div>
                    {show &&  <p>{props.show}</p>}
                </div>
            </div>

            <div className="nøkkeltall-frame">
           
                {props.nøkkeltall_en}
                {props.nøkkeltall_to}
            </div>

            <div>
                <div className="graf-frame">
                    {props.graph}
                </div>
                <div className="tekstboks-frame">
                    <p className="p-tekst">
                        {props.tekst}
                    <br></br> 
                    <br></br> 
                        Kilde: 

                    </p>
                </div>
            </div>

        </div>
    )

};

export default Frame;
