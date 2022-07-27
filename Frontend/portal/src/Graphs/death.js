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

    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const [chartOptions, setChartOptions] = useState({})
    const axios = require('axios')

    useEffect(() => {

        let deadliness = []
        let year = []
        
        //axios.get("http://127.0.0.1:5000/orgs/886813082/deadliness")
        axios.get(`http://127.0.0.1:5000/orgs/${props.org_nr}/deadliness`)
        .then( res=> {
            console.log(res)
            for (const dataObj of res.data.data) {
                deadliness.push(parseInt(dataObj.loc_deadliness))
                year.push(parseFloat(dataObj.loc_year))
            }
            setChartData({
                labels: year,
                datasets: [
                    {
                        label: "Deadliness",
                        data: deadliness,
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgb(53, 162, 235, 0.4)",
                    },
                    
                ],
            });
        })
        .catch( err=> {
            console.log(err)
        })
      
        
        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: true,
                    text: "Deadliness data"
                }
            }
        })
    }, []);

    return (
        <div className="death">
            <Bar options={chartOptions} data={chartData} />
        </div>
    )

    
}


export default Death;