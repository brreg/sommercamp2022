import axios from "axios";

const transform_kpi = async(kpi) => {

switch(kpi) {
    case "death percentage": 
        return "Dødlighets gjennomsnitt";
    }
};

export default transform_kpi