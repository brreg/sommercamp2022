import axios from "axios";

const transform_kpi = async(org_nr, kpi) => {

    const getAllOrgs = 
        await axios.get(`http://127.0.0.1:5000/orgs/${org_nr}/${kpi}`)
        .then((response) => {return response.data})
        .catch(error => console.error(`Error: ${error}`));

switch(kpi) {
    case "death percentage": 
        return "Dødlighets gjennomsnitt";
    }
};

export default transform_kpi