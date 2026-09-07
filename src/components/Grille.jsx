import CountryCard from "./CountryCard.jsx";

function Grille({ pays, favoris, onToggleFavorite }) {
  if (pays.length === 0) {
    return <p className="grid-vide">Aucun pays ne correspond à ta recherche.</p>;
  }

  return (
    <div className="grid">
      {pays.map((country) => (
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
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default Grille;
