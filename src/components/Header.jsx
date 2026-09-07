function Header() {
  const nombreDePays = 250;

  return (
    <header className="header">
      <h1>Atlas</h1>
      <p className="header__subtitle">Explorateur de pays</p>
      <p className="header__count">{nombreDePays} pays à découvrir</p>
    </header>
  );
}

export default Header;
