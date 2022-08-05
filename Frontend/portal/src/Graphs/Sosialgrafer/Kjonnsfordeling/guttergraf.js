import React from "react";
import ReactDOM from "react-dom";
import {v4 as uuidv4} from 'uuid'

 
const Guttergraf = (props) => {
  const uuid = uuidv4();
  return (
    <div className="guttIkon">

      <svg className="testgutter" fill={`url(#gradGutt-${uuid})`} width="55px" height="55px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="3.2" cy="2" r="2"/>


      <linearGradient id={`gradGutt-${uuid}`}>
      <stop offset={`${props.offset2}%`}  stop-color={props.offset2 == 0 ? "lightgrey" : "blue"} />
      <stop offset={`${100-props.offset2}%`} stop-color="lightgrey"/>
      </linearGradient>

      <path className= "svg"  d="M6,13.5V5.7c-.2-.4-.6-.7-1-.7H1c-.4,0-.8,.3-.9,.7v7.7H1v6.6H5v-6.5"/>
      </svg>

    </div>


  );
}
 
//ReactDOM.render(<Zryan />, document.getElementById("app"));

export default Guttergraf;




