import { useScrollPosition } from "../hooks/useScrollPosition.js";

function BoutonHautDePage() {
  const position = useScrollPosition();

  if (position <= 400) {
    return null;
  }

  return (
    <button
      type="button"
      className="bouton-haut"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑ Haut de page
    </button>
  );
}

export default BoutonHautDePage;
