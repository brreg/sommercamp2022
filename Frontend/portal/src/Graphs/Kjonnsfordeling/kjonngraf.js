import React from "react";
import ReactDOM from "react-dom";
import './kjonngraf.css';
import Guttergraf from "./guttergraf";
import Jentergraf from "./jentergraf";
 


const Kjonngraf = (props) => {

  const fullThreshold = 100
  const halfThreshold = 50
  let antallGutter = 60
  let antallJenter = 100-antallGutter

  return (
<div className="kjonnsgraf">

  <div className="guttene">
    {[...Array(10)].map((x, i) => {
      const graf = <Guttergraf offset2={antallGutter-fullThreshold/10>=0 ? 100 : antallGutter>=halfThreshold/10 ? 50 : 0} key={i} />
      antallGutter = antallGutter-10
      return graf
    }
    )}  <p className="prosent"> 60% menn </p>
  </div>



  <div className="jentene">
      {[...Array(10)].map((x, i) => {
        const graf = <Jentergraf offset2={antallJenter-10>=0 ? 100 : antallJenter>=5 ? 50 : 0} key={i} />
        antallJenter = antallJenter-10
        return graf
      }
      )}  <p className="prosent"> 40% kvinner </p>
  </div>



</div>
  );
}
 
//ReactDOM.render(<Zryan />, document.getElementById("app"));

export default Kjonngraf;




