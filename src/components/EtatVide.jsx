import { motion } from "motion/react";
import { MagnifyingGlassMinus } from "@phosphor-icons/react";

function EtatVide() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-24 text-center sm:px-6"
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-surface-hover text-fg-subtle">
        <MagnifyingGlassMinus size={22} />
      </span>
      <p className="text-base font-medium text-fg">Aucun pays ne correspond à ta recherche</p>
      <p className="text-sm text-fg-subtle">Essaie un autre nom, ou ajuste tes filtres.</p>
    </motion.div>
  );
}

export default EtatVide;
