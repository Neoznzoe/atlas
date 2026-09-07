import { useEffect, useState } from "react";

export function useScrollPosition() {
  const [position, setPosition] = useState(() => window.scrollY);

  useEffect(() => {
    function gererDefilement() {
      setPosition(window.scrollY);
    }
    window.addEventListener("scroll", gererDefilement);
    return () => window.removeEventListener("scroll", gererDefilement);
  }, []);

  return position;
}
