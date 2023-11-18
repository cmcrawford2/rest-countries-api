import { useEffect, useState } from "react";
import { getCountries } from "../api.js";

export default function Countries() {
  const [countries, setCountries] = useState([]);

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
  }, []); // Empty dependency array to run once on mount

  console.log(countries);

  // Use the 'countries' state in the JSX once it's fetched
  const countryDivs = countries.map((country, index) => (
    <div id="country" key={index}>
      <img src={country.flags.png} />
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
        {country.capital}
      </p>
    </div>
  ));

  return <div id="countries-wrapper">{countryDivs}</div>;
}
