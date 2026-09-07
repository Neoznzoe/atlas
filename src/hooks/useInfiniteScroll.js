import { useEffect, useRef } from "react";

export function useInfiniteScroll(onVisible) {
  const sentinelle = useRef(null);

  useEffect(() => {
    const element = sentinelle.current;
    if (!element) return;

    const observateur = new IntersectionObserver((entrees) => {
      if (entrees[0].isIntersecting) {
        onVisible();
      }
    });

    observateur.observe(element);
    return () => observateur.disconnect();
  }, [onVisible]);

  return sentinelle;
}
