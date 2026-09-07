import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("atlas:theme", "clair");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function basculerTheme() {
    setTheme((actuel) => (actuel === "clair" ? "sombre" : "clair"));
  }

  return <ThemeContext.Provider value={{ theme, basculerTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const contexte = useContext(ThemeContext);
  if (!contexte) {
    throw new Error("useTheme doit être appelé à l'intérieur d'un <ThemeProvider>.");
  }
  return contexte;
}
