function CountryCard({ id, name, capital, population, region, flag, estFavori, onToggleFavorite }) {
  return (
    <article className="card">
      <img src={flag} alt={`Drapeau : ${name}`} className="card__flag" />
      <button
        type="button"
        className="card__favorite-toggle"
        onClick={() => onToggleFavorite(id)}
        aria-label={estFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        {estFavori ? "★" : "☆"}
      </button>
      <h2>{name}</h2>
      <p>Capitale : {capital}</p>
      <p>Population : {population.toLocaleString("fr-FR")}</p>
      <p>Région : {region}</p>
    </article>
  );
}

export default CountryCard;
