function Filtres({ recherche, onRechercheChange, region, onRegionChange, regions, onReset, onViderCache }) {
  return (
    <div className="filtres">
      <input
        type="text"
        value={recherche}
        onChange={(e) => onRechercheChange(e.target.value)}
        placeholder="Rechercher un pays…"
        aria-label="Rechercher un pays"
      />
      <select value={region} onChange={(e) => onRegionChange(e.target.value)} aria-label="Filtrer par région">
        <option value="toutes">Toutes les régions</option>
        {regions.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <button type="button" onClick={onReset}>
        Réinitialiser
      </button>
      <button type="button" onClick={onViderCache}>
        Vider le cache
      </button>
    </div>
  );
}

export default Filtres;
