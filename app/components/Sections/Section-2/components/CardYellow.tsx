import { useRef, useEffect, useState } from "react";
import SvgCardYellowBg from "public/icons/IconsSection2/CardYellowBg";
import SvgCardYellowContent from "public/icons/IconsSection2/CardYellowContent";
import SvgCardYellowLogo from "public/icons/IconsSection2/CardYellowLogo";
import SvgCardYellowTitle from "public/icons/IconsSection2/CardYellowTitle";
import SvgCardYellowCta from "public/icons/IconsSection2/CardYellowCta";
import "~/styles/index";

export default function CardYellow() {
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
      {/* <SvgCardYellowContent className="absolute top-28 right-20" /> */}
      <div className="absolute flex flex-col justify-start gap-8 top-24 left-20 w-1/3 h-fit px-10 py-12">
        <SvgCardYellowLogo />
        <SvgCardYellowTitle />
        <p className="font-jakarta text-lg">
          Say Yes conçoit & coordonne votre identité pour faire rayonner votre
          marque durablement !
        </p>
        <SvgCardYellowCta className="cursor-pointer" />
      </div>
      <SvgCardYellowBg className="ml-2" />
    </div>
  );
}
