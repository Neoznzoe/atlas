import { useState } from "react";
import Header from "./components/Header.jsx";
import CountryCard from "./components/CountryCard.jsx";
import AllerAuPays from "./components/AllerAuPays.jsx";
import countries from "./data/countries.js";

const regions = [...new Set(countries.map((country) => country.region))];

function App() {
  const [favoris, setFavoris] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [region, setRegion] = useState("toutes");

  function basculerFavori(id) {
    setFavoris((actuels) =>
      actuels.includes(id) ? actuels.filter((favId) => favId !== id) : [...actuels, id]
    );
  }

  function reinitialiser() {
    setRecherche("");
    setRegion("toutes");
  }

  const paysFiltres = countries.filter((country) => {
    const correspondNom = country.name.toLowerCase().includes(recherche.toLowerCase());
    const correspondRegion = region === "toutes" || country.region === region;
    return correspondNom && correspondRegion;
  });

  return (
    <>
      <Header nombreDePays={countries.length} nombreDeFavoris={favoris.length} />

      <div className="filtres">
        <input
          type="text"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Rechercher un pays…"
          aria-label="Rechercher un pays"
        />
        <select value={region} onChange={(e) => setRegion(e.target.value)} aria-label="Filtrer par région">
          <option value="toutes">Toutes les régions</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button type="button" onClick={reinitialiser}>
          Réinitialiser
        </button>
      </div>

      <AllerAuPays />

      {paysFiltres.length === 0 ? (
        <p className="grid-vide">Aucun pays ne correspond à ta recherche.</p>
      ) : (
        <div className="grid">
          {paysFiltres.map((country) => (
            <CountryCard
              key={country.id}
              id={country.id}
              name={country.name}
              capital={country.capital}
              population={country.population}
              region={country.region}
              flag={country.flag}
              nombreDeLangues={country.nombreDeLangues}
              estFavori={favoris.includes(country.id)}
              onToggleFavorite={basculerFavori}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
