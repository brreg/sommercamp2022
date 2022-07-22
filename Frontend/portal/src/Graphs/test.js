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
    const [employeeSalary, setEmployeeSalary] = useState([]);
    const [employeeAge, setEmployeeAge] = useState([]);

    const [chartOptions, setChartOptions] = useState({})
    const axios = require('axios')

    useEffect(() => {

        let week = []
        let lice = []
        
        axios.get("http://127.0.0.1:5000/location/15196/licedata/")
        .then( res=> {
            console.log(res)
            for (const dataObj of res.data.data) {
                week.push(parseInt(dataObj.lice_week))
                lice.push(parseFloat(dataObj.lice_nr))
            }
            setChartData({
                labels: week,
                datasets: [
                    {
                        label: "Licenrs",
                        data: lice,
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
        <div className="test">
            <Bar options={chartOptions} data={chartData} />
        </div>
    )

    
}


export default Test;