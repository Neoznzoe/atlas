import { Globe, MapPin, Ruler, Translate, UsersThree } from "@phosphor-icons/react";
import Badge from "./Badge.jsx";

function Ligne({ icon, label, valeur }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-3 text-sm last:border-b-0">
      <span className="flex items-center gap-2 text-fg-subtle">
        {icon}
        {label}
      </span>
      <span className="font-medium text-fg">{valeur}</span>
    </div>
  );
}

function DetailPays({ pays }) {
  return (
    <>
      {pays.flag ? (
        <img src={pays.flag} alt={`Drapeau : ${pays.name}`} className="aspect-16/9 w-full object-cover" />
      ) : (
        <div className="flex aspect-16/9 w-full items-center justify-center bg-surface-hover text-fg-subtle">
          <Globe size={32} />
        </div>
      )}

      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="pr-8 text-xl leading-tight font-semibold text-fg">{pays.name}</h2>
          <Badge grand={pays.population > 50000000} />
        </div>

        <div>
          <Ligne icon={<MapPin size={15} />} label="Capitale" valeur={pays.capital ?? "inconnue"} />
          <Ligne icon={<UsersThree size={15} />} label="Population" valeur={pays.population.toLocaleString("fr-FR")} />
          {pays.superficie != null && (
            <Ligne icon={<Ruler size={15} />} label="Superficie" valeur={`${pays.superficie.toLocaleString("fr-FR")} km²`} />
          )}
          <Ligne icon={<Globe size={15} />} label="Région" valeur={pays.region} />
          {pays.nombreDeLangues > 0 && (
            <Ligne
              icon={<Translate size={15} />}
              label="Langues"
              valeur={`${pays.nombreDeLangues} officielle${pays.nombreDeLangues > 1 ? "s" : ""}`}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default DetailPays;
