import { motion, useReducedMotion } from "motion/react";
import { CheckCircle, XCircle } from "@phosphor-icons/react";

function QuizPropositions({ propositions, bonPaysId, reponseChoisie, onChoisir, registrerBouton }) {
  const reduireMouvement = useReducedMotion();
  const revele = reponseChoisie !== null;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {propositions.map((p, index) => {
        const estBonneReponse = p.id === bonPaysId;
        const estChoisie = reponseChoisie === p.id;

        let classe = "border-border bg-surface text-fg hover:border-border-strong hover:bg-surface-hover";
        if (revele && estBonneReponse) classe = "border-success bg-success-soft text-fg";
        else if (revele && estChoisie) classe = "border-danger bg-danger-soft text-fg";
        else if (revele) classe = "border-border bg-surface text-fg-subtle opacity-50";

        return (
          <motion.button
            key={p.id}
            ref={(el) => registrerBouton(index, el)}
            type="button"
            animate={!reduireMouvement && revele && estChoisie && !estBonneReponse ? { x: [0, -6, 6, -4, 4, 0] } : undefined}
            transition={{ duration: 0.4 }}
            onClick={() => onChoisir(p)}
            disabled={revele}
            className={`flex items-center justify-between gap-2 rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-colors ${classe}`}
          >
            <span>
              <span className="mr-2 text-fg-subtle">{index + 1}.</span>
              {p.name}
            </span>
            {revele && estBonneReponse && <CheckCircle size={18} weight="fill" className="shrink-0 text-success" />}
            {revele && estChoisie && !estBonneReponse && <XCircle size={18} weight="fill" className="shrink-0 text-danger" />}
          </motion.button>
        );
      })}
    </div>
  );
}

export default QuizPropositions;
