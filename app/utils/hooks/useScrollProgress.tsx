import { useState, useEffect, useCallback, useRef } from "react";

export const useScrollProgress = () => {
  const [animationProgress, setAnimationProgress] = useState(0); // 0 à 2 (0-1: ouverture, 1-2: fermeture)
  const [isLocked, setIsLocked] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const lockPointRef = useRef<number | null>(null);
  const accumulatedDelta = useRef(0);

  // Point de déclenchement
  const getTriggerPoint = useCallback(() => window.innerHeight * 1.2, []);

  // Vitesse de l'animation (plus petit = plus rapide)
  const ANIMATION_SENSITIVITY = 2000;

  // Dériver les valeurs à partir de animationProgress
  const imageOpacity =
    animationProgress <= 1 ? animationProgress : 2 - animationProgress;

  const imageScale =
    animationProgress <= 1
      ? 0.86 + animationProgress * 0.14
      : 1 - (animationProgress - 1) * 0.14;

  const bottomCardsOffset =
    animationProgress <= 1
      ? animationProgress * 100
      : (2 - animationProgress) * 100;

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const triggerPoint = getTriggerPoint();
      const currentScrollY = window.scrollY;

      // Si l'animation est déjà terminée, laisser le scroll normal
      if (hasCompleted) {
        if (currentScrollY < triggerPoint - 100) {
          setHasCompleted(false);
          setAnimationProgress(0);
        }
        return;
      }

      // Si on n'est pas encore au point de déclenchement
      if (!isLocked && currentScrollY < triggerPoint) {
        return;
      }

      // Si on arrive au point de déclenchement
      if (!isLocked && currentScrollY >= triggerPoint && e.deltaY > 0) {
        setIsLocked(true);
        lockPointRef.current = currentScrollY;
        accumulatedDelta.current = 0;
        e.preventDefault();
        return;
      }

      // Si on est verrouillé
      if (isLocked) {
        e.preventDefault();
        accumulatedDelta.current += e.deltaY;

        const rawProgress = accumulatedDelta.current / ANIMATION_SENSITIVITY;
        const newProgress = Math.min(Math.max(rawProgress, 0), 2);
        setAnimationProgress(newProgress);

        // Débloquer si on revient à 0
        if (newProgress <= 0 && e.deltaY < 0) {
          setIsLocked(false);
          lockPointRef.current = null;
          accumulatedDelta.current = 0;
          return;
        }

        // Débloquer si animation terminée
        if (newProgress >= 2) {
          setIsLocked(false);
          setHasCompleted(true);
          lockPointRef.current = null;
          accumulatedDelta.current = 0;
          setAnimationProgress(0);
        }
      }
    };

    const handleScroll = () => {
      const triggerPoint = getTriggerPoint();
      const currentScrollY = window.scrollY;

      // if (isLocked && lockPointRef.current !== null) {
      //   window.scrollTo(0, lockPointRef.current);
      //   return;
      // }

      if (!isLocked && !hasCompleted && currentScrollY > triggerPoint + 50) {
        setIsLocked(true);
        lockPointRef.current = triggerPoint;
        accumulatedDelta.current = 0;
        window.scrollTo(0, triggerPoint);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isLocked) return;
      e.preventDefault();
      const deltaY = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      handleWheel(new WheelEvent("wheel", { deltaY: deltaY * 2 }));
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isLocked, hasCompleted, getTriggerPoint]);

  return {
    imageOpacity,
    imageScale,
    bottomCardsOffset,
    isLocked,
    animationProgress,
  };
};

export default useScrollProgress;
