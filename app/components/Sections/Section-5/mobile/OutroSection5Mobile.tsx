import SvgBtnFaq from "~/components/Sections/Section-5/components/assets/BtnFaq";
import SvgBtnHautPage from "~/components/Sections/Section-5/components/assets/BtnHautPage";
import SvgBtnSayYes from "~/components/Sections/Section-5/components/assets/BtnSayYes";
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

export default function OutroSection5Mobile({ setIsOpen }: Section5Props) {
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: "-100px" });

  return (
    <div
      className="relative w-full flex flex-col justify-center items-center gap-5 mt-20"
      ref={container}
    >
      <motion.div
        initial={{
          opacity: 0,
          x: -100,
        }}
        variants={variants}
        animate={isInView ? "visible" : "hidden"}
        className="w-full z-20"
      >
        <img
          loading="lazy"
          src="images/section5/Outro5.png"
          alt="outro"
          className="w-screen"
        />
      </motion.div>
      <div className="relative flex flex-row w-full justify-between item-center h-full">
        <SvgBtnFaq className="w-1/6 cursor-pointer z-20" />
        <SvgBtnSayYes
          className="w-3/5 cursor-pointer z-20"
          onClick={() => setIsOpen(true)}
        />
        <SvgBtnHautPage
          className="w-1/6 cursor-pointer z-20"
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
