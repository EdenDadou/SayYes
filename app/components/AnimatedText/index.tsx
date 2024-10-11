import { useEffect, useRef, useState } from "react";
import "~/styles/index";

export default function AnimatedText({ text }: { text: string }) {
  const container = useRef<HTMLParagraphElement>(null);
  const [visibleLetters, setVisibleLetters] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (container.current) {
      const rect = container.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Début du premier tiers bas et fin du dernier tiers haut
      const startTrigger = windowHeight * (3 / 4);
      const endTrigger = windowHeight * (1 / 4);

      if (rect.top < startTrigger && rect.bottom > endTrigger) {
        const maxVisible = text.length;
        const scrollRange = startTrigger - endTrigger;

        // Progression de la colorisation du texte en fonction du défilement
        const progress = (startTrigger - rect.top) / scrollRange;

        const lettersToShow = Math.floor(progress * maxVisible);
        setVisibleLetters(lettersToShow);
      } else if (rect.bottom <= endTrigger) {
        // Si le texte est entièrement dans le dernier tiers haut, toutes les lettres sont colorisées
        setVisibleLetters(text.length);
      } else if (rect.top >= startTrigger) {
        // Si le texte n'a pas encore atteint le premier tiers bas, aucune lettre n'est colorisée
        setVisibleLetters(0);
      }
    }
  };

  return (
    <p
      ref={container}
      className="font-jakarta md:text-3xl 2xl:text-4xl font-bold pb-20"
    >
      {text.split("").map((letter, index) => (
        <span
          key={index}
          style={{
            color: index < visibleLetters ? "#FFFFFF" : "#717171",
          }}
        >
          {letter}
        </span>
      ))}
    </p>
  );
}
