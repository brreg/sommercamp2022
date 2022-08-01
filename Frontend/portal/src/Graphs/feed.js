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


const Feed = props => {

    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const [chartOptions, setChartOptions] = useState({})
    const axios = require('axios')

    useEffect(() => {

        let co2emissions_feed = []
        let year = []
        
        axios.get(`http://127.0.0.1:5000/orgs/${props.org_nr}/co2feed//`)
        .then( res=> {
            console.log(res)
            for (const dataObj of res.data.data) {
                co2emissions_feed.push(parseFloat(dataObj.co2emissions_feed_sum))
                year.push(parseInt(dataObj.year))
            }
            setChartData({
                labels: year,
                datasets: [
                    {
                        label: "Feed co2 emission data",
                        data: co2emissions_feed,
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
                    text: "Feed data"
                }
            }
        })
    }, []);

    return (
        <div className="feed">
            <Bar options={chartOptions} data={chartData} />
        </div>
    )
}
export default Feed;