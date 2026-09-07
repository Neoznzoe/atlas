import { useEffect } from "react";
import styles from "./Modale.module.css";

function Modale({ children, onClose, titre, estFavori = false }) {
  useEffect(() => {
    function gererEchap(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", gererEchap);
    return () => window.removeEventListener("keydown", gererEchap);
  }, [onClose]);

  const classesContenu = `${styles.contenu} ${estFavori ? styles.contenuFavori : ""}`.trim();

  return (
    <div className={styles.fond} onClick={onClose}>
      <div className={classesContenu} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={titre}>
        <button type="button" onClick={onClose} aria-label="Fermer" className={styles.fermer}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modale;
