import { useState, useEffect } from "react";

export const useScrollProgress = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isImageFixed, setIsImageFixed] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(0);
  const [imageScale, setImageScale] = useState(0.86);
  const [cardsSpread, setCardsSpread] = useState(0); // Translation X des cartes pour s'écarter
  const [bottomCardsOffset, setBottomCardsOffset] = useState(-115); // Translation Y des cartes du bas (vh) - doit couvrir l'image + margin

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Point où l'animation d'entrée commence (quand on approche de l'image)
      const entryStartPoint = window.innerHeight * 1.5;

      // Point où l'image est complètement visible et les cartes écartées
      const imageTriggerPoint = window.innerHeight * 1.8;

      // Commencer le fade de sortie
      const fadeStartPoint = window.innerHeight * 2.5;

      // Finir le fade de sortie
      const fadeEndPoint = window.innerHeight * 3.2;

      if (currentScrollY > imageTriggerPoint) {
        setIsImageFixed(true);
        // Les cartes sont complètement écartées, cartes du bas à leur position normale
        setCardsSpread(100);
        setBottomCardsOffset(0);

        // Commencer le fade progressif et le dézoom (sortie)
        if (currentScrollY > fadeStartPoint) {
          const fadeProgress = Math.min(
            (currentScrollY - fadeStartPoint) / (fadeEndPoint - fadeStartPoint),
            1
          );
          setImageOpacity(1 - fadeProgress);
          // Dézoom de 1 (100%) à 0.86 (86%) pendant que l'opacité diminue
          setImageScale(1 - fadeProgress * 0.14);
          // Les cartes du bas se referment progressivement (translateX)
          setCardsSpread(100 - fadeProgress * 100);
          // Les cartes du bas remontent progressivement
          setBottomCardsOffset(-fadeProgress * 115);
        } else {
          setImageOpacity(1);
          setImageScale(1);
        }
      } else if (currentScrollY > entryStartPoint) {
        // Animation d'entrée : zoom-in et fade-in progressif
        setIsImageFixed(false);
        const entryProgress = Math.min(
          (currentScrollY - entryStartPoint) / (imageTriggerPoint - entryStartPoint),
          1
        );
        // Fade-in de 0 à 1
        setImageOpacity(entryProgress);
        // Zoom de 0.86 à 1
        setImageScale(0.86 + entryProgress * 0.14);
        // Les cartes s'écartent progressivement (translateX)
        setCardsSpread(entryProgress * 100);
        // Les cartes du bas descendent progressivement (de -115 vers 0)
        setBottomCardsOffset(-115 + entryProgress * 115);
      } else {
        setIsImageFixed(false);
        setImageOpacity(0);
        setImageScale(0.86);
        setCardsSpread(0);
        setBottomCardsOffset(-115); // Cartes du bas collées aux cartes du haut
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollY, isImageFixed, imageOpacity, imageScale, cardsSpread, bottomCardsOffset };
};

export default useScrollProgress;
