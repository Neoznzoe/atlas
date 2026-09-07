import { useEffect, useState } from "react";

export function useLocalStorage(cle, valeurInitiale) {
  const [valeur, setValeur] = useState(() => {
    try {
      const stocke = localStorage.getItem(cle);
      return stocke ? JSON.parse(stocke) : valeurInitiale;
    } catch {
      return valeurInitiale;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(cle, JSON.stringify(valeur));
    } catch {
      // localStorage indisponible (navigation privée, quota plein…) : on ignore silencieusement
    }
  }, [cle, valeur]);

  return [valeur, setValeur];
}
