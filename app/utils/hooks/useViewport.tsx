import { useEffect, useState } from "react";

export function useViewport() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof navigator === "undefined" ? "SSR" : navigator.userAgent;
    setIsMobile(isMobileUserAgent(userAgent));
  }, []);

  return isMobile;
}

function isMobileUserAgent(userAgent: string) {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
}
