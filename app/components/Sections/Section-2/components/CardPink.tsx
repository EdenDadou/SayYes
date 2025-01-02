import { useRef, useState, useEffect } from "react";
import SvgCardPinkBg from "~/components/Sections/Section-2/components/assets/CardPinkBg";
import SvgCardPinkContent from "~/components/Sections/Section-2/components/assets/CardPinkContent";
import SvgCardPinkCta from "~/components/Sections/Section-2/components/assets/CardPinkCta";
import SvgCardPinkLogo from "~/components/Sections/Section-2/components/assets/CardPinkLogo";
import SvgCardPinkTitle from "~/components/Sections/Section-2/components/assets/CardPinkTitle";
import "~/styles/index";

export default function CardPink() {
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
      {/* <SvgCardPinkContent className="absolute top-28 right-20" /> */}
      <div className="absolute flex flex-col gap-8 top-24 left-20 w-1/3 h-fit px-10 py-12">
        <SvgCardPinkLogo />
        <SvgCardPinkTitle />
        <p className="font-jakarta text-lg">
          Say Yes améliore votre visibilité et votre performance pour vous
          rendre incontournable !
        </p>
        <SvgCardPinkCta className="cursor-pointer" />
      </div>
      <SvgCardPinkBg className="ml-2" />
    </div>
  );
}
