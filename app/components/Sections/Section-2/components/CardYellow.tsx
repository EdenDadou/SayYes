import { useRef, useEffect, useState } from "react";
import SvgCardYellowBg from "~/components/Sections/Section-2/components/assets/CardYellowBg";
import SvgCardYellowContent from "~/components/Sections/Section-2/components/assets/CardYellowContent";
import SvgCardYellowLogo from "~/components/Sections/Section-2/components/assets/CardYellowLogo";
import SvgCardYellowTitle from "~/components/Sections/Section-2/components/assets/CardYellowTitle";
import SvgCardYellowCta from "~/components/Sections/Section-2/components/assets/CardYellowCta";

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
