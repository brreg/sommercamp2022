//Sample solution based on this tutorial: https://www.geeksforgeeks.org/how-to-connect-reactjs-with-flask-api/

// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";
  
function App() {
    // usestate for setting a javascript
    // object for storing and using data
    const [data, setdata] = useState({
        locnr: 0,
        lice: "",
        lice_nr: 0,
        lice_week: 0,
        lice_year: 0,
    });
  
    useEffect(() => {
        //In package.json add "proxy":"http://localhost:5000/" over "dependencies"
        fetch("/location/45017/licedata/").then((res) =>
            res.json().then((data) => {
                setdata({
                    locnr: data.loc_nr,
                    lice: data.lice.toString(),
                    lice_nr: data.lice_nr,
                    lice_week: data.lice_week,
                    lice_year: data.lice_year,
                });
            })
        );
    }, []);
  
    return (
        <div className="App">
            <header className="App-header">
                <h1>React and flask</h1>
                <p>{data.locnr}</p>
                <p>{data.lice}</p>
                <p>{data.lice_nr}</p>
                <p>{data.lice_week}</p>
                <p>{data.lice_year}</p>
  
            </header>
        </div>
    );
}
  
export default App;