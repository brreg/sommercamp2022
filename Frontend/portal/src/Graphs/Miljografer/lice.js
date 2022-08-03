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


const Lice = props => {

    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const [chartOptions, setChartOptions] = useState({})
    const axios = require('axios')

    useEffect(() => {

        let licedata = []
        let year = []
        
        //axios.get("http://127.0.0.1:5000/orgs/886813082/deadliness")
        axios.get(`http://127.0.0.1:5000/orgs/${props.org_nr}/licedata`)
        .then( res=> {
            //console.log(res)
            for (const dataObj of res.data.data) {
                licedata.push(parseFloat(dataObj.year_avg_lice))
                year.push(parseInt(dataObj.year))
            }
            setChartData({
                labels: year,
                datasets: [
                    {
                        label: "Licedata",
                        data: licedata,
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
                    text: "Lice data"
                }
            }
        })
    }, []);

    return (
        <div className="lice">
            <Bar options={chartOptions} data={chartData} />
        </div>
    )
}
export default Lice;