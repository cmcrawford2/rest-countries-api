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
      <select id="filter-select" onChange={handleSelectChange}>
        <option className="filter-option" value="">
          Filter by Region
        </option>
        {uniqueRegions.map((region, index) => (
          <option key={index} className="filter-option" value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
