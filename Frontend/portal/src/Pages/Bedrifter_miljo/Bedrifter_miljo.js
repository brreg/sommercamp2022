import React, { useEffect, useState } from 'react';
import "./Bedrifter_miljo.css"
import Card from '../../Components/Cards/Cards'
import {useNavigate} from 'react-router-dom'
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

const Bedrifter_miljo = () => {
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


    const navigate = useNavigate();

    return (
        <div>
            <div className="btn-toolbar" style = {{position: "absolute", top: 140}}>
            <button onClick={function handleClick(){navigate("/Bedrifter")}}>Generelt</button>
            <button onClick={function handleClick(){navigate("/Bedrifter_miljo")}}> Miljø</button>
            <button onClick={function handleClick(){navigate("/Bedrifter_sosial")}}>Sosial</button>
            <button onClick={function handleClick(){navigate("/Bedrifter_okonomi")}}>Økonomi</button>
        </div>

            <div className="card-">
                <Card />
                <Bar options={chartOptions} data={chartData} />
            </div>
        
        </div>
    )  
}

export default Bedrifter_miljo;
