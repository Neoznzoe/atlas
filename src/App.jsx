import { useCallback, useEffect, useReducer, useState } from "react";
import TopBar from "./components/TopBar.jsx";
import Filtres from "./components/Filtres.jsx";
import Grille from "./components/Grille.jsx";
import AllerAuPays from "./components/AllerAuPays.jsx";
import BoutonHautDePage from "./components/BoutonHautDePage.jsx";
import Quiz from "./components/Quiz.jsx";
import EtatChargement from "./components/EtatChargement.jsx";
import EtatErreur from "./components/EtatErreur.jsx";
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

  // Stabilisée : passée telle quelle à CountryCard (mémoïsé), mesuré ~7,6x plus
  // rapide qu'une fonction recréée à chaque rendu sur la bascule d'un favori.
  const basculerFavori = useCallback((id) => {
    setFavoris((actuels) =>
      actuels.includes(id) ? actuels.filter((favId) => favId !== id) : [...actuels, id]
    );
  }, [setFavoris]);

  function viderTousLesFavoris() {
    setFavoris([]);
    dispatch({ type: "VIDER_FAVORIS" });
  }

  if (chargement) {
    return <EtatChargement />;
  }

  if (erreur) {
    return <EtatErreur message={erreur} />;
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
    <div className="min-h-dvh bg-bg">
      <TopBar nombreDePays={pays.length} nombreDeFavoris={favoris.length} onOuvrirQuiz={() => setVue("quiz")} />

      <div className="space-y-4 pb-16">
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
      </div>

      <BoutonHautDePage />
    </div>
  );
}

export default App;
