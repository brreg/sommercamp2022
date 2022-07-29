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


const Escape = props => {

    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const [chartOptions, setChartOptions] = useState({})
    const axios = require('axios')

    useEffect(() => {

        let escapes = []
        let year = []
        
        //axios.get("http://127.0.0.1:5000/orgs/886813082/escapedata")
        axios.get(`http://127.0.0.1:5000/orgs/${props.org_nr}/escapedata`)
        .then( res=> {
            console.log(res)
            for (const dataObj of res.data.data) {
                escapes.push(parseInt(dataObj.escape_count_sum))
                year.push(parseFloat(dataObj.year))
            }
            setChartData({
                labels: year,
                datasets: [
                    {
                        label: "Escapes",
                        data: escapes,
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
                    text: "Escape data"
                }
            }
        })
    }, []);

    return (
        <div className="escape">
            <Bar options={chartOptions} data={chartData} />
        </div>
    )
}
export default Escape;