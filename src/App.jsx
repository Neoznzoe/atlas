import Header from "./components/Header.jsx";
import CountryCard from "./components/CountryCard.jsx";
import countries from "./data/countries.js";

function App() {
  return (
    <>
      <Header />
      <div className="grid">
        {countries.map((country) => (
          <CountryCard
            key={country.id}
            name={country.name}
            capital={country.capital}
            population={country.population}
            region={country.region}
            flag={country.flag}
          />
        ))}
      </div>
    </>
  );
}

export default App;
