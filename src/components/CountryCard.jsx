import { memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Globe, MapPin, Star, UsersThree } from "@phosphor-icons/react";
import Card from "./Card.jsx";
import Badge from "./Badge.jsx";

function CountryCard({
  id,
  name,
  capital,
  population,
  superficie,
  region,
  flag,
  nombreDeLangues,
  estFavori,
  onToggleFavorite,
  onOpenDetail,
}) {
  const reduireMouvement = useReducedMotion();

  const drapeau = flag ? (
    <img
      src={flag}
      alt={`Drapeau : ${name}`}
      loading="lazy"
      className="aspect-16/10 w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  ) : (
    <div className="flex aspect-16/10 w-full items-center justify-center bg-surface-hover text-fg-subtle">
      <Globe size={28} />
    </div>
  );

  function gererClicEtoile(e) {
    e.stopPropagation();
    onToggleFavorite(id);
  }

  const boutonFavori = (
    <motion.button
      type="button"
      onClick={gererClicEtoile}
      whileTap={reduireMouvement ? undefined : { scale: 0.8 }}
      aria-label={estFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
      className="absolute top-2.5 right-2.5 flex size-8 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
    >
      <motion.span
        key={estFavori ? "plein" : "vide"}
        initial={reduireMouvement ? false : { scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
      >
        <Star size={16} weight={estFavori ? "fill" : "regular"} className={estFavori ? "text-gold" : ""} />
      </motion.span>
    </motion.button>
  );

  if (!capital) {
    return (
      <Card>
        <div className="relative">
          {drapeau}
          {boutonFavori}
        </div>
        <div className="flex flex-col gap-1.5 p-4">
          <h2 className="text-base font-semibold text-fg">{name}</h2>
          <p className="text-sm text-fg-subtle">Données incomplètes</p>
        </div>
      </Card>
    );
  }

  return (
    <Card favori={estFavori} cliquable onClick={() => onOpenDetail(id)}>
      <div className="relative">
        {drapeau}
        {boutonFavori}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-base leading-tight font-semibold text-fg">{name}</h2>
          <Badge grand={population > 50000000} />
        </div>

        <div className="flex flex-col gap-1 text-sm text-fg-muted">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-fg-subtle" />
            {capital} · {region}
          </span>
          <span className="flex items-center gap-1.5">
            <UsersThree size={14} className="text-fg-subtle" />
            {population.toLocaleString("fr-FR")}
            {superficie != null && ` · ${superficie.toLocaleString("fr-FR")} km²`}
          </span>
        </div>

        {nombreDeLangues > 0 && (
          <p className="mt-auto text-xs text-fg-subtle">
            {nombreDeLangues} langue{nombreDeLangues > 1 ? "s" : ""} officielle{nombreDeLangues > 1 ? "s" : ""}
          </p>
        )}
      </div>
    </Card>
  );
}

export default memo(CountryCard);
