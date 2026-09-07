function NavPrincipale({ onOuvrirQuiz }) {
  return (
    <nav className="nav-principale">
      <button type="button" onClick={onOuvrirQuiz}>
        🎮 Jouer au quiz
      </button>
    </nav>
  );
}

export default NavPrincipale;
