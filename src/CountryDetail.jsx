import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCountry } from "../api";

export default function CountryDetail() {
  const [country, setCountry] = useState({});

  const params = useParams();
  console.log(params);

  const countryCode = params.id;
  console.log(countryCode);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const countryData = await getCountry(countryCode);
        setCountry(countryData); // Update state with fetched data
      } catch (error) {
        // Handle errors if needed
        console.error("Error fetching country:", error);
      }
    };

    fetchCountry();
  }, [countryCode]);

  let nativeNames = "";
  let currencyNames = "";
  let languageNames = "";
  let borderButtons = [];

  if (Array.isArray(country) && country.length > 0) {
    // Get the list of Native Names
    const nativeNameObjects = Object.values(country[0].name.nativeName);
    nativeNames = nativeNameObjects
      .map((nameObject) => nameObject.common)
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
      .join(", ");

    // Get the list of currencies
    const currencies = Object.values(country[0].currencies);
    currencyNames = currencies.map((currency) => currency.name).join(", ");

    // Get the list of languages
    const languages = Object.values(country[0].languages);
    languageNames = languages.join(", ");
  }

  return (
    <div id={"country-detail-page"}>
      <h1>Country Detail page</h1>
      {Array.isArray(country) && country.length > 0 ? (
        <div>
          <h2>{country[0].name.common}</h2>
          <p>
            <span>Native Name: </span>
            {nativeNames}
          </p>
          <p>
            <span>Population: </span>
            {country[0].population.toLocaleString()}
          </p>
          <p>
            <span>Region: </span>
            {country[0].region}
          </p>
          <p>
            <span>Sub Region: </span>
            {country[0].subregion}
          </p>
          <p>
            <span>Capital: </span>
            {country[0].capital}
          </p>
          <p>
            <span>Currencies: </span>
            {currencyNames}
          </p>
          <p>
            <span>Languages: </span>
            {languageNames}
          </p>
          <p>
            <span>Border Countries: </span>
            {borderButtons}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
