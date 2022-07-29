import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ text, value, eventHandler }) => {
  return (
    <>
      <input value={value} onChange={eventHandler} />
    </>
  );
};

const Name = ({ country }) => {
  return <h2> {country.name.common} </h2>;
};

const Capital = ({ country }) => {
  return <>{country.capital[0]}</>;
};

const Area = ({ country }) => {
  return <div> area {country.area} </div>;
};

const Language = ({ country }) => {
  return (
    <>
      <h4> Languages: </h4>
      <ul>
        {Object.keys(country.languages).map((lang) => (
          <li key={lang}> {country.languages[lang]} </li>
        ))}
      </ul>
    </>
  );
};

const Flag = ({ country }) => {
  return (
    <img
      src={country.flags.png}
      alt={"here ought to be the countries flag"}
      width={"200px"}
    />
  );
};

const Temperature = ({ temperature }) => {
  return <div>temperature {temperature} celsius </div>;
};

const Icon = ({ url }) => {
  return <img src={url} alt={"an icon representing the weather"} />;
};

const Wind = ({ speed }) => {
  return <div>wind {speed} m/s</div>;
};

const Country = ({ result }) => {
  const [weatherIconUrl, setWeatherIconUrl] = useState("");
  const [windSpeed, setWindspeed] = useState(0);
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    const lat = result.capitalInfo.latlng[0];
    const lon = result.capitalInfo.latlng[1];
    const APIkey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
    axios.get(apiUrl).then((response) => {
      setWindspeed(response.data.wind.speed);
      setTemp(response.data.main.temp);

      const weatherIconCode = response.data.weather[0].icon;
      const newWeatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
      setWeatherIconUrl(newWeatherIconUrl);
    });
  }, [result]);

  return (
    <>
      <Name country={result} />
      capital <Capital country={result} />
      <Area country={result} />
      <Language country={result} />
      <Flag country={result} />
      <h2>
        Weather in <Capital country={result} />
      </h2>
      <Temperature temperature={temp} />
      <Icon url={weatherIconUrl} />
      <Wind speed={windSpeed} />
    </>
  );
};

const Show = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowClick = () => {
    setShowDetails(!showDetails);
  };

  if (!showDetails) {
    return (
      <>
        <button onClick={handleShowClick}>show</button>
      </>
    );
  } else if (showDetails) {
    return (
      <>
        <button onClick={handleShowClick}>hide</button>
        <Country result={country} />
      </>
    );
  }
};

const Countries = ({ result }) => {
  return (
    <>
      {result.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <Show country={country} />
        </div>
      ))}
    </>
  );
};

const Results = ({ searchResults }) => {
  if (searchResults.length > 1 && searchResults.length < 11) {
    return <Countries result={searchResults} />;
  } else if (searchResults.length === 1) {
    return <Country result={searchResults[0]} />;
  } else if (searchResults.length > 10) {
    return (
      <>
        <div> Too many matches, specify another filter </div>
      </>
    );
  } else {
    return (
      <>
        <div>No matches, specify another filter</div>
      </>
    );
  }
};

const Search = ({ filterValue, filterEventHandler, results }) => {
  return (
    <div>
      find countries
      <Filter value={filterValue} eventHandler={filterEventHandler} />
      <Results searchResults={results} />
    </div>
  );
};

export default Search;
