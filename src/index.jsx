import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import CountryDetail from "./CountryDetail";
import { CountriesProvider } from "./CountriesContext";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <CountriesProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<CountryDetail />} />
        </Routes>
      </CountriesProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
