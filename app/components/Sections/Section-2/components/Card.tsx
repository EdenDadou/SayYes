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

  return (
    <div
      ref={container}
      className={`flex h-screen item-center justify-center sticky top-0 w-full`}
      style={{ zIndex: i * 4 }}
    >
      <motion.div
        className="relative transform-origin-top flex w-4/5 justify-center items-center h-full"
        style={{ scale, willChange: "transform" }}
      >
        {bg}
        <div className="absolute flex flex-col justify-start gap-6 2xl:top-[20%] md:top-[12%] 2xl:left-[10%] md:left-[5%] w-1/3 h-fit px-10 py-20">
          {logo}
          {title}
          <p className="font-jakarta md:text-lg 2xl:text-4xl">{desc}</p>
          {cta}
        </div>
        <div className="absolute 2xl:right-[15%] md:right-[5%] 2xl:top-[20%] md:top-[15%] w-3/5 h-fit">
          <motion.div
            className="w-[42%] h-fit absolute right-36 top-32"
            style={{ scale: imageScale }}
          >
            <img src={image} alt="content" className="object-cover" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
