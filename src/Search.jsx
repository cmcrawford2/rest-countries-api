import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCountries } from "./CountriesContext";
import Fuse from "fuse.js";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { countries } = useCountries();

  function findCountry(searchTerm) {
    if (countries.length === 0)
      // Countries haven't loaded yet
      return;

    // Set up Fuse options
    const options = {
      keys: ["name.common"], // Specify the property to search
      threshold: 0.2, // Adjust the threshold as needed
    };

    // Create a new Fuse instance with the dataset and options
    const fuse = new Fuse(countries, options);

    // Perform fuzzy search
    const searchResults = fuse.search(searchTerm);

    if (searchResults.length === 0) return;

    navigate(`/${searchResults[0].item.cca3}`);
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      findCountry(searchTerm);
    }
  }

  return (
    <div className="search-container">
      <span
        className="fa fa-search search-icon"
        onClick={() => findCountry(searchTerm)}
      ></span>
      <input
        type="text"
        className="search-input"
        placeholder="Search for a country..."
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
