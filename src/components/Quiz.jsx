import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Pause, Play } from "@phosphor-icons/react";
import QuizPropositions from "./QuizPropositions.jsx";
import CountdownRing from "./CountdownRing.jsx";

const DUREE_QUESTION = 10;
const DELAI_QUESTION_SUIVANTE = 1200;

function melanger(tableau) {
  return [...tableau].sort(() => Math.random() - 0.5);
}

function tirerQuestion(pays) {
  const candidats = melanger(pays.filter((p) => p.flag));
  const bonPays = candidats[0];
  const propositions = melanger([bonPays, ...candidats.slice(1, 4)]);
  return { bonPays, propositions };
}

function Quiz({ pays, onQuitter }) {
  const [question, setQuestion] = useState(() => tirerQuestion(pays));
  const [temps, setTemps] = useState(DUREE_QUESTION);
  const [enPause, setEnPause] = useState(false);
  const [reponseChoisie, setReponseChoisie] = useState(null);
  const [score, setScore] = useState(0);
  const boutonsRef = useRef([]);
  const reduireMouvement = useReducedMotion();

  const questionSuivante = useCallback(() => {
    setQuestion(tirerQuestion(pays));
    setTemps(DUREE_QUESTION);
    setReponseChoisie(null);
  }, [pays]);

  useEffect(() => {
    if (enPause || reponseChoisie !== null) return;
    const id = setInterval(() => {
      setTemps((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [enPause, reponseChoisie]);

  useEffect(() => {
    if (temps === 0 && reponseChoisie === null) {
      setReponseChoisie("temps-ecoule");
    }
  }, [temps, reponseChoisie]);

  useEffect(() => {
    if (reponseChoisie === null) return;
    const id = setTimeout(questionSuivante, DELAI_QUESTION_SUIVANTE);
    return () => clearTimeout(id);
  }, [reponseChoisie, questionSuivante]);

  function choisirReponse(paysPropose) {
    if (reponseChoisie !== null) return;
    setReponseChoisie(paysPropose.id);
    if (paysPropose.id === question.bonPays.id) {
      setScore((s) => s + 1);
    }
  }

  useEffect(() => {
    function gererClavier(e) {
      const index = Number(e.key) - 1;
      if (index >= 0 && index < question.propositions.length) {
        boutonsRef.current[index]?.focus();
        choisirReponse(question.propositions[index]);
      }
    }
    window.addEventListener("keydown", gererClavier);
    return () => window.removeEventListener("keydown", gererClavier);
  }, [question, reponseChoisie]);

  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <button type="button" onClick={onQuitter} className="flex items-center gap-1.5 text-sm font-medium text-fg-muted hover:text-fg">
            <ArrowLeft size={16} /> Explorateur
          </button>
          <div className="flex items-center gap-2.5">
            <span className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-semibold text-fg tabular-nums">
              Score : {score}
            </span>
            <button
              type="button"
              onClick={() => setEnPause((p) => !p)}
              aria-label={enPause ? "Reprendre" : "Mettre en pause"}
              className="flex size-9 items-center justify-center rounded-full border border-border bg-surface text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg"
            >
              {enPause ? <Play size={16} weight="fill" /> : <Pause size={16} weight="fill" />}
            </button>
          </div>
        </div>
      </header>

      <main className="relative mx-auto flex w-full max-w-2xl flex-1 flex-col items-center gap-6 px-4 py-10">
        <div className="flex w-full items-center gap-3">
          <CountdownRing temps={temps} duree={DUREE_QUESTION} />
          <p className="text-sm text-fg-subtle">Quel pays a ce drapeau ?</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.img
            key={question.bonPays.id}
            src={question.bonPays.flag}
            alt="Drapeau à deviner"
            initial={reduireMouvement ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduireMouvement ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="aspect-16/10 w-full max-w-sm rounded-3xl border border-border object-cover shadow-lg"
          />
        </AnimatePresence>

        <div className="w-full">
          <QuizPropositions
            propositions={question.propositions}
            bonPaysId={question.bonPays.id}
            reponseChoisie={reponseChoisie}
            onChoisir={choisirReponse}
            registrerBouton={(index, el) => (boutonsRef.current[index] = el)}
          />
        </div>

        <AnimatePresence>
          {enPause && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl bg-bg/85 backdrop-blur-sm"
            >
              <p className="text-lg font-semibold text-fg">En pause</p>
              <button
                type="button"
                onClick={() => setEnPause(false)}
                className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg hover:bg-accent-hover"
              >
                <Play size={16} weight="fill" /> Reprendre
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default Quiz;
