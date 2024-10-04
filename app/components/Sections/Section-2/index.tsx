import { useEffect, useState } from "react";
import SvgCardBlueContent from "~/assets/icons/CardBlueContent";
import SvgCardPinkBg from "~/assets/icons/CardPinkBg";
import SvgCardPinkContent from "~/assets/icons/CardPinkContent";
import SvgCardYellowBg from "~/assets/icons/CardYellowBg";
import SvgCardYellowContent from "~/assets/icons/CardYellowContent";
import SvgSection2Bg from "~/assets/icons/Section2Bg";
import SvgSection2Intro from "~/assets/icons/Section2Intro";
import SvgCardPinkLogo from "~/assets/icons/CardPinkLogo";
import SvgCardPinkTitle from "~/assets/icons/CardPinkTitle";
import SvgCardYellowLogo from "~/assets/icons/CardYellowLogo";
import SvgCardYellowTitle from "~/assets/icons/CardYellowTitle";
import "~/styles/index";
import SvgCardPinkCta from "~/assets/icons/CardPinkCta";
import SvgCardBlueBg from "~/assets/icons/CardBlueBg";
import SvgCardYellowCta from "~/assets/icons/CardYellowCta";
import SvgCardBlueLogo from "~/assets/icons/CardBlueLogo";
import SvgCardBlueTitle from "~/assets/icons/CardBlueTitle";
import SvgCardBlueCta from "~/assets/icons/CardBlueCta";
import ScrollingBanner from "../Section-1/components/ScrollingBanner";

export default function Section2() {
  const text =
    "Du (Re)branding au développement de votre communication visuelle, Say Yes vous accompagne sur tous vos projets";
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [cardSize, setCardSize] = useState(1);
  const [isCardVisible, setIsCardVisible] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    // Calculez le nombre de lettres à rendre visibles en fonction du défilement
    const maxScroll = 1400; // Changez cette valeur selon la taille de votre section
    const lettersToShow = Math.min(
      Math.floor((scrollPosition / maxScroll) * text.length),
      text.length
    );
    setVisibleLetters(lettersToShow);

    // Vérifiez la visibilité de la carte
    const cardElement = document.getElementById("yellow-card");
    if (cardElement) {
      const { top } = cardElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Si la carte est visible dans le viewport
      if (top < windowHeight) {
        setIsCardVisible(true);
      } else {
        setIsCardVisible(false);
      }
    }

    // Calculez la taille de la carte si elle est visible
    if (isCardVisible) {
      const newSize = Math.min(1 + scrollPosition / 1000, 1.2); // 1 à 2 fois sa taille d'origine
      setCardSize(newSize);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full h-fit overflow-hidden ">
      <ScrollingBanner />
      <div className="relative w-full h-fit z-10 flex justify-center">
        {/* Bg Layer */}
        <div className="absolute h-screen w-full top-10 right-0 left-0 z-0 ">
          <SvgSection2Bg className="w-full" />
        </div>
        {/* Front Layer */}

        <div className="max-w-[1200px]  py-40">
          <div className="flex flex-row justify-between items-center gap-36 w-full">
            <div className="w-1/3 h-fit">
              <SvgSection2Intro />
            </div>
            <p className="font-jakarta text-3xl font-bold">
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

          <div className="relative">
            <SvgCardYellowContent className="absolute top-28 right-16" />
            <div className="absolute flex flex-col justify-start gap-8 top-24 left-16 w-1/3 h-fit px-10 py-12">
              <SvgCardYellowLogo />
              <SvgCardYellowTitle />
              <p className="font-jakarta text-lg">
                Say Yes conçoit & coordonne votre identité pour faire rayonner
                votre marque durablement !
              </p>
              <SvgCardYellowCta className="cursor-pointer" />
            </div>
            <SvgCardYellowBg id="yellow-card" />
          </div>
          <div className="relative">
            <SvgCardPinkContent className="absolute top-28 right-16" />
            <div className="absolute flex flex-col gap-8 top-24 left-16 w-1/3 h-fit px-10 py-12">
              <SvgCardPinkLogo />
              <SvgCardPinkTitle />
              <p className="font-jakarta text-lg">
                Say Yes améliore votre visibilité et votre performance pour vous
                rendre incontournable !
              </p>
              <SvgCardPinkCta className="cursor-pointer" />
            </div>
            <SvgCardPinkBg id="pink-card" />
          </div>
          <div className="relative">
            <SvgCardBlueContent className="absolute top-28 right-16" />
            <div className="absolute flex flex-col gap-8 top-24 left-16 w-1/3 h-fit px-10 py-12">
              <SvgCardBlueLogo />
              <SvgCardBlueTitle />
              <p className="font-jakarta text-lg">
                Say Yes conçoit & coordonne votre identité pour faire rayonner
                votre marque durablement !
              </p>
              <SvgCardBlueCta className="cursor-pointer" />
            </div>
            <SvgCardBlueBg id="blue-card" />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
