
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search_bar.css";

function SearchBar({ placeholder, data }) {

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.org_name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  function performSearch() {
    console.log(wordEntered);
  }  
  
  const navigate = useNavigate();
  
  function fillName(event) {
    const fillSearch = event.target.textContent; 
    console.log(fillSearch)
    setWordEntered(fillSearch);
    navigate(fillSearch);
  }
  

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length !== 0 ? (
            <button id="searchBtn"onClick={performSearch}> ? </button>
          ) : (
            <button id="exitBtn" onClick={clearInput}> x </button>
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" onClick={fillName}>
                <p> {value.org_name} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;