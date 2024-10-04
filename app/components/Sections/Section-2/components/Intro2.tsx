import { useEffect, useState } from "react";
import SvgSection2Intro from "~/assets/icons/Section2/Section2Intro";
import "~/styles/index";

export default function Intro2() {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const text =
    "Du (Re)branding au développement de votre communication visuelle, Say Yes vous accompagne sur tous vos projets";

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const maxScroll = 1400;
    const lettersToShow = Math.min(
      Math.floor((scrollPosition / maxScroll) * text.length),
      text.length
    );
    setVisibleLetters(lettersToShow);
  };

  return (
    <div className="flex flex-row justify-between items-end gap-36 w-full px-20 ">
      <div className="w-1/3 h-fit">
        <SvgSection2Intro />
      </div>
      <p id="text-animed" className="font-jakarta text-3xl font-bold pb-20">
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
    </div>
  );
}
