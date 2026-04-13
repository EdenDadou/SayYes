import type { TitleLine, TitleElement } from "~/types/landing-page";
import type { ReactNode } from "react";
import { getIconMap } from "~/utils/admin/landing-page-constants";

interface AnimatedTitleProps {
  lines: TitleLine[];
  color?: string;
}

const IconMap = getIconMap("lg");

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
      <span
        key={index}
        className="holographic-text"
        style={color ? { color } : undefined}
      >
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
