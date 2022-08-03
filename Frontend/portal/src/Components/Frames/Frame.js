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

            <div className="container_btn">
                <button onClick={toggleHidden} className="btn-dropDown">{props.dropDown} {show ? <img className="Pil" src={require('./PilOpp.png')}/> : <img className="Pil" src={require('./PilNed.png')}/>} </button>
                <div>
                    {show && <p className="p-hidden">{props.show}</p>}
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
                    <p className="p-tekst-frame">
                        {props.tekst}
                    </p>
                    <p className="p-kilde">{props.kilde}</p>
                </div>
            </div>

        </div>
    )

};

export default Frame;
