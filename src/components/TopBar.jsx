import { motion, useReducedMotion } from "motion/react";
import { CompassTool, GameController, MoonStars, Sun, Star } from "@phosphor-icons/react";
import { useTheme } from "../contexts/ThemeContext.jsx";

function StatPill({ icon, value, label }) {
  return (
    <span className="hidden items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg-muted sm:flex">
      {icon}
      <span className="font-medium text-fg">{value.toLocaleString("fr-FR")}</span>
      <span className="hidden md:inline">{label}</span>
    </span>
  );
}

function TopBar({ nombreDePays, nombreDeFavoris, onOuvrirQuiz }) {
  const { theme, basculerTheme } = useTheme();
  const reduireMouvement = useReducedMotion();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-xl bg-accent text-accent-fg">
            <CompassTool size={18} weight="bold" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-fg">Atlas</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <StatPill icon={<CompassTool size={14} weight="regular" />} value={nombreDePays} label="pays" />
          <StatPill icon={<Star size={14} weight="fill" className="text-gold" />} value={nombreDeFavoris} label="favoris" />

          <motion.button
            type="button"
            onClick={onOuvrirQuiz}
            whileHover={reduireMouvement ? undefined : { y: -1 }}
            whileTap={reduireMouvement ? undefined : { scale: 0.96 }}
            className="flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-sm font-medium text-accent-fg shadow-sm shadow-accent/20 transition-colors hover:bg-accent-hover sm:px-4"
          >
            <GameController size={16} weight="bold" />
            <span className="hidden sm:inline">Quiz</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={basculerTheme}
            aria-label="Basculer le thème"
            whileHover={reduireMouvement ? undefined : { y: -1 }}
            whileTap={reduireMouvement ? undefined : { scale: 0.9 }}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-surface text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg"
          >
            {theme === "clair" ? <MoonStars size={17} /> : <Sun size={17} />}
          </motion.button>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
