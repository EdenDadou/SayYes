import { useState, useEffect, useCallback, useRef } from "react";
import { useScrollLock } from "~/contexts/ScrollLockContext";

export const useScrollProgress = () => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isLocked, setIsLockedLocal] = useState(false);
  const { setIsScrollLocked } = useScrollLock();

  const isLockedRef = useRef(false);
  const hasCompletedRef = useRef(false);

  const setIsLocked = useCallback(
    (value: boolean) => {
      isLockedRef.current = value;
      setIsLockedLocal(value);
      setIsScrollLocked(value);
    },
    [setIsScrollLocked]
  );

  const setHasCompletedState = useCallback((value: boolean) => {
    hasCompletedRef.current = value;
  }, []);

  const lockPointRef = useRef<number | null>(null);
  const accumulatedDelta = useRef(0);

  const ANIMATION_SENSITIVITY = 2000;

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
    const getTriggerPoint = () => window.innerHeight * 1.2;

    const handleWheel = (e: WheelEvent) => {
      const triggerPoint = getTriggerPoint();
      const currentScrollY = window.scrollY;

      if (hasCompletedRef.current) {
        if (currentScrollY < triggerPoint - 100) {
          setHasCompletedState(false);
          setAnimationProgress(0);
        }
        return;
      }

      if (!isLockedRef.current && currentScrollY < triggerPoint) {
        return;
      }

      if (
        !isLockedRef.current &&
        currentScrollY >= triggerPoint &&
        e.deltaY > 0
      ) {
        setIsLocked(true);
        lockPointRef.current = currentScrollY;
        accumulatedDelta.current = 0;
        e.preventDefault();
        return;
      }

      if (isLockedRef.current) {
        e.preventDefault();
        accumulatedDelta.current += e.deltaY;

        const rawProgress = accumulatedDelta.current / ANIMATION_SENSITIVITY;
        const newProgress = Math.min(Math.max(rawProgress, 0), 2);
        setAnimationProgress(newProgress);

        if (newProgress <= 0 && e.deltaY < 0) {
          setIsLocked(false);
          lockPointRef.current = null;
          accumulatedDelta.current = 0;
          return;
        }

        if (newProgress >= 2) {
          setIsLocked(false);
          setHasCompletedState(true);
          lockPointRef.current = null;
          accumulatedDelta.current = 0;
          setAnimationProgress(0);
        }
      }
    };

    const handleScroll = () => {
      const triggerPoint = getTriggerPoint();
      const currentScrollY = window.scrollY;

      if (
        !isLockedRef.current &&
        !hasCompletedRef.current &&
        currentScrollY > triggerPoint + 50
      ) {
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
      if (!isLockedRef.current) return;
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
  }, [setIsLocked, setHasCompletedState]);

  return {
    imageOpacity,
    imageScale,
    bottomCardsOffset,
    isLocked,
    animationProgress,
  };
};

export default useScrollProgress;
