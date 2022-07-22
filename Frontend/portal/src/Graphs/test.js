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
        let empSal = [];
        let empAge = [];
        
        axios.get("http://127.0.0.1:5000/location/15196/licedata/")
        .then( res=> {
            console.log(res)
        })
        .catch( err=> {
            console.log(err)
        })
        /*axios.get("https://dummy.restapiexample.com/api/v1/employees")
        .then( res => {
            console.log(res)
            for(const dataObj of res.data.data) {
                empSal.push(parseInt(dataObj.employee_salary))
                empAge.push(parseInt(dataObj.employee_age))
            }
            setChartData({
                labels: empAge,
                datasets: [
                    {
                        label: "Whom'st let the dogs out",
                        data: empSal,
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgb(53, 162, 235, 0.4)",
                    },
                    
                ],
            });
        })
        .catch(err => {
            console.log(err)
        });
        console.log(empSal, empAge);
        */
        
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
            <Bar options={chartOptions} data={chartData} />
        </div>
    )

    
}


export default Test;