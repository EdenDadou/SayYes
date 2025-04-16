import { useEffect, useRef, useState } from "react";

export default function AnimatedText({
  text,
  className,
  isMobile,
}: {
  text: string;
  className?: string;
  isMobile?: boolean;
}) {
  const container = useRef<HTMLParagraphElement>(null);
  const [visibleLetters, setVisibleLetters] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (container.current) {
        const rect = container.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const startTrigger = isMobile
          ? windowHeight * (2 / 3)
          : windowHeight * (1 / 2);
        const endTrigger = windowHeight * (1 / 4);

        if (rect.top < startTrigger && rect.bottom > endTrigger) {
          const maxVisible = text.replace(/\n/g, "").length; // Ignore les sauts de ligne
          const scrollRange = startTrigger - endTrigger;
          const progress = (startTrigger - rect.top) / scrollRange;
          const lettersToShow = Math.floor(progress * maxVisible);
          setVisibleLetters(lettersToShow);
        } else if (rect.bottom <= endTrigger) {
          setVisibleLetters(text.replace(/\n/g, "").length);
        } else if (rect.top >= startTrigger) {
          setVisibleLetters(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [text]);

  // Découpe le texte en prenant en compte les sauts de ligne (\n)
  const characters = text.split("").map((char, index) => {
    if (char === "\n") {
      return <br key={index} />;
    }

    // Compte uniquement les lettres visibles (ignore les sauts de ligne)
    const visibleIndex = text.slice(0, index).replace(/\n/g, "").length;

    return (
      <span
        key={index}
        style={{
          color: visibleIndex < visibleLetters ? "#FFFFFF" : "#717171",
          transition: "color 0.3s ease",
          lineHeight: 1.4,
          letterSpacing: 1.5,
        }}
      >
        {char}
      </span>
    );
  });

  return (
    <p
      ref={container}
      className={`font-jakarta md:text-3xl 2xl:text-4xl font-bold ${className}`}
    >
      {characters}
    </p>
  );
}
