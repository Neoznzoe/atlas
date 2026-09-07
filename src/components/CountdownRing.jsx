import { motion } from "motion/react";

const RAYON = 20;
const CIRCONFERENCE = 2 * Math.PI * RAYON;

function CountdownRing({ temps, duree }) {
  const progression = temps / duree;
  const urgent = temps <= 3;

  return (
    <div className="relative flex size-12 shrink-0 items-center justify-center">
      <svg width="48" height="48" viewBox="0 0 48 48" className="-rotate-90">
        <circle cx="24" cy="24" r={RAYON} fill="none" strokeWidth="4" className="stroke-border" />
        <motion.circle
          cx="24"
          cy="24"
          r={RAYON}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={CIRCONFERENCE}
          animate={{
            strokeDashoffset: CIRCONFERENCE * (1 - progression),
            stroke: urgent ? "var(--danger)" : "var(--accent)",
          }}
          transition={{ duration: 0.35, ease: "linear" }}
        />
      </svg>
      <span className={`absolute text-sm font-semibold tabular-nums ${urgent ? "text-danger" : "text-fg"}`}>{temps}</span>
    </div>
  );
}

export default CountdownRing;
