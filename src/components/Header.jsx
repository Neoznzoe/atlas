import { useTheme } from "../contexts/ThemeContext.jsx";

function Header({ nombreDePays, nombreDeFavoris }) {
  const { theme, basculerTheme } = useTheme();

  return (
    <header className="header">
      <h1>Atlas</h1>
      <p className="header__subtitle">Explorateur de pays</p>
      <p className="header__count">{nombreDePays} pays à découvrir</p>
      <p className="header__favorites">{nombreDeFavoris} favoris</p>
      <button type="button" onClick={basculerTheme} aria-label="Basculer le thème">
        {theme === "clair" ? "🌙 Thème sombre" : "☀️ Thème clair"}
      </button>
    </header>
  );
}

export default Header;
