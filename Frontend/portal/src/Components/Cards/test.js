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


const Test = () => {
    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        setChartData({
            labels: ['john', 'kevin', 'george', 'michael', 'oreo'],
            datasets: [
                {
                    label: "Whom'st let the dogs out",
                    data: [12, 55, 34, 120, 720],
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgb(53, 162, 235, 0.4)",
                },
            ],
        });
        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: true,
                    text: "Whom'st let the dogs out"
                }
            }
        })
    }, []);

    return (
        <div className="test">
            <h1>Test</h1>
            <Bar options={chartOptions} data={chartData} />
        </div>
    )

    
}


export default Test;