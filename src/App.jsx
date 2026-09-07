import { useCallback, useEffect, useReducer, useState } from "react";
import Header from "./components/Header.jsx";
import Filtres from "./components/Filtres.jsx";
import Grille from "./components/Grille.jsx";
import AllerAuPays from "./components/AllerAuPays.jsx";
import BoutonHautDePage from "./components/BoutonHautDePage.jsx";
import NavPrincipale from "./components/NavPrincipale.jsx";
import Quiz from "./components/Quiz.jsx";
import { useCountries } from "./hooks/useCountries.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { listeReducer, etatInitial } from "./reducers/listeReducer.js";
import { trierPays } from "./utils/trierPays.js";

const TAILLE_PAGE = 24;

function App() {
  const { pays, chargement, erreur, viderLeCache } = useCountries();
  const [favoris, setFavoris] = useLocalStorage("atlas:favoris", []);
  const [etatListe, dispatch] = useReducer(listeReducer, etatInitial);
  const [nombreAffiches, setNombreAffiches] = useState(TAILLE_PAGE);
  const [vue, setVue] = useState("explorateur");

  useEffect(() => {
    setNombreAffiches(TAILLE_PAGE);
  }, [etatListe.recherche, etatListe.region, etatListe.afficherFavorisSeulement]);

  const chargerPlus = useCallback(() => {
    setNombreAffiches((n) => n + TAILLE_PAGE);
  }, []);

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

  if (vue === "quiz") {
    return <Quiz pays={pays} onQuitter={() => setVue("explorateur")} />;
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

      <NavPrincipale onOuvrirQuiz={() => setVue("quiz")} />

      <Filtres
        etat={etatListe}
        dispatch={dispatch}
        regions={regions}
        onViderFavoris={viderTousLesFavoris}
        onViderCache={viderLeCache}
      />

      <AllerAuPays pays={pays} />

      <Grille
        pays={paysAffiches}
        nombreAffiches={nombreAffiches}
        onChargerPlus={chargerPlus}
        favoris={favoris}
        onToggleFavorite={basculerFavori}
      />

      <BoutonHautDePage />
    </>
  );
}

export default App;
