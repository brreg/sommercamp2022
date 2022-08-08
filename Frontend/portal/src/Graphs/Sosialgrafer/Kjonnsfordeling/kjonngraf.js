import React, {useEffect, useState} from "react";
import './kjonngraf.css';
import Guttergraf from "./guttergraf";
import Jentergraf from "./jentergraf";


const Kjonngraf = (props) => {

  const axios = require('axios')

  const [jenter, setJenter] = useState(0)
  const [gutter, setGutter] = useState(0)

  const getData = async () => {
   await axios.get(`http://10.172.205.152:105/orgs/${props.id}/social`)
    .then( res=> {
      console.log(res.data.data[3].female_percent)
        setJenter(res.data.data[4].female_percent)
        setGutter(res.data.data[4].male_percent)
    })
    .catch( err=> {
        console.log(err)
    })
  }

  useEffect(() => {
      getData()
  }, []);


  const fullThreshold = 100
  const halfThreshold = 50
  let antallGutter = gutter
  let antallJenter = jenter

  return (
  <div className="kjonnsgraf">

  <div className="guttene">
    {[...Array(10)].map((x, i) => {
      const graf = <Guttergraf offset2={antallGutter-fullThreshold/10>=0 ? 100 : antallGutter>=halfThreshold/10 ? 50 : 0} key={i} />
      antallGutter = antallGutter-10
      return graf}
    )} 
  </div>



  <div className="jentene">
      {[...Array(10)].map((x, i) => {
        const graf = <Jentergraf offset2={antallJenter-fullThreshold/10>=0 ? 100 : antallJenter>=halfThreshold/10 ? 50 : 0} key={i} />
        antallJenter = antallJenter-10
        return graf}
      )}
  </div>



</div>
  );
}
 
//ReactDOM.render(<Zryan />, document.getElementById("app"));

export default Kjonngraf;




