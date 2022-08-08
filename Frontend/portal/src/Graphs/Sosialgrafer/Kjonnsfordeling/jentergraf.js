import React from "react";
import ReactDOM from "react-dom";
import {v4 as uuidv4} from 'uuid'

 
const Jentergraf = (props) => {
  const uuid = uuidv4();
  return (
    <div className="jenteIkon">

<svg fill={`url(#gradJente-${uuid})`} width="55px" height="55px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="4" r="2"/>


<linearGradient id={`gradJente-${uuid}`}>
<stop offset={`${props.offset2}%`}  stop-color={props.offset2 == 0 ? "lightgrey" : "#2B47EE"} />
<stop offset={`${100-props.offset2}%`} stop-color="lightgrey"/>
</linearGradient>

<path d="M14.948 7.684A.997.997 0 0 0 14 7h-4a.998.998 0 0 0-.948.684l-2 6 1.775.593L8 18h2v4h4v-4h2l-.827-3.724 1.775-.593-2-5.999z"/>
</svg>

    </div>


  );
}
 
//ReactDOM.render(<Zryan />, document.getElementById("app"));

export default Jentergraf;




