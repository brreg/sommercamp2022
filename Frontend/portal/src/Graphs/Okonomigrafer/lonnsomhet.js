import React, {useEffect, useState} from 'react';
import PilOpp from '../../Components/Frames/images/PilOpp.png'

import "./okonomi.css"



const Lonnsomhet = (props) => {

    const axios = require('axios')

    const [arrowLoc, setArrowLoc] = useState(0)

    const [globalLonnsomhet, setGlobalLonnsomhet] = useState(0)

    useEffect(() => {
        getLonnsomhetData()
    }, []);

    const getLonnsomhetData = async () => {
        await axios.get(`http://10.172.205.152:105/accounts/${props.id}/`)
        .then( res=> {
            console.log(res.data.data[4].return_on_assets)
            setGlobalLonnsomhet(res.data.data[4].return_on_assets)
            setArrowLocation(res.data.data[4].return_on_assets)
        })
        .catch( err=> {
            console.log(err)
        })
        
    } 

    const setArrowLocation = (lonnsomhet) => {
    if (lonnsomhet <= 1) {
        setArrowLoc(0)
    }
    else if (lonnsomhet <= 6) {
        setArrowLoc(1)
    }
    else if (lonnsomhet <= 10) {
        setArrowLoc(2)
    }
    else if (lonnsomhet <= 15) {
        setArrowLoc(3)
    }
    else if (lonnsomhet >= 15) {
        setArrowLoc(4)
    }
    }



    return (
        <div className="overall_container">
            <div className="text_container">
                <div className="textbox"> Ikke tilfredsstillende </div>
                <div className="textbox"> Svak </div>
                <div className="textbox"> Tilfredsstillende </div>
                <div className="textbox"> God </div>
                <div className="textbox"> Svært god </div>
            </div>
            <div className="graph_container">
                <div className="box box1"> </div>
                <div className="box box2"> </div>
                <div className="box box3"> </div>
                <div className="box box4"> </div>
                <div className="box box5"> </div>
            </div>

            <div className="arrow_container">
            {[...Array(5)].map((x, i) => {
            if (arrowLoc === i){
                return  <div key={i} className="arrowbox">  <img className="arrow" src={require('../../Components/Frames/images/PilOpp.png')}/> <div className="textbox2"> {globalLonnsomhet}% </div>  </div>
            }
            else {
                return <div key={i} className="arrowbox"> </div>
            }
            })}
            </div>

        </div>
    );

}


// rendering above class to the React DOM
export default Lonnsomhet;
