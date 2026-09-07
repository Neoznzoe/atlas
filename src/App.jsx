import { useReducer } from "react";
import Header from "./components/Header.jsx";
import Filtres from "./components/Filtres.jsx";
import Grille from "./components/Grille.jsx";
import AllerAuPays from "./components/AllerAuPays.jsx";
import { useCountries } from "./hooks/useCountries.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { listeReducer, etatInitial } from "./reducers/listeReducer.js";

function trierPays(pays, tri, ordre) {
  const paysTries = [...pays].sort((a, b) => {
    if (tri === "population") return a.population - b.population;
    if (tri === "superficie") return (a.superficie ?? 0) - (b.superficie ?? 0);
    return a.name.localeCompare(b.name);
  });
  return ordre === "croissant" ? paysTries : paysTries.reverse();
}

function App() {
  const { pays, chargement, erreur, viderLeCache } = useCountries();
  const [favoris, setFavoris] = useLocalStorage("atlas:favoris", []);
  const [etatListe, dispatch] = useReducer(listeReducer, etatInitial);

  function basculerFavori(id) {
    setFavoris((actuels) =>
      actuels.includes(id) ? actuels.filter((favId) => favId !== id) : [...actuels, id]
    );
  }

  function viderTousLesFavoris() {
    setFavoris([]);
    dispatch({ type: "VIDER_FAVORIS" });
  }

  if (chargement) {
    return <p className="etat">Chargement…</p>;
  }

  if (erreur) {
    return <p className="etat etat--erreur">Une erreur est survenue : {erreur}</p>;
  }

  const regions = [...new Set(pays.map((country) => country.region))].sort();

  const paysFiltres = pays.filter((country) => {
    const correspondNom = country.name.toLowerCase().includes(etatListe.recherche.toLowerCase());
    const correspondRegion = etatListe.region === "toutes" || country.region === etatListe.region;
    const correspondFavoris = !etatListe.afficherFavorisSeulement || favoris.includes(country.id);
    return correspondNom && correspondRegion && correspondFavoris;
  });

  const paysAffiches = trierPays(paysFiltres, etatListe.tri, etatListe.ordre);

  return (
    <>
      <Header nombreDePays={pays.length} nombreDeFavoris={favoris.length} />

      <Filtres
        etat={etatListe}
        dispatch={dispatch}
        regions={regions}
        onViderFavoris={viderTousLesFavoris}
        onViderCache={viderLeCache}
      />

      <AllerAuPays pays={pays} />

      <Grille pays={paysAffiches} favoris={favoris} onToggleFavorite={basculerFavori} />
    </>
  );
}

export default App;
