import { useEffect, useState } from "react";

const VIEWPORT_KEY = "sayyes_is_mobile";

function detectAndStore(): boolean {
  const stored = localStorage.getItem(VIEWPORT_KEY);
  if (stored !== null) {
    return stored === "true";
  }
  // Première visite : détecter et stocker
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  localStorage.setItem(VIEWPORT_KEY, String(isMobile));
  return isMobile;
}

export function useViewport() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(detectAndStore());
  }, []);

  return isMobile;
}
