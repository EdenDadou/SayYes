import { motion } from "framer-motion";
import type { BlocIntro } from "~/types/landing-page";
import AnimatedTitle from "./AnimatedTitle";
import ChatBuble from "../Header/assets/ChatBuble";

interface BlocIntroFrontProps {
  bloc: BlocIntro;
  color: string;
}

export default function BlocIntroFront({ bloc, color }: BlocIntroFrontProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Punchline top bar */}
      {bloc.punchline && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-20 text-center justify-center flex flex-col items-center"
        >
          <div className="h-[3px] md:w-24 w-20 holographic-bg rounded-full my-8" />
          <div className="inline-block px-6 py-2">
            <span className="text-[#777A88] text-[20px] font-jakarta">
              {bloc.punchline}
            </span>
          </div>
        </motion.div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-8 pb-16">
        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatedTitle lines={bloc.lineTitle} color={color} />
        </motion.div>

        {/* Description */}
        {bloc.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-center text-white text-[20px] leading-[28px] max-w-xl"
            style={{ fontFamily: "Jakarta" }}
          >
            {bloc.description}
          </motion.p>
        )}

        {/* CTA Button */}
        {bloc.cta && (
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all group"
          >
            <ChatBuble color="white" />
            <span
              className="text-white font-medium"
              style={{ fontFamily: "Jakarta Semi Bold" }}
            >
              {bloc.cta}
            </span>
          </motion.a>
        )}

        {/* Tags / Brand banner */}
        {bloc.tags && bloc.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 w-full overflow-hidden"
          >
            <div className="flex items-center justify-center gap-8 flex-wrap px-4">
              {bloc.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-white/60 text-sm md:text-base tracking-wide whitespace-nowrap"
                  style={{ fontFamily: "Jakarta" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Media (image/video grid) */}
        {bloc.media && bloc.media.url && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 w-full max-w-6xl px-4"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {bloc.media.type === "video" ? (
                <video
                  src={bloc.media.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto"
                />
              ) : (
                <img
                  src={bloc.media.url}
                  alt={bloc.media.alt || bloc.altTitle || "Hero image"}
                  className="w-full h-auto"
                />
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
