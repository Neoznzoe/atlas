function QuizPropositions({ propositions, bonPaysId, reponseChoisie, onChoisir, registrerBouton }) {
  return (
    <div className="quiz__propositions">
      {propositions.map((p, index) => {
        const estBonneReponse = p.id === bonPaysId;
        const estChoisie = reponseChoisie === p.id;
        let classe = "";
        if (reponseChoisie !== null && estBonneReponse) classe = "quiz__proposition--correcte";
        else if (estChoisie) classe = "quiz__proposition--incorrecte";

        return (
          <button
            key={p.id}
            ref={(el) => registrerBouton(index, el)}
            type="button"
            className={classe}
            onClick={() => onChoisir(p)}
            disabled={reponseChoisie !== null}
          >
            {index + 1}. {p.name}
          </button>
        );
      })}
    </div>
  );
}

export default QuizPropositions;
