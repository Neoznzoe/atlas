import { useState } from "react";
import Header from "./components/Header.jsx";
import CountryCard from "./components/CountryCard.jsx";
import countries from "./data/countries.js";

function App() {
  const [favoris, setFavoris] = useState([]);

  function basculerFavori(id) {
    setFavoris((actuels) =>
      actuels.includes(id) ? actuels.filter((favId) => favId !== id) : [...actuels, id]
    );
  }

  return (
    <>
      <Header nombreDePays={countries.length} nombreDeFavoris={favoris.length} />
      <div className="grid">
        {countries.map((country) => (
          <CountryCard
            key={country.id}
            id={country.id}
            name={country.name}
            capital={country.capital}
            population={country.population}
            region={country.region}
            flag={country.flag}
            estFavori={favoris.includes(country.id)}
            onToggleFavorite={basculerFavori}
          />
        ))}
      </div>
    </>
  );
}

export default App;
