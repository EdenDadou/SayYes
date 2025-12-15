import type { TitleLine, TitleElement } from "~/types/landing-page";
import { ReactNode } from "react";
// Icons from assets/icons
import Star from "~/assets/icons/Star";
import NoteStar from "~/assets/icons/NoteStar";
import TwoDiamonds from "~/assets/icons/TwoDiamonds";
import ArrowLight from "~/assets/icons/ArrowLight";
import ArrowFull from "~/assets/icons/ArrowFull";
import Arrow from "~/assets/icons/Arrow";
import ArrowBig from "~/assets/icons/ArrowBig";
import Close from "~/assets/icons/Close";
import Coche from "~/assets/icons/Coche";
import Pause from "~/assets/icons/Pause";
import Play from "~/assets/icons/Play";
// Icons from Header/assets
import Coeur from "../Header/assets/Coeur";
import Flamme from "../Header/assets/Flamme";
import Idea from "../Header/assets/Idea";
import Smile from "../Header/assets/Smile";
import ChatBuble from "../Header/assets/ChatBuble";

interface AnimatedTitleProps {
  lines: TitleLine[];
  color?: string;
}

// Mapping des icônes par nom
const IconMap: Record<string, ReactNode> = {
  heart: <Coeur />,
  star: <Star />,
  "2 stars": <NoteStar />,
  "2 diamonds": <TwoDiamonds className="w-12" />,
  arrowLight: <ArrowLight className="w-12" />,
  arrowWhite: <ArrowFull />,
  arrow: <Arrow className="w-12" />,
  arrowBig: <ArrowBig className="w-12" />,
  coche: <Coche />,
  close: <Close className="w-8" />,
  pause: <Pause className="w-8" />,
  play: <Play className="w-8" />,
  flamme: <Flamme />,
  idea: <Idea />,
  smile: <Smile />,
  chat: <ChatBuble />,
};

function renderElement(element: TitleElement, index: number, color?: string) {
  if (element.type === "icon") {
    return (
      <span key={index} className="mx-2 opacity-80">
        {(IconMap[element.name] as ReactNode) || element.name}
      </span>
    );
  }

  if (element.color === "animed") {
    return (
      <span key={index} className="holographic-text" style={color ? { color } : undefined}>
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

export default function AnimatedTitle({ lines, color }: AnimatedTitleProps) {
  // Filtrer les lignes invalides (qui ne sont pas des objets TitleLine)
  const validLines = (lines || []).filter(
    (line): line is TitleLine =>
      line !== null &&
      typeof line === "object" &&
      "elements" in line &&
      "titleType" in line
  );

  return (
    <div className="flex flex-col items-center gap-2">
      {validLines.map((line, lineIndex) => {
        const Tag = line.titleType;
        const sizeClasses = {
          h1: "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
          h2: "text-3xl md lg:text-5xl xl:text-6xl",
          h3: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
        };

        return (
          <Tag
            key={`line-${lineIndex}`}
            className={`${sizeClasses[line.titleType]} font-bold text-center flex flex-row flex-nowrap items-center justify-center gap-2 w-full whitespace-nowrap`}
            style={{ fontFamily: "Jakarta Bold" }}
          >
            {line.elements.map((element, elemIndex) =>
              renderElement(element, elemIndex, color)
            )}
          </Tag>
        );
      })}
    </div>
  );
}
