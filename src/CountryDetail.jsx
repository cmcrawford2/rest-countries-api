/* eslint-disable react-hooks/rules-of-hooks */
import { useParams, useNavigate } from "react-router-dom";
import { useCountries } from "./CountriesContext";

export default function CountryDetail() {
  const { countries } = useCountries();
  if (countries.length === 0) {
    // We haven't loaded the countries yet.
    return;
  }

  const params = useParams();
  const navigate = useNavigate();
  const countryCode = params.id;

  const currentCountry = countries.find(
    (thisCountry) => thisCountry.cca3 === countryCode
  );
  console.log("Current Country = ", currentCountry);

  // Get the list of Native Names
  let nativeNames = "";
  if (currentCountry.name.nativeName) {
    const nativeNameObjects = Object.values(currentCountry.name.nativeName);
    nativeNames = nativeNameObjects
      .map((nameObject) => nameObject.common)
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
      .join(", ");
  } else {
    nativeNames = "None";
  }

  // Get the list of currencies
  let currencyNames = "";
  if (currentCountry.currencies) {
    const currencies = Object.values(currentCountry.currencies);
    currencyNames = currencies.map((currency) => currency.name).join(", ");
  } else {
    currencyNames = "None";
  }

  // Get the list of languages
  let languageNames = "";
  if (currentCountry.languages) {
    const languages = Object.values(currentCountry.languages);
    languageNames = languages.join(", ");
  } else {
    languageNames = "None";
  }

  // Get the first capital in the list
  let capital = "";
  if (currentCountry.capital) {
    capital = currentCountry.capital[0];
  } else {
    capital = "None";
  }

  // Set up buttons for bordering countries
  let borderButtons = [];
  if (currentCountry.borders && currentCountry.borders.length > 0) {
    borderButtons = currentCountry.borders.map((border, index) => {
      console.log(border);
      const borderCountry = countries.find(
        (country) => country.cca3 === border
      );
      return (
        <button
          id="border-button"
          key={index}
          onClick={() => navigate(`/${border}`)}
        >
          {borderCountry.name.common}
        </button>
      );
    });
  }

  return (
    <>
      <div id="country-detail-button-area">
        <button id="country-detail-back">
          <i className="fas fa-arrow-left"></i>&nbsp;&nbsp;&nbsp;Back
        </button>
      </div>
      <div id={"country-detail-page"}>
        <div id="country-detail-img-wrapper">
          <img src={currentCountry.flags.png} />
        </div>
        <div id="country-detail-info">
          <h2>{currentCountry.name.common}</h2>
          <div id="country-detail-info-wrapper">
            <div className="country-detail-column">
              <p>
                <span>Native Name: </span>
                {nativeNames}
              </p>
              <p>
                <span>Population: </span>
                {currentCountry.population.toLocaleString()}
              </p>
              <p>
                <span>Region: </span>
                {currentCountry.region}
              </p>
              <p>
                <span>Sub Region: </span>
                {currentCountry.subregion ? currentCountry.subregion : "None"}
              </p>
              <p>
                <span>Capital: </span>
                {capital}
              </p>
            </div>
            <div className="country-detail-column">
              <p>
                <span>Currencies: </span>
                {currencyNames}
              </p>
              <p>
                <span>Languages: </span>
                {languageNames}
              </p>
            </div>
          </div>
          <div id="country-detail-borders">
            <span>Border Countries: </span>
            {borderButtons.length > 0 ? borderButtons : "None"}
          </div>
        </div>
      </div>
    </>
  );
}
