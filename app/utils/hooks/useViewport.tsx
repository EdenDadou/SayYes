import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

function detectMobile(): boolean {
  // Détection par userAgent (vrais appareils mobiles)
  const isMobileDevice =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // Détection par largeur d'écran (mode responsive DevTools)
  const isMobileWidth = window.innerWidth < MOBILE_BREAKPOINT;

  return isMobileDevice || isMobileWidth;
}

export function useViewport() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // Détection initiale
    setIsMobile(detectMobile());

    // Écouter les changements de taille de fenêtre
    const handleResize = () => {
      setIsMobile(detectMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
