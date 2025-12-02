import { motion } from "framer-motion";
import type { BlocFooter } from "~/types/landing-page";
import AnimatedTitle from "./AnimatedTitle";

interface BlocFooterFrontProps {
  bloc: BlocFooter;
  color: string;
}

export default function BlocFooterFront({ bloc, color }: BlocFooterFrontProps) {
  return (
    <section className="relative py-24 px-4 bg-black overflow-hidden" id="contact">
      {/* Halo effect */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 blur-[100px] rounded-full"
        style={{ background: `radial-gradient(ellipse, ${color}, transparent)` }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Animated Title */}
        {bloc.lineTitle && bloc.lineTitle.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <AnimatedTitle lines={bloc.lineTitle} color={color} />
          </motion.div>
        )}

        {/* Subtitle */}
        {bloc.subTitle && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg md:text-xl mb-10"
            style={{ fontFamily: "Jakarta" }}
          >
            {bloc.subTitle}
          </motion.p>
        )}

        {/* CTA Button */}
        {bloc.cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-white text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: color,
                fontFamily: "Jakarta Semi Bold",
                boxShadow: `0 0 40px ${color}40`,
              }}
            >
              {bloc.cta}
              <span className="text-xl">→</span>
            </a>
          </motion.div>
        )}

        {/* Decorative bottom element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex justify-center items-center gap-4"
        >
          <div className="w-20 h-px bg-white/20" />
          <span className="text-white/40">✦</span>
          <div className="w-20 h-px bg-white/20" />
        </motion.div>
      </div>
    </section>
  );
}
