/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCountries } from "./CountriesContext";
import { getCountries } from "../api.js";

export default function Countries({ filter }) {
  const { countries, setCountries } = useCountries();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCountries();
        setCountries(data); // Update state with fetched data
      } catch (error) {
        // Handle errors if needed
        console.error("Error fetching countries:", error);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, []);

  const countryDivs = countries
    .filter((country) => {
      if (filter === "" || filter === "All") return country;
      else return country.region === filter;
    })
    .map((country) => {
      let capital = "None";
      if (country.capital) {
        capital = country.capital[0];
      }

      return (
        <div id="country" key={country.cca3}>
          <Link to={`/${country.cca3}`}>
            <img src={country.flags.png} />
          </Link>
          <h2>{country.name.common}</h2>

          <p>
            <span>Population: </span>
            {country.population.toLocaleString()}
          </p>
          <p>
            <span>Region: </span>
            {country.region}
          </p>
          <p>
            <span>Capital: </span>
            {capital}
          </p>
        </div>
      );
    });

  return <div id="countries-wrapper">{countryDivs}</div>;
}
