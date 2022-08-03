import React, { useEffect, useState } from 'react';
// import "./App.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import {Bar} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const Death = props => {

    const [averagesData,setAveragesData] = useState([])
    const [thisCompData, setThisCompData] = useState([])
    const [year, setYear] = useState([])

    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const [chartOptions, setChartOptions] = useState({})
    const axios = require('axios')

    const getData = async () =>{
        await axios.get(`http://127.0.0.1:5000/orgs/averages/${props.apiurl_end}`) // replace deadliness with prop name
        .then( res => {
            let tempAveragesData = []
            for (const dataObj of res.data.data) {
                tempAveragesData.push(parseFloat(dataObj.average_all)) // prop name here too
            }
            setAveragesData(tempAveragesData)
        })
        .catch(err=> {
            console.error(err)
        })

        await  axios.get(`http://127.0.0.1:5000/orgs/${props.org_nr}/deadliness`) // props name
        .then( res=> {
            let tempThisCompData = []
            let tempYear = []
            for (const dataObj of res.data.data) {
                tempThisCompData.push(parseFloat(dataObj.thiscomp))
                tempYear.push(parseInt(dataObj.year)) //// props name
            }
            setYear(tempYear)
            setThisCompData(tempThisCompData)
        })
        .catch( err=> {
            console.error(err)
        })
        
    }
    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        
        setChartData({
            labels: year,
            datasets: [
                {
                    label: "This company", // prop name
                    data: thisCompData,
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "blue",
                },
                {
                    label: "Industry Average", // props name
                    data: averagesData,
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "green",
                }
            ],
        })

        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: true,
                    text: "Deadliness data" // prop name
                }
            }
        })
    }, [averagesData, thisCompData, year])


    // prop name 
    return (
        <div className="death"> 
        <div>
            <Bar options={chartOptions} data={chartData} />
        </div>
        </div>
    )
}
export default Death; // maybe more general name? 