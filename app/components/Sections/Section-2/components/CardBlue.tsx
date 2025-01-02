import SvgCardBlueBg from "~/components/Sections/Section-2/components/assets/CardBlueBg";
import SvgCardBlueLogo from "~/components/Sections/Section-2/components/assets/CardBlueLogo";
import SvgCardBlueTitle from "~/components/Sections/Section-2/components/assets/CardBlueTitle";
import SvgCardBlueCta from "~/components/Sections/Section-2/components/assets/CardBlueCta";
import SvgCardBlueContent from "~/components/Sections/Section-2/components/assets/CardBlueContent";
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
