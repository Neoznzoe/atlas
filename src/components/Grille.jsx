import { useState } from "react";
import CountryCard from "./CountryCard.jsx";
import Modale from "./Modale.jsx";
import DetailPays from "./DetailPays.jsx";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.js";

function Grille({ pays, nombreAffiches, onChargerPlus, favoris, onToggleFavorite }) {
  const sentinelle = useInfiniteScroll(onChargerPlus);
  const [idSelectionne, setIdSelectionne] = useState(null);

  if (pays.length === 0) {
    return <p className="grid-vide">Aucun pays ne correspond à ta recherche.</p>;
  }

  const paysAffiches = pays.slice(0, nombreAffiches);
  const paysDetail = pays.find((p) => p.id === idSelectionne);

  return (
    <>
      <div className="grid">
        {paysAffiches.map((country) => (
          <CountryCard
            key={country.id}
            {...country}
            estFavori={favoris.includes(country.id)}
            onToggleFavorite={onToggleFavorite}
            onOpenDetail={setIdSelectionne}
          />
        ))}
      </div>
      {paysAffiches.length < pays.length && <div ref={sentinelle} className="sentinelle" />}

      {paysDetail && (
        <Modale titre={paysDetail.name} onClose={() => setIdSelectionne(null)}>
          <DetailPays pays={paysDetail} />
        </Modale>
      )}
    </>
  );
}

export default Grille;
