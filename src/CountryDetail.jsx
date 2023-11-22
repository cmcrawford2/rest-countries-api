import { useState, useEffect } from "react";
import { getCountries } from "../api";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCountries } from "./CountriesContext";

export default function CountryDetail() {
  const { countries, setCountries } = useCountries();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if countries are already loaded to avoid unnecessary re-fetching
    if (countries.length === 0) {
      const fetchData = async () => {
        try {
          const data = await getCountries();
          setCountries(data); // Update state with fetched data
        } catch (error) {
          // Handle errors if needed
          console.error("Error fetching countries:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData(); // Fetch countries if not loaded
    } else {
      setLoading(false);
    }
  }, [countries, setCountries]);

  const params = useParams();
  const navigate = useNavigate();
  const countryCode = params.id;

  if (loading) {
    return <div>Loading...</div>; // Render loading state while fetching countries
  }

  const currentCountry = countries.find(
    (thisCountry) => thisCountry.cca3 === countryCode
  );

  // Get the list of Native Names
  let nativeNames = "None";
  if (currentCountry.name.nativeName) {
    const nativeNameObjects = Object.values(currentCountry.name.nativeName);
    nativeNames = nativeNameObjects
      .map((nameObject) => nameObject.common)
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
      .join(", ");
  }

  // Get the list of currencies
  let currencyNames = "None";
  if (currentCountry.currencies) {
    const currencies = Object.values(currentCountry.currencies);
    currencyNames = currencies.map((currency) => currency.name).join(", ");
  }

  // Get the list of languages
  let languageNames = "None";
  if (currentCountry.languages) {
    const languages = Object.values(currentCountry.languages);
    languageNames = languages.join(", ");
  }

  // Get the first capital in the list
  let capital = "None";
  if (currentCountry.capital) {
    capital = currentCountry.capital[0];
  }

  // Set up buttons for bordering countries
  let borderButtons = [];
  if (currentCountry.borders && currentCountry.borders.length > 0) {
    borderButtons = currentCountry.borders.map((border, index) => {
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
        <Link to="/">
          <button id="country-detail-back">
            <i className="fas fa-arrow-left"></i>&nbsp;&nbsp;&nbsp;Back
          </button>
        </Link>
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
