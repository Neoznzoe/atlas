import { motion, useReducedMotion } from "motion/react";

function Card({ children, favori = false, cliquable = false, onClick }) {
  const reduireMouvement = useReducedMotion();

  return (
    <motion.article
      layout
      onClick={onClick}
      whileHover={cliquable && !reduireMouvement ? { y: -4 } : undefined}
      whileTap={cliquable && !reduireMouvement ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-surface transition-shadow duration-200 ${
        favori ? "border-gold/60 shadow-[0_0_0_1px_rgba(212,164,24,0.25)]" : "border-border"
      } ${cliquable ? "cursor-pointer hover:shadow-lg hover:shadow-black/5" : ""}`}
    >
      {children}
    </motion.article>
  );
}

export default Card;
