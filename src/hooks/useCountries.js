import { useEffect, useState } from "react";

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

export function useCountries() {
  const [pays, setPays] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

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

  function viderLeCache() {
    localStorage.removeItem(CLE_CACHE);
    window.location.reload();
  }

  return { pays, chargement, erreur, viderLeCache };
}
