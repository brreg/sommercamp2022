import axios from "axios";

const transform_kpi = async() => {

    const getAllOrgs = 
        await axios.get('http://127.0.0.1:5000/orgs/')
        .then((response) => {return response.data})
        .catch(error => console.error(`Error: ${error}`));

    console.log(getAllOrgs)


switch(getAllOrgs) {
    case "org_nr": 
        return "Test org nummer";
    case "org_name": 
        return "Test org navn";
    default: 
        return "Kunne ikke finne data";
    }
};

export default transform_kpi