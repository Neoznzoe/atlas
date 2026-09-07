function CountryCard({ name, capital, population, region, flag }) {
  return (
    <article className="card">
      <img src={flag} alt={`Drapeau : ${name}`} className="card__flag" />
      <h2>{name}</h2>
      <p>Capitale : {capital}</p>
      <p>Population : {population.toLocaleString("fr-FR")}</p>
      <p>Région : {region}</p>
    </article>
  );
}

export default CountryCard;
