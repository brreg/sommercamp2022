
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search_bar.css";
import axios from "axios";


function SearchBar({ placeholder}) {

  const [searchResults, setSearchResults] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const fetchPost = () => {
    fetch('http://10.172.205.152:105/orgs/')
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setSearchResults(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = searchResults.filter((value) => {
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
  
  function fillName(org_nr) {
    //const fillSearch = target.value; 
    console.log(org_nr)
    setWordEntered(org_nr);
    navigate(`/${org_nr}/Miljo`);
  }

  useEffect(() => {
    fetchPost()
  }, []);
  

  return (
    <div className="search">
      <div className="searchInputs">
        <input className= "input"
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
              <a className="dataItem" key={key} onClick={() => fillName(value.org_nr)}>
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