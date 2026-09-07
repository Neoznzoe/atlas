import { useState } from "react";
import Header from "./components/Header.jsx";
import Filtres from "./components/Filtres.jsx";
import Grille from "./components/Grille.jsx";
import AllerAuPays from "./components/AllerAuPays.jsx";
import { useCountries } from "./hooks/useCountries.js";

function App() {
  const { pays, chargement, erreur, viderLeCache } = useCountries();

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

  if (chargement) {
    return <p className="etat">Chargement…</p>;
  }

  if (erreur) {
    return <p className="etat etat--erreur">Une erreur est survenue : {erreur}</p>;
  }

  const regions = [...new Set(pays.map((country) => country.region))].sort();

  const paysFiltres = pays.filter((country) => {
    const correspondNom = country.name.toLowerCase().includes(recherche.toLowerCase());
    const correspondRegion = region === "toutes" || country.region === region;
    return correspondNom && correspondRegion;
  });

  return (
    <>
      <Header nombreDePays={pays.length} nombreDeFavoris={favoris.length} />

      <Filtres
        recherche={recherche}
        onRechercheChange={setRecherche}
        region={region}
        onRegionChange={setRegion}
        regions={regions}
        onReset={reinitialiser}
        onViderCache={viderLeCache}
      />

      <AllerAuPays pays={pays} />

      <Grille pays={paysFiltres} favoris={favoris} onToggleFavorite={basculerFavori} />
    </>
  );
}

export default App;
