function CountryCard({ name, capital, population, region }) {
  return (
    <article className="card">
      <h2>{name}</h2>
      <p>Capitale : {capital}</p>
      <p>Population : {population.toLocaleString("fr-FR")}</p>
      <p>Région : {region}</p>
    </article>
  );
}

export default CountryCard;
