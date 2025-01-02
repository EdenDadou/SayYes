import SvgCardBlueBg from "public/icons/IconsSection2/CardBlueBg";
import SvgCardBlueLogo from "public/icons/IconsSection2/CardBlueLogo";
import SvgCardBlueTitle from "public/icons/IconsSection2/CardBlueTitle";
import SvgCardBlueCta from "public/icons/IconsSection2/CardBlueCta";
import SvgCardBlueContent from "public/icons/IconsSection2/CardBlueContent";
import "~/styles/index";
import { useEffect, useRef, useState } from "react";

export default function CardBlue() {
  const cardRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const visibility = entry.intersectionRatio;

          let newScale;
          if (visibility < 0.5) {
            newScale = 1 + visibility * 0.1;
          } else {
            newScale = 1 + visibility * 0.2;
          }

          setScale(newScale);
        });
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      }
    );

    const cardElement = cardRef.current;
    if (cardElement) {
      observer.observe(cardElement);
    }

    return () => {
      if (cardElement) observer.unobserve(cardElement);
    };
  }, []);
  return (
    <div
      ref={cardRef}
      className="relative flex justify-center transition-transform duration-500 ease-in-out"
      style={{ transform: `scale(${scale})` }}
    >
      {/* <SvgCardBlueContent className="absolute top-28 right-20" /> */}
      <div className="absolute flex flex-col gap-8 top-24 left-20 w-1/3 h-fit px-10 py-12">
        <SvgCardBlueLogo />
        <SvgCardBlueTitle />
        <p className="font-jakarta text-lg">
          Say Yes conçoit & coordonne votre identité pour faire rayonner votre
          marque durablement !
        </p>
        <SvgCardBlueCta className="cursor-pointer" />
      </div>
      <SvgCardBlueBg className="ml-2" />
    </div>
  );
}
