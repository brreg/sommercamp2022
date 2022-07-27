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


const Econ = () => {
    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const [chartOptions, setChartOptions] = useState({})
    const axios = require('axios')

    useEffect(() => {

        let liquidity_ratio = []
        let return_on_assets = []
        let solidity = []
        
        axios.get("http://127.0.0.1:5000/accounts/969159570/")
        .then( res=> {
            console.log(res)
            for (const dataObj of res.data.data) {
                liquidity_ratio.push(parseInt(dataObj. liquidity_ratio))
                return_on_assets.push(parseFloat(dataObj.return_on_assets))
                solidity.push(parseFloat(dataObj.solidity))
            }
            setChartData({
                labels: ["liquidity_ratio", "return_on_assets", "solidity"],
                datasets: [
                    {
                        label: "Liquidity ratio",
                        data: liquidity_ratio,
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgb(53, 162, 235, 0.4)",
                    },
                    {
                        label: "Return on assets",
                        data: return_on_assets,
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgb(53, 162, 235, 0.4)",
                    },
                    {
                        label: "Solidity",
                        data: solidity,
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgb(53, 162, 235, 0.4)",
                    }
                    
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
        <div className="econ">
            <Bar options={chartOptions} data={chartData} />
        </div>
    )

    
}


export default Econ;