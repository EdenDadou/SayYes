import { motion } from "framer-motion";
import type { BlocMethods } from "~/types/landing-page";
import AnimatedTitle from "./AnimatedTitle";
import Card from "../Card";

interface BlocMethodsFrontProps {
  bloc: BlocMethods;
  color: string;
}

export default function BlocMethodsFront({
  bloc,
  color,
}: BlocMethodsFrontProps) {
  return (
    <section className="relative py-20 px-4 bg-black overflow-hidden">
      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-4"
      >
        <span
          className="text-white/50 text-sm tracking-widest"
          style={{ fontFamily: "Jakarta" }}
        >
          ✦ {bloc.subTitle} ✦
        </span>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <AnimatedTitle lines={bloc.lineTitle} color={color} />
      </motion.div>

      <Card
        height="auto"
        borderClass="light-border p-2"
        content={
          <div className="space-y-6">
            {/* Method cards */}
            <div className="grid grid-cols-4 gap-2 w-full">
              {bloc.cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Card with image background */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 h-full">
                    {/* Background image */}
                    {card.media && card.media.url && (
                      <div className="absolute inset-0">
                        <img
                          src={card.media.url}
                          alt={card.media.alt || card.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Content overlay */}
                    <div className="relative z-10 p-8 h-fit flex flex-col justify-end  max-w-md">
                      {/* Title */}
                      <h3 className="text-white text-[21px] font-jakarta-semi-bold leading-[23px]">
                        {card.title}
                      </h3>

                      {/* Bottom accent line */}
                      <div className="h-[3px] md:w-24 w-20 holographic-bg rounded-full mt-8" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Conclusion */}
            {bloc.conclusion && bloc.conclusion.elements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/10 h-full">
                  <img
                    src="images/landingpage/bgCardMethod.png"
                    className="w-full h-full object-cover absolute inset-0 z-0"
                  />
                  <p
                    className="relative text-lg md:text-xl z-10 p-4"
                    style={{
                      fontFamily: "Jakarta",
                      color:
                        bloc.conclusion.colorType === "color" ? color : "white",
                    }}
                  >
                    {bloc.conclusion.elements.map((elem, i) =>
                      elem.type === "icon" ? (
                        <span key={i} className="mx-1">
                          {elem.name}
                        </span>
                      ) : (
                        <span key={i}>{elem.text}</span>
                      )
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        }
      />
    </section>
  );
}
