import Countries from "./Countries";

export default function Home() {
  return (
    <main>
      <div id="search-filter-wrapper">
        <input
          type="text"
          id="search-input"
          placeholder="Search for a country..."
        />
      </div>
      <Countries />
    </main>
  );
}
