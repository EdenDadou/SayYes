import { motion } from "framer-motion";
import type { BlocMethods } from "~/types/landing-page";
import AnimatedTitle from "./AnimatedTitle";
import Card from "../Card";
import Coche from "~/assets/icons/Coche";

interface BlocMethodsFrontProps {
  bloc: BlocMethods;
  color: string;
}

export default function BlocMethodsFront({
  bloc,
  color,
}: BlocMethodsFrontProps) {
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Subtitle */}
      {bloc.subTitle && (
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
      )}

      {/* Title */}
      {bloc.lineTitle && bloc.lineTitle.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <AnimatedTitle lines={bloc.lineTitle} color={color} />
        </motion.div>
      )}

      {/* Method cards */}
      <div className="max-w-[988px] mx-auto space-y-8">
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
            <Card
              height="476px"
              borderClass="light-border p-2 rounded-[26px] bg-white/5"
              content={
                <div className="relative rounded-[18px] overflow-hidden h-full p-14 w-full">
                  {/* Background image */}
                  {card.media && card.media.url && (
                    <div className="absolute inset-0">
                      {card.media.type === "video" ? (
                        <video
                          src={card.media.url}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={card.media.url}
                          alt={card.media.alt || card.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent" />
                    </div>
                  )}

                  {/* Content overlay */}
                  <div className="relative z-10 p-8 h-[350px] flex flex-col justify-center w-[315px] bg-white/10 backdrop-blur-md rounded-[16px]">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4">
                      {card.icons && card.icons[0] ? (
                        <span className="text-white text-xl">
                          {card.icons[0]}
                        </span>
                      ) : (
                        <span className="text-white text-xl">◆</span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-white text-[42px] font-bold mb-4 tracking-[-2px]"
                      style={{ fontFamily: "Jakarta Bold" }}
                    >
                      {card.title}
                    </h3>

                    {/* Lines */}
                    <ul className="space-y-2">
                      {card.lines.map((line, lineIndex) => (
                        <li key={lineIndex} className="flex items-center gap-2">
                          <Coche />
                          <span
                            className="text-white/80"
                            style={{ fontFamily: "Jakarta" }}
                          >
                            {line}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Bottom accent line */}
                    <div className="mt-6 w-16 h-0.5 rounded-full bg-white" />
                  </div>
                </div>
              }
            />
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
          className="text-center mt-12"
        >
          <p
            className="text-lg md:text-xl"
            style={{
              fontFamily: "Jakarta",
              color: bloc.conclusion.colorType === "color" ? color : "white",
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
        </motion.div>
      )}
    </section>
  );
}
