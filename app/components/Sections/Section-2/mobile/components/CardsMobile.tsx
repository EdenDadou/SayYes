import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";

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

export default function CardMobile({
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

  return (
    <div
      ref={container}
      className={`flex h-screen item-start justify-start sticky top-0 w-full`}
      style={{ zIndex: i * 4 }}
    >
      <motion.div
        className="relative flex w-full justify-center items-center h-full top-0 transform-origin-top"
        style={{ scale, willChange: "transform" }}
      >
        {bg}
        <div className="absolute flex flex-col justify-start items-center gap-6 w-full h-fit px-10 top-32">
          {logo}
          {title}
          <p className="font-jakarta text-center">{desc}</p>
          <div className="flex flex-col gap-3 items-center">
            <motion.div
              className="w-1/2 h-auto my-10"
              style={{ scale: imageScale }}
            >
              <img src={image} alt="content" className="object-cover" />
            </motion.div>
            {cta}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
