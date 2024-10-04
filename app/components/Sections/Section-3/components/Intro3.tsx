import { useEffect, useState } from "react";
import SvgSection3Intro from "~/assets/icons/Section3/Section3Intro";
import "~/styles/index";

export default function Intro3() {
  const [visibleLetters, setVisibleLetters] = useState(0);

  const text =
    "Croissance, visibilité, marque employeur, nous avons tout pour développer votre notoriété à tous les niveaux !";

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const maxScroll = 4400;
    const lettersToShow = Math.min(
      Math.floor((scrollPosition / maxScroll) * text.length),
      text.length
    );
    setVisibleLetters(lettersToShow);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-row justify-between items-center gap-36 w-full pb-20">
      <div className="w-1/3 h-fit">
        <SvgSection3Intro />
      </div>
      <p className="font-jakarta text-3xl font-bold">
        {text.split("").map((letter, index) => (
          <span
            id="text-animed-section-2"
            key={index}
            style={{
              color: index < visibleLetters ? "#FFFFFF" : "#717171",
            }}
          >
            {letter}
          </span>
        ))}
      </p>
    </div>
  );
}
