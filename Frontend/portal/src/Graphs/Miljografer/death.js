import React, { useEffect, useState } from 'react';
import useFetchData from '../../Components/DataFetcher/fetchdata';
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

    const {averagesData, loading} = useFetchData();
    console.log(averagesData)

    useEffect(() => {

        let deadliness_percentages = []
        let year = []
        
        //axios.get("http://127.0.0.1:5000/orgs/886813082/deadliness")
        axios.get(`http://127.0.0.1:5000/orgs/${props.org_nr}/deadliness`)
        .then( res=> {
            //console.log(res)
            for (const dataObj of res.data.data) {
                deadliness_percentages.push(parseFloat(dataObj.death_percentage))
                year.push(parseInt(dataObj.year))
            }
            setChartData({
                labels: year,
                datasets: [
                    {
                        label: "This company",
                        data: deadliness_percentages,
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "blue",
                    },
                    {
                        label: "Industry Average",
                        data: averagesData,
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "green",
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
                    text: "Deadliness data"
                }
            }
        })
    }, []);

    return (
        
        <div className="death">
        {loading && <div>Loading</div>}
        {!loading && (
        <div>
            <Bar options={chartOptions} data={chartData} />
        </div>
        )}
        </div>
    )
}
export default Death;