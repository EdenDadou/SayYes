import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { specialityList } from "../../components/specialityList";

export default function SpecialityLinesMobile() {
  const container = useRef(null);
  const [isSelected, setIsSelected] = useState("");

  return (
    <div className="w-full flex flex-col z-20">
      {specialityList.map(({ title, list, image }) => (
        <div
          ref={container}
          key={title}
          role="button"
          tabIndex={0}
          className="border-white/30 border-[0.35px] holographic-speciality bg-gradient-gray-400-hover flex flex-col items-start justify-start px-6 h-fit shadow-xl"
          onClick={() => setIsSelected(isSelected === title ? "" : title)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsSelected(isSelected === title ? "" : title);
            }
          }}
        >
          <div className="py-5">
            <img loading="lazy" src={image} alt="speciality" />
          </div>

          <AnimatePresence initial={false}>
            {title === isSelected && (
              <motion.div
                key="list"
                className="flex flex-wrap flex-row gap-x-4 gap-y-3 pb-8 items-center justify-center"
                initial={{ opacity: 0, height: 0, scale: 0.7 }}
                animate={{ opacity: 1, height: 200, scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.7 }} // Pas d'animation à la fermeture
                transition={{ duration: 0.3, ease: "easeIn" }}
              >
                {list.map((item, i) => (
                  <div
                    key={i}
                    className="w-[45%] bg-gradient-gray-400-hover px-4 py-2 flex justify-center items-center rounded-full holographic-border shadow-2xl"
                  >
                    <span className="text-center leading-[140%] tracking-[-0.28px] text-sm font-jakarta holographic-text">
                      {item}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
