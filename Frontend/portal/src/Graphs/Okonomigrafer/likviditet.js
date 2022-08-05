import React, {useEffect, useState} from 'react';
import PilOpp from '../../Components/Frames/images/PilOpp.png'

import "./okonomi.css"



const Likviditet = (props) => {

    const axios = require('axios')

    const [arrowLoc, setArrowLoc] = useState(0)

    const [globalLikviditet, setGlobalLikviditet] = useState(0)

    useEffect(() => {
        getLikviditetsData()
    }, []);

    const getLikviditetsData = async () => {
        await axios.get(`http://10.172.205.152:105/accounts/${props.id}/`)
        .then( res=> {
            console.log(res.data.data[4].liquidity_ratio)
            setGlobalLikviditet(res.data.data[4].liquidity_ratio)
            setArrowLocation(res.data.data[4].liquidity_ratio)
        })
        .catch( err=> {
            console.log(err)
        })
        
    } 

    const setArrowLocation = (likviditet) => {
    if (likviditet <= 0.5) {
        setArrowLoc(0)
    }
    else if (likviditet <= 1) {
        setArrowLoc(1)
    }
    else if (likviditet <= 1.5) {
        setArrowLoc(2)
    }
    else if (likviditet <= 2) {
        setArrowLoc(3)
    }
    else if (likviditet >= 2) {
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
                return  <div key={i} className="arrowbox"> <img className="arrow" src={require('../../Components/Frames/images/PilOpp.png')}/> <div className="textbox2"> {globalLikviditet} </div>  </div>
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
export default Likviditet;
