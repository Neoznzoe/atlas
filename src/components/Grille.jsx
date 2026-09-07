import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import CountryCard from "./CountryCard.jsx";
import Modale from "./Modale.jsx";
import DetailPays from "./DetailPays.jsx";
import EtatVide from "./EtatVide.jsx";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.js";

function Grille({ pays, nombreAffiches, onChargerPlus, favoris, onToggleFavorite }) {
  const sentinelle = useInfiniteScroll(onChargerPlus);
  const [idSelectionne, setIdSelectionne] = useState(null);
  const reduireMouvement = useReducedMotion();

  if (pays.length === 0) {
    return <EtatVide />;
  }

  const paysAffiches = pays.slice(0, nombreAffiches);
  const paysDetail = pays.find((p) => p.id === idSelectionne);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paysAffiches.map((country, index) => (
          <motion.div
            key={country.id}
            initial={reduireMouvement ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: (index % 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
          >
            <CountryCard
              {...country}
              estFavori={favoris.includes(country.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenDetail={setIdSelectionne}
            />
          </motion.div>
        ))}
      </div>

      {paysAffiches.length < pays.length && <div ref={sentinelle} className="h-1" />}

      <AnimatePresence>
        {paysDetail && (
          <Modale
            titre={paysDetail.name}
            estFavori={favoris.includes(paysDetail.id)}
            onClose={() => setIdSelectionne(null)}
          >
            <DetailPays pays={paysDetail} />
          </Modale>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Grille;
