import { useEffect, useState } from "react";

/**
 * Hook pour détecter si les animations doivent être réduites
 * - Sur mobile (meilleure performance)
 * - Si l'utilisateur a activé "réduire les mouvements" dans ses préférences système
 */
export function useReducedMotion(): boolean {
  const [shouldReduce, setShouldReduce] = useState(false);

  useEffect(() => {
    // Vérifier les préférences utilisateur
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Vérifier si c'est mobile
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    setShouldReduce(mediaQuery.matches || isMobile);

    const handler = (e: MediaQueryListEvent) => {
      setShouldReduce(e.matches || isMobile);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return shouldReduce;
}

/**
 * Variantes Framer Motion optimisées pour mobile
 * Retourne des variantes vides si les animations sont réduites
 */
export function getMobileOptimizedVariants(shouldReduce: boolean) {
  if (shouldReduce) {
    return {
      initial: {},
      animate: {},
      exit: {},
    };
  }

  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
}
