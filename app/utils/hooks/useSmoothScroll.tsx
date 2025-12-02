import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";

export default function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Désactiver sur mobile pour de meilleures performances
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    lenisRef.current = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }
    rafIdRef.current = requestAnimationFrame(raf);

    // Cleanup pour éviter les fuites mémoire
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenisRef.current?.destroy();
    };
  }, []);
}
