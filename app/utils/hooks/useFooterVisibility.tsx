import { useState, useEffect, useRef } from "react";

export const useFooterVisibility = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Déclencher l'effet quand le footer est visible à 30%
        setIsFooterVisible(
          entry.isIntersecting && entry.intersectionRatio > 0.3
        );
      },
      {
        threshold: [0, 0.3, 0.5, 0.7, 1], // Multiples seuils pour plus de précision
        rootMargin: "-10% 0px", // Déclenche un peu avant que le footer soit complètement visible
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return { isFooterVisible, footerRef };
};

export default useFooterVisibility;
