import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative inline-block mr-[0.25em]">
      <span className="opacity-20">{children}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {children}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const lines = text.split("\n");
  const allWords = text.replace(/\n/g, " ").split(" ");
  const totalWords = allWords.length;
  let wordIndex = 0;

  return (
    <p ref={container} className={className}>
      {lines.map((line, lineIndex) => {
        const words = line.split(" ");
        return (
          <span key={lineIndex} className="block">
            {words.map((word, i) => {
              const currentIndex = wordIndex++;
              const start = currentIndex / totalWords;
              const end = start + 1 / totalWords;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </span>
        );
      })}
    </p>
  );
}
