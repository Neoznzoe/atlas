import { useCallback, useEffect, useRef, useState } from "react";
import QuizPropositions from "./QuizPropositions.jsx";

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
    <div className="quiz">
      <button type="button" onClick={onQuitter}>
        ← Retour à l'explorateur
      </button>
      <p>Score : {score}</p>
      <p>Temps restant : {temps}s</p>
      <button type="button" onClick={() => setEnPause((p) => !p)}>
        {enPause ? "Reprendre" : "Pause"}
      </button>

      <img src={question.bonPays.flag} alt="Quel pays a ce drapeau ?" className="quiz__drapeau" />

      <QuizPropositions
        propositions={question.propositions}
        bonPaysId={question.bonPays.id}
        reponseChoisie={reponseChoisie}
        onChoisir={choisirReponse}
        registrerBouton={(index, el) => (boutonsRef.current[index] = el)}
      />
    </div>
  );
}

export default Quiz;
