import { motion } from "framer-motion";
import type { TitleLine, TitleElement } from "~/types/landing-page";
import Coeur from "../Header/assets/Coeur";
import Star from "~/assets/icons/Star";
import NoteStar from "~/assets/icons/NoteStar";
import TwoDiamonds from "~/assets/icons/TwoDiamonds";
import ArrowLight from "~/assets/icons/ArrowLight";
import ArrowFull from "~/assets/icons/ArrowFull";
import { ReactNode } from "react";

interface AnimatedTitleProps {
  lines: TitleLine[];
  color?: string;
}

// Mapping des icônes par nom
const IconMap: Record<string, React.SVGProps<SVGSVGElement>> = {
  heart: <Coeur />,
  star: <Star />,
  "2 stars": <NoteStar />,
  "2 diamonds": <TwoDiamonds className="w-12" />,
  arrowLight: <ArrowLight className="w-12" />,
  arrowWhite: <ArrowFull />,
};

function renderElement(element: TitleElement, index: number) {
  if (element.type === "icon") {
    return (
      <span key={index} className="mx-2 opacity-80">
        {(IconMap[element.name] as ReactNode) || element.name}
      </span>
    );
  }

  if (element.color === "animed") {
    return (
      <span key={index} className="holographic-text">
        {element.text}
      </span>
    );
  }

  return (
    <span key={index} className="text-white">
      {element.text}
    </span>
  );
}

export default function AnimatedTitle({ lines }: AnimatedTitleProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {lines.map((line, lineIndex) => {
        const Tag = line.titleType;
        const sizeClasses = {
          h1: "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
          h2: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
          h3: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
        };

        return (
          <Tag
            key={lineIndex}
            className={`${sizeClasses[line.titleType]} font-bold text-center flex flex-row gap-2 items-center`}
            style={{ fontFamily: "Jakarta Bold" }}
          >
            {line.elements.map((element, elemIndex) =>
              renderElement(element, elemIndex)
            )}
          </Tag>
        );
      })}
    </div>
  );
}
