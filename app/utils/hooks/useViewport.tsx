import { useEffect, useState } from "react";

export const MOBILE_BREAKPOINT = 768;

const MOBILE_UA_REGEX =
  /Android|webOS|Mobile|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

/** Détecte un mobile à partir d'une chaîne User-Agent (fonctionne côté serveur et client) */
export function isMobileUserAgent(userAgent: string): boolean {
  return MOBILE_UA_REGEX.test(userAgent);
}

function detectMobile(): boolean {
  return (
    isMobileUserAgent(navigator.userAgent) ||
    window.innerWidth < MOBILE_BREAKPOINT
  );
}

export function useViewport() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(detectMobile());

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handleChange = () => setIsMobile(detectMobile());
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}
