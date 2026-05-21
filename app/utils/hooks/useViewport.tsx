import { useEffect, useState } from "react";
import { useRouteLoaderData } from "@remix-run/react";
import type { RootLoaderData } from "~/root";

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
  const rootData = useRouteLoaderData<RootLoaderData>("root");

  const [isMobile, setIsMobile] = useState<boolean | null>(() => {
    // Utiliser la valeur SSR (User-Agent) des deux côtés : garantit que serveur et
    // client rendent le même HTML lors de l'hydratation (fix React #418 / #423).
    if (rootData?.isMobileSSR !== undefined) return rootData.isMobileSSR;
    // Côté serveur sans rootData : null (sera résolu à l'hydration)
    if (typeof window === "undefined") return null;
    // Fallback client : détecter directement (cas edge sans rootData)
    return detectMobile();
  });

  useEffect(() => {
    // Synchroniser avec la détection client réelle (couvre rotation / resize)
    setIsMobile(detectMobile());

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handleChange = () => setIsMobile(detectMobile());
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}
