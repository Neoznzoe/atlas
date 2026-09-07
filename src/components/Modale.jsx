import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { X } from "@phosphor-icons/react";

function Modale({ children, onClose, titre, estFavori = false }) {
  const reduireMouvement = useReducedMotion();

  useEffect(() => {
    function gererEchap(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", gererEchap);
    return () => window.removeEventListener("keydown", gererEchap);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={reduireMouvement ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduireMouvement ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={titre}
        className={`relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-3xl border bg-surface shadow-2xl ${
          estFavori ? "border-gold/50" : "border-border"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
        >
          <X size={16} weight="bold" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

export default Modale;
