function DetailPays({ pays }) {
  return (
    <>
      {pays.flag && <img src={pays.flag} alt={`Drapeau : ${pays.name}`} className="detail-pays__flag" />}
      <h2>{pays.name}</h2>
      <p>Capitale : {pays.capital ?? "inconnue"}</p>
      <p>Population : {pays.population.toLocaleString("fr-FR")}</p>
      {pays.superficie != null && <p>Superficie : {pays.superficie.toLocaleString("fr-FR")} km²</p>}
      <p>Région : {pays.region}</p>
      {pays.nombreDeLangues > 0 && (
        <p>
          {pays.nombreDeLangues} langue{pays.nombreDeLangues > 1 ? "s" : ""}
        </p>
      )}
    </>
  );
}

export default DetailPays;
