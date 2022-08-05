import React, { useEffect, useState } from 'react';
// import "./App.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement
} from 'chart.js'
import {Bar} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement
);


const LiceGraph = props => {

    const [averagesData,setAveragesData] = useState([])
    const [thisCompData, setThisCompData] = useState([])
    const [year, setYear] = useState([])
    const[licelimit, setLicelimit] = useState([])

    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const [chartOptions, setChartOptions] = useState({})
    const axios = require('axios')

    const getData = async () =>{
        // 10.172.205.152:105
        // 127.0.0.1:5000
        let url = `http://10.172.205.152:105/averages/${props.apiurl_end}`
        await axios.get(url) 
        .then( res => {
            let tempAveragesData = []
            for (const dataObj of res.data.data) {
                tempAveragesData.push(parseFloat(dataObj.average_all)) 
            }
            setAveragesData(tempAveragesData)
        })
        .catch(err=> {
            console.error(err)
        })

        await  axios.get(`http://10.172.205.152:105/orgs/${props.org_nr}/${props.apiurl_end}`) 
        .then( res=> {
            let tempThisCompData = []
            let tempYear = []
            for (const dataObj of res.data.data) {
                tempThisCompData.push(parseFloat(dataObj.thiscomp))
                tempYear.push(parseInt(dataObj.year)) 
            }
            setYear(tempYear)
            setThisCompData(tempThisCompData)
        })
        .catch( err=> {
            console.error(err)
        })

        
        await  axios.get(`http://127.0.0.1:5000/orgs/${props.org_nr}/licelimit/`) 
        .then( res=> {
            let tempLimit = []
            for (const dataObj of res.data.data) {
                tempLimit.push(parseFloat(dataObj.limit))
            }
            setLicelimit(tempLimit)
        })
        .catch( err=> {
            console.error(err)
        })
    
        
    }
    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        
        setChartData({
            labels: year,
            datasets: [
                {   
                    type: "bar",
                    label: "This company", // replace w prop name?
                    data: thisCompData,
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "#2B47EE",
                },
                {   
                    type: "bar",
                    label: "Industry Average", // replace w props name?
                    data: averagesData,
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "#11CD89",
                }, 
                {   
                    type: "line",
                    label: "Lice limit", // replace w props name?
                    data: licelimit,
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "#11CD89",
                }
            ],
        })

        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: true,
                    text: props.chart_title // prop
                }
            }
        })
    }, [averagesData, thisCompData, year])


    return (
        <div className="licegraph"> 
        <div>
            <Bar options={chartOptions} data={chartData} />
        </div>
        </div>
    )
}
export default LiceGraph; 

//     const [averagesData,setAveragesData] = useState([])
//     const [thisCompData, setThisCompData] = useState([])
//     const [year, setYear] = useState([])
//     const[licelimit, setLicelimit] = useState([])

//     const [chartData, setChartData] = useState({
//         datasets: [],
//     })

//     const [chartOptions, setChartOptions] = useState({})
//     const axios = require('axios')

//     const getData = async () =>{
//         // 10.172.205.152:105
//         // 127.0.0.1:5000
//         let url = `http://127.0.0.1:5000/averages/${props.apiurl_end}`
//         await axios.get(url) 
//         .then( res => {
//             let tempAveragesData = []
//             for (const dataObj of res.data.data) {
//                 tempAveragesData.push(parseFloat(dataObj.average_all)) 
//             }
//             setAveragesData(tempAveragesData)
//         })
//         .catch(err=> {
//             console.error(err)
//         })

//         await  axios.get(`http://127.0.0.1:5000/orgs/${props.org_nr}/${props.apiurl_end}`) 
//         .then( res=> {
//             let tempThisCompData = []
//             let tempYear = []
//             for (const dataObj of res.data.data) {
//                 tempThisCompData.push(parseFloat(dataObj.thiscomp))
//                 tempYear.push(parseInt(dataObj.year)) 
//             }
//             setYear(tempYear)
//             setThisCompData(tempThisCompData)
//         })
//         .catch( err=> {
//             console.error(err)
//         })

//         
//     }


//     useEffect(() => {
//         getData();
//     }, [])


//     useEffect(() => {
//         let tempdatasets = [
//             {   
//                 type: "bar",
//                 label: "This company", // replace w prop name?
//                 data: thisCompData,
//                 borderColor: "rgb(53, 162, 235)",
//                 backgroundColor: "#2B47EE",
//             },
//             {   
//                 type: "bar",
//                 label: "Industry Average", // replace w props name?
//                 data: averagesData,
//                 borderColor: "rgb(53, 162, 235)",
//                 backgroundColor: "#11CD89",
//             }
//         ]
//         if (props.apiurl_end=="licedata/"){
//             tempdatasets.push(
//                 {   
//                     type: "line",
//                     label: "Lice limit", // replace w props name?
//                     data: licelimit,
//                     borderColor: "rgb(53, 162, 235)",
//                     backgroundColor: "black",
//                 }
//             )
//         }
//         setChartData({
//             labels: year,
//             data: tempdatasets
            
//         })

//         setChartOptions({
//             responsive: true,
//             plugins: {
//                 legend: {
//                     position: "top"
//                 },
//                 title: {
//                     display: true,
//                     text: props.chart_title // prop
//                 }
//             }
//         })
//     }, [averagesData, thisCompData, year])


//     return (
//         <div className="miljograph"> 
//         <div>
//             <Bar options={chartOptions} data={chartData} />
//         </div>
//         </div>
//     )
// }
// export default MiljoGraph; 
