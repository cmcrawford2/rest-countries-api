/* eslint-disable react/prop-types */
import { useCountries } from "./CountriesContext";

export default function Filter({ onFilterChange }) {
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    // This call will set the selected filter at the parent level
    onFilterChange(selectedValue);
  };

  const { countries } = useCountries();
  // Get an array of unique regions.
  const uniqueRegions = Array.from(
    new Set(countries.map((country) => country.region))
  );

  return (
    <div id="filter">
      <label htmlFor="filterSelect">Filter:</label>
      <select id="filterSelect" onChange={handleSelectChange}>
        <option value="">Select a filter</option>
        {uniqueRegions.map((region, index) => (
          <option key={index} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
