import { useEffect } from "react";

const ROUTES_TO_PREFETCH = ["/solutions", "/portfolio"];

const IMAGES_TO_PREFETCH = [
  "/images/bg-menu-mobile.png",
  "/images/solutions/Card1.png",
  "/images/solutions/Card2.png",
  "/images/solutions/Card3.png",
  "/images/solutions/Card4.png",
  "/images/solutions/Card5.png",
  "/images/solutions/MasqueMobile.png",
  "/images/portfolio/bg.png",
  "/images/portfolio/ClientWallmobile.png",
];

function injectPrefetchLink(href: string, as?: string): HTMLLinkElement {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;
  if (as) link.setAttribute("as", as);
  document.head.appendChild(link);
  return link;
}

/**
 * Déclenche un prefetch silencieux 2s après le montage.
 * Mobile uniquement (window.innerWidth < 768). N'affecte pas le chargement initial.
 */
export function usePrefetchOnIdle(): void {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 768) return;

    const links: HTMLLinkElement[] = [];

    const prefetch = () => {
      // Routes Remix — précharge les chunks JS + données loader
      for (const route of ROUTES_TO_PREFETCH) {
        links.push(injectPrefetchLink(route, "document"));
      }

      // Images via /api/image → passent dans le SW CacheFirst
      for (const imgPath of IMAGES_TO_PREFETCH) {
        const url = `/api/image?src=${encodeURIComponent(imgPath)}&w=640&q=75`;
        links.push(injectPrefetchLink(url, "image"));
      }
    };

    const timer = setTimeout(prefetch, 2000);

    return () => {
      clearTimeout(timer);
      links.forEach((link) => link.parentNode?.removeChild(link));
    };
  }, []);
}
