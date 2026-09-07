import { memo } from "react";
import Card from "./Card.jsx";

function CountryCard({
  id,
  name,
  capital,
  population,
  superficie,
  region,
  flag,
  nombreDeLangues,
  estFavori,
  onToggleFavorite,
  onOpenDetail,
}) {
  const drapeau = flag ? (
    <img src={flag} alt={`Drapeau : ${name}`} className="card__flag" />
  ) : (
    <div className="card__flag card__flag--absent" role="img" aria-label={`Drapeau indisponible pour ${name}`} />
  );

  if (!capital) {
    return (
      <Card>
        {drapeau}
        <h2>{name}</h2>
        <p>Données incomplètes</p>
      </Card>
    );
  }

  function gererClicEtoile(e) {
    e.stopPropagation();
    onToggleFavorite(id);
  }

  return (
    <Card favori={estFavori} className="card--cliquable" onClick={() => onOpenDetail(id)}>
      {drapeau}
      <button
        type="button"
        className="card__favorite-toggle"
        onClick={gererClicEtoile}
        aria-label={estFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        {estFavori ? "★" : "☆"}
      </button>
      <h2>{name}</h2>
      <p>Capitale : {capital}</p>
      <p>Population : {population.toLocaleString("fr-FR")}</p>
      {superficie != null && <p>Superficie : {superficie.toLocaleString("fr-FR")} km²</p>}
      <p>Région : {region}</p>
      <p className="card__badge">{population > 50000000 ? "Grand pays" : "Petit pays"}</p>
      {nombreDeLangues > 0 && (
        <p>
          {nombreDeLangues} langue{nombreDeLangues > 1 ? "s" : ""}
        </p>
      )}
      {estFavori && <p className="card__favorite-note">Dans vos favoris</p>}
    </Card>
  );
}

export default memo(CountryCard);
