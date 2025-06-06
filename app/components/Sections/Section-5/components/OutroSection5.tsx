import SvgBtnFaq from "~/components/Sections/Section-5/components/assets/BtnFaq";
import SvgBtnHautPage from "~/components/Sections/Section-5/components/assets/BtnHautPage";
import SvgBtnSayYes from "~/components/Sections/Section-5/components/assets/BtnSayYes";
import SvgSection5Bg from "~/components/Sections/Section-5/components/assets/Section5Bg";
import SvgSection5Outro from "~/components/Sections/Section-5/components/assets/Section5Outro";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";

interface Section5Props {
  setIsOpen: (value: boolean) => void;
}

const variants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      delay: 0.2,
      ease: "easeOut",
    },
  },
  hidden: { opacity: 0, x: -100 },
};

export default function OutroSection5({ setIsOpen }: Section5Props) {
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: "-100px" });

  return (
    <div
      className="relative w-full flex flex-col justify-center items-center gap-5"
      ref={container}
    >
      {/* Background */}
      <SvgSection5Bg className="absolute w-full h-full z-10" />
      {/* Section content */}
      <motion.div
        initial={{
          opacity: 0,
          x: -100,
        }}
        variants={variants}
        animate={isInView ? "visible" : "hidden"}
        className="w-full z-20 pl-20"
      >
        <SvgSection5Outro className="z-20 mx-[15%]" />
      </motion.div>
      <div className="relative flex flex-row w-full justify-between item-center h-full">
        <SvgBtnFaq className="w-[6%] cursor-pointer z-20" />
        <SvgBtnSayYes
          className="w-[25%] cursor-pointer z-20"
          onClick={() => setIsOpen(true)}
        />
        <SvgBtnHautPage
          className="w-[6%] cursor-pointer z-20"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        />
      </div>
    </div>
  );
}
