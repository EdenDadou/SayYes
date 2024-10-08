import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import "~/styles/index";

interface CardProps {
  logo: JSX.Element;
  title: JSX.Element;
  desc: string;
  cta: JSX.Element;
  bg: JSX.Element;
  image: string;
  i: number;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}

export default function Card({
  logo,
  title,
  desc,
  cta,
  bg,
  image,
  i,
  progress,
  range,
  targetScale,
}: CardProps) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const scale = useTransform(progress, range, [1, targetScale]);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <div
      ref={container}
      className="flex h-screen item-center justify-center sticky top-0 w-full"
      style={{ top: `calc( ${i * 40}px)` }}
    >
      <motion.div
        className="relative transform-origin-top flex w-4/5 justify-center items-center h-full"
        style={{ scale, top: `calc(+ ${i * 40}px)` }}
      >
        {bg}
        <div className="absolute right-10 top-28 w-3/5 h-fit">
          <motion.div
            className="w-2/5 h-fit absolute right-32 top-40"
            style={{ scale: imageScale }}
          >
            <img src={image} alt="content" className="object-cover" />
          </motion.div>
        </div>
        <div className="absolute flex flex-col justify-start gap-8 top-24 left-20 w-1/3 h-fit px-10 py-20">
          {logo}
          {title}
          <p className="font-jakarta text-lg">{desc}</p>
          {cta}
        </div>
      </motion.div>
    </div>
  );
}
