import CountryCard from "./CountryCard.jsx";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.js";

function Grille({ pays, nombreAffiches, onChargerPlus, favoris, onToggleFavorite }) {
  const sentinelle = useInfiniteScroll(onChargerPlus);

  if (pays.length === 0) {
    return <p className="grid-vide">Aucun pays ne correspond à ta recherche.</p>;
  }

  const paysAffiches = pays.slice(0, nombreAffiches);

  return (
    <>
      <div className="grid">
        {paysAffiches.map((country) => (
          <CountryCard
            key={country.id}
            id={country.id}
            name={country.name}
            capital={country.capital}
            population={country.population}
            superficie={country.superficie}
            region={country.region}
            flag={country.flag}
            nombreDeLangues={country.nombreDeLangues}
            estFavori={favoris.includes(country.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
      {paysAffiches.length < pays.length && <div ref={sentinelle} className="sentinelle" />}
    </>
  );
}

export default Grille;
