function Header({ nombreDePays, nombreDeFavoris }) {
  return (
    <header className="header">
      <h1>Atlas</h1>
      <p className="header__subtitle">Explorateur de pays</p>
      <p className="header__count">{nombreDePays} pays à découvrir</p>
      <p className="header__favorites">{nombreDeFavoris} favoris</p>
    </header>
  );
}

export default Header;
