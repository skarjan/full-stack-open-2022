import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Components/Search.js"


function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const newCountries = response.data;
      setCountries(newCountries);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSearchResults(
      countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <Search
      filterValue={filter}
      filterEventHandler={handleFilterChange}
      results={searchResults}
    />
  );
}

export default App;
