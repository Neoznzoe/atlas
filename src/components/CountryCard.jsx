function CountryCard({
  id,
  name,
  capital,
  population,
  region,
  flag,
  nombreDeLangues,
  estFavori,
  onToggleFavorite,
}) {
  if (!capital) {
    return (
      <article className="card">
        <img src={flag} alt={`Drapeau : ${name}`} className="card__flag" />
        <h2>{name}</h2>
        <p>Données incomplètes</p>
      </article>
    );
  }

  const classes = `card ${estFavori ? "card--favorite" : ""}`;

  return (
    <article className={classes}>
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
      <p className="card__badge">{population > 50000000 ? "Grand pays" : "Petit pays"}</p>
      {nombreDeLangues > 0 && (
        <p>
          {nombreDeLangues} langue{nombreDeLangues > 1 ? "s" : ""}
        </p>
      )}
      {estFavori && <p className="card__favorite-note">Dans vos favoris</p>}
    </article>
  );
}

export default CountryCard;
