import Search from "./Search";
import Filter from "./Filter";
import Countries from "./Countries";

export default function Home() {
  return (
    <main>
      <div id="search-filter-wrapper">
        <Search />
        <Filter />
      </div>
      <Countries />
    </main>
  );
}
