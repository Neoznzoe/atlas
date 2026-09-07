import {
  ArrowClockwise,
  ArrowDown,
  ArrowUp,
  MagnifyingGlass,
  Trash,
  X,
} from "@phosphor-icons/react";
import ToggleSwitch from "./ToggleSwitch.jsx";

const CRITERES = [
  { valeur: "nom", label: "Nom" },
  { valeur: "population", label: "Population" },
  { valeur: "superficie", label: "Superficie" },
];

function Filtres({ etat, dispatch, regions, onViderFavoris, onViderCache }) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 pt-6 sm:px-6">
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative min-w-[15rem] flex-1">
          <MagnifyingGlass size={17} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-fg-subtle" />
          <input
            type="text"
            value={etat.recherche}
            onChange={(e) => dispatch({ type: "RECHERCHER", payload: e.target.value })}
            placeholder="Rechercher un pays…"
            aria-label="Rechercher un pays"
            className="w-full rounded-xl border border-border bg-surface py-2.5 pr-9 pl-10 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none"
          />
          {etat.recherche && (
            <button
              type="button"
              onClick={() => dispatch({ type: "RECHERCHER", payload: "" })}
              aria-label="Effacer la recherche"
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-1 text-fg-subtle hover:bg-surface-hover hover:text-fg"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <select
          value={etat.region}
          onChange={(e) => dispatch({ type: "FILTRER_REGION", payload: e.target.value })}
          aria-label="Filtrer par région"
          className="rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-fg focus:border-accent focus:outline-none"
        >
          <option value="toutes">Toutes les régions</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <ToggleSwitch
          checked={etat.afficherFavorisSeulement}
          onChange={() => dispatch({ type: "BASCULER_FAVORIS_SEULEMENT" })}
          label="Favoris"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 rounded-xl border border-border bg-surface p-1">
          {CRITERES.map((critere) => {
            const actif = etat.tri === critere.valeur;
            return (
              <button
                key={critere.valeur}
                type="button"
                onClick={() => dispatch({ type: "TRIER", payload: critere.valeur })}
                aria-pressed={actif}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  actif ? "bg-accent text-accent-fg" : "text-fg-muted hover:bg-surface-hover"
                }`}
              >
                {critere.label}
                {actif && (etat.ordre === "croissant" ? <ArrowUp size={12} weight="bold" /> : <ArrowDown size={12} weight="bold" />)}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 text-xs font-medium text-fg-subtle">
          <button type="button" onClick={() => dispatch({ type: "REINITIALISER" })} className="flex items-center gap-1 hover:text-fg">
            <ArrowClockwise size={13} /> Réinitialiser
          </button>
          <button type="button" onClick={onViderFavoris} className="flex items-center gap-1 hover:text-fg">
            <Trash size={13} /> Vider les favoris
          </button>
          <button type="button" onClick={onViderCache} className="hidden items-center gap-1 hover:text-fg sm:flex">
            <ArrowClockwise size={13} /> Vider le cache
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filtres;
