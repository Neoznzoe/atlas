import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import CountryCard from "./components/CountryCard.jsx";
import AllerAuPays from "./components/AllerAuPays.jsx";

const CLE_CACHE = "atlas:pays";
const URL_API = "https://api.restcountries.com/countries/v5";
const CLE_API = import.meta.env.VITE_RESTCOUNTRIES_API_KEY;
const TAILLE_PAGE = 100;

function transformerPays(objet) {
  return {
    id: objet.codes.alpha_3 || objet.codes.alpha_2 || objet.uuid,
    name: objet.names.common,
    capital: objet.capitals[0]?.name ?? null,
    population: objet.population,
    region: objet.region,
    flag: objet.flag.url_png || objet.flag.url_svg || null,
    nombreDeLangues: objet.languages.length,
  };
}

async function recupererUnePage(offset) {
  const reponse = await fetch(`${URL_API}?limit=${TAILLE_PAGE}&offset=${offset}`, {
    headers: { Authorization: `Bearer ${CLE_API}` },
  });
  if (!reponse.ok) {
    throw new Error(`L'API a répondu avec le statut ${reponse.status}`);
  }
  return reponse.json();
}

async function chargerTousLesPays() {
  const premiere = await recupererUnePage(0);
  const total = premiere.data.meta.total;
  let objets = [...premiere.data.objects];

  let offset = TAILLE_PAGE;
  while (offset < total) {
    const page = await recupererUnePage(offset);
    objets = objets.concat(page.data.objects);
    offset += TAILLE_PAGE;
  }

  return objets.map(transformerPays);
}

function App() {
  const [pays, setPays] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  const [favoris, setFavoris] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [region, setRegion] = useState("toutes");

  useEffect(() => {
    async function charger() {
      try {
        const enCache = localStorage.getItem(CLE_CACHE);
        if (enCache) {
          setPays(JSON.parse(enCache));
          return;
        }
        const donnees = await chargerTousLesPays();
        setPays(donnees);
        localStorage.setItem(CLE_CACHE, JSON.stringify(donnees));
      } catch (err) {
        setErreur(err.message);
      } finally {
        setChargement(false);
      }
    }
    charger();
  }, []);

  function basculerFavori(id) {
    setFavoris((actuels) =>
      actuels.includes(id) ? actuels.filter((favId) => favId !== id) : [...actuels, id]
    );
  }

  function reinitialiser() {
    setRecherche("");
    setRegion("toutes");
  }

  function viderLeCache() {
    localStorage.removeItem(CLE_CACHE);
    window.location.reload();
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
        <button type="button" onClick={viderLeCache}>
          Vider le cache
        </button>
      </div>

      <AllerAuPays pays={pays} />

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
