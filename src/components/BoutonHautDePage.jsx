import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp } from "@phosphor-icons/react";
import { useScrollPosition } from "../hooks/useScrollPosition.js";

function BoutonHautDePage() {
  const position = useScrollPosition();
  const reduireMouvement = useReducedMotion();
  const visible = position > 400;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduireMouvement ? "auto" : "smooth" })}
          aria-label="Haut de page"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          whileHover={reduireMouvement ? undefined : { y: -2 }}
          whileTap={reduireMouvement ? undefined : { scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
          className="fixed right-5 bottom-5 z-40 flex size-11 items-center justify-center rounded-full bg-accent text-accent-fg shadow-lg shadow-accent/25"
        >
          <ArrowUp size={18} weight="bold" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default BoutonHautDePage;
