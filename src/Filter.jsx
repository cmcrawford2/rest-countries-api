/* eslint-disable react/prop-types */
import { useState } from "react";
import { useCountries } from "./CountriesContext";

export default function Filter({ onFilterChange }) {
  const { countries } = useCountries();
  const [chevron, setChevron] = useState("down");

  function handleToggleFilter() {
    if (chevron === "down") {
      setChevron("up");
      // Unhide the filter options
    } else {
      setChevron("down");
      // Hide the filter options
    }
  }

  const uniqueRegions = [
    "All",
    ...Array.from(new Set(countries.map((country) => country.region))),
  ];

  const handleSelectChange = (region) => {
    const selectedValue = region;
    onFilterChange(selectedValue);
    setChevron("down");
  };

  return (
    <div id="filter">
      <div id="filter-select" onClick={handleToggleFilter}>
        {chevron === "down" ? (
          <>
            <p>Filter by Region</p>
            <i className="fas fa-chevron-down"></i>
          </>
        ) : (
          <>
            <p>Filter by Region</p>
            <i className="fas fa-chevron-up"></i>
          </>
        )}
      </div>
      {chevron === "up" && (
        <div id="filter-options">
          {uniqueRegions.map((region, index) => (
            <div
              key={index}
              className="filter-option"
              value={region}
              onClick={() => handleSelectChange(region)}
            >
              {region}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
