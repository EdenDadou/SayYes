import { useState, useEffect } from "react";

export const useScrollProgress = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isImageFixed, setIsImageFixed] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [imageScale, setImageScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Déclencher l'effet quand on arrive sur l'image (après le contenu des cartes du haut)
      const imageTriggerPoint = window.innerHeight * 0.8;

      // Commencer le fade quand on a scrollé 1.5 écrans
      const fadeStartPoint = window.innerHeight * 2;

      // Finir le fade après 2.5 écrans de scroll
      const fadeEndPoint = window.innerHeight * 2.8;

      if (currentScrollY > imageTriggerPoint) {
        setIsImageFixed(true);

        // Commencer le fade progressif et le dézoom
        if (currentScrollY > fadeStartPoint) {
          const fadeProgress = Math.min(
            (currentScrollY - fadeStartPoint) / (fadeEndPoint - fadeStartPoint),
            1
          );
          setImageOpacity(1 - fadeProgress);
          // Dézoom de 1 (100%) à 0.8 (80%) pendant que l'opacité diminue
          setImageScale(1 - fadeProgress * 0.14);
        } else {
          setImageOpacity(1);
          setImageScale(1);
        }
      } else {
        setIsImageFixed(false);
        setImageOpacity(1);
        setImageScale(1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollY, isImageFixed, imageOpacity, imageScale };
};

export default useScrollProgress;
