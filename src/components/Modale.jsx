import { useEffect } from "react";

function Modale({ children, onClose, titre }) {
  useEffect(() => {
    function gererEchap(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", gererEchap);
    return () => window.removeEventListener("keydown", gererEchap);
  }, [onClose]);

  return (
    <div className="modale-fond" onClick={onClose}>
      <div
        className="modale-contenu"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={titre}
      >
        <button type="button" onClick={onClose} aria-label="Fermer" className="modale-fermer">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modale;
