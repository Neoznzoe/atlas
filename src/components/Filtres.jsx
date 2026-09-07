const CRITERES = [
  { valeur: "nom", label: "Nom" },
  { valeur: "population", label: "Population" },
  { valeur: "superficie", label: "Superficie" },
];

function Filtres({ etat, dispatch, regions, onViderFavoris, onViderCache }) {
  return (
    <div className="filtres">
      <input
        type="text"
        value={etat.recherche}
        onChange={(e) => dispatch({ type: "RECHERCHER", payload: e.target.value })}
        placeholder="Rechercher un pays…"
        aria-label="Rechercher un pays"
      />
      <select
        value={etat.region}
        onChange={(e) => dispatch({ type: "FILTRER_REGION", payload: e.target.value })}
        aria-label="Filtrer par région"
      >
        <option value="toutes">Toutes les régions</option>
        {regions.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <div className="filtres__tri">
        {CRITERES.map((critere) => (
          <button
            key={critere.valeur}
            type="button"
            onClick={() => dispatch({ type: "TRIER", payload: critere.valeur })}
            aria-pressed={etat.tri === critere.valeur}
          >
            {critere.label} {etat.tri === critere.valeur ? (etat.ordre === "croissant" ? "↑" : "↓") : ""}
          </button>
        ))}
      </div>

      <label>
        <input
          type="checkbox"
          checked={etat.afficherFavorisSeulement}
          onChange={() => dispatch({ type: "BASCULER_FAVORIS_SEULEMENT" })}
        />
        Favoris uniquement
      </label>

      <button type="button" onClick={() => dispatch({ type: "REINITIALISER" })}>
        Réinitialiser
      </button>
      <button type="button" onClick={onViderFavoris}>
        Tout vider (favoris)
      </button>
      <button type="button" onClick={onViderCache}>
        Vider le cache
      </button>
    </div>
  );
}

export default Filtres;
