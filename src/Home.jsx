import { useState } from "react";
import Search from "./Search";
import Filter from "./Filter";
import Countries from "./Countries";

export default function Home() {
  const [filter, setFilter] = useState("");

  function handleFilterChange(newFilter) {
    setFilter(newFilter);
  }

  return (
    <main>
      <div id="search-filter-wrapper">
        <Search />
        <Filter onFilterChange={handleFilterChange} />
      </div>
      <Countries filter={filter} />
    </main>
  );
}
