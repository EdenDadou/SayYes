import { motion } from "framer-motion";
import type { TitleLine, TitleElement } from "~/types/landing-page";

interface AnimatedTitleProps {
  lines: TitleLine[];
  color?: string;
}

// Mapping des icônes par nom
const IconMap: Record<string, string> = {
  sparkle: "✦",
  star: "★",
  arrow: "→",
  check: "✓",
  heart: "♥",
  fire: "🔥",
  rocket: "🚀",
  lightning: "⚡",
  diamond: "◆",
};

function renderElement(element: TitleElement, color: string, index: number) {
  if (element.type === "icon") {
    return (
      <span key={index} className="mx-2 opacity-80">
        {IconMap[element.name] || element.name}
      </span>
    );
  }

  if (element.color === "animed") {
    return (
      <motion.span
        key={index}
        className="inline-block bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(90deg, ${color}, #fff, ${color})`,
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        {element.text}
      </motion.span>
    );
  }

  return (
    <span key={index} className="text-white">
      {element.text}
    </span>
  );
}

export default function AnimatedTitle({ lines, color = "#60a5fa" }: AnimatedTitleProps) {
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
            className={`${sizeClasses[line.titleType]} font-bold text-center`}
            style={{ fontFamily: "Jakarta Bold" }}
          >
            {line.elements.map((element, elemIndex) =>
              renderElement(element, color, elemIndex)
            )}
          </Tag>
        );
      })}
    </div>
  );
}
