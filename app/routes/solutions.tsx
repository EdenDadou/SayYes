import Card from "~/components/Card";
import { solutionsCards } from "~/components/Solutions/data";
import { useViewport } from "~/utils/hooks/useViewport";
import SolutionTitleMobile from "~/components/Solutions/components/SolutionTitleMobile";
import Star from "~/assets/icons/Star";
import Desktoplayout from "~/components/Layout/Desktop";
import BackgroundMobile from "~/assets/icons/BackgroundMobile";
import Background from "~/assets/icons/Background";
import MobileLayout from "~/components/Layout/Mobile";
import "~/styles/tailwind.css";
import SolutionTitle from "~/components/Solutions/components/SolutionTitle";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

export default function Solutions() {
  const isMobile = useViewport();

  return isMobile ? (
    <MobileLayout>
      <BackgroundMobile className="absolute top-0 left-0 w-full h-auto z-0 opacity-80" />
      <section className="relative z-10 px-6 flex flex-col gap-6 justify-center items-center">
        <div className="h-[3px] w-20 holographic-bg my-6 rounded-full" />
        <SolutionTitleMobile />
        <h2 className="flex flex-row items-center justify-start gap-2 text-sm font-jakarta pb-6">
          <Star className="w-4 h-4" />5 étapes pour un branding impeccable
          <Star className="w-4 h-4" />
        </h2>
        {solutionsCards.map((card, index) => (
          <Card
            key={index}
            height={card.height}
            content={card.content}
            borderClass={card.borderClass}
          />
        ))}
      </section>
    </MobileLayout>
  ) : (
    <Desktoplayout>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2 }}
        >
          <Background className="absolute -top-40 left-0 w-full h-auto z-0 opacity-80" />
        </motion.div>
      </AnimatePresence>
      <section className="relative z-10 w-[988px] mx-auto flex flex-col gap-14 justify-center items-start pt-20 mb-10">
        <SolutionTitle />
        {solutionsCards.map((card, index) => (
          <Card
            key={index}
            height={card.height}
            content={card.content}
            borderClass={card.borderClass}
          />
        ))}
      </section>
    </Desktoplayout>
  );
}
