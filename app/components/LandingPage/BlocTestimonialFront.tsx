import { motion } from "framer-motion";
import type { BlocTestimonial } from "~/types/landing-page";

interface BlocTestimonialFrontProps {
  bloc: BlocTestimonial;
  color: string;
}

export default function BlocTestimonialFront({ bloc, color }: BlocTestimonialFrontProps) {
  return (
    <section className="relative py-20 px-4 bg-black overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 blur-[120px] rounded-full"
        style={{ background: `radial-gradient(ellipse, ${color}, transparent)` }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Quote icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <span className="text-6xl" style={{ color }}>❝</span>
        </motion.div>

        {/* Title/Quote */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-relaxed mb-8"
          style={{ fontFamily: "Jakarta" }}
        >
          {bloc.title}
        </motion.h2>

        {/* Conclusion/Author */}
        {bloc.conclusion && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60"
            style={{ fontFamily: "Jakarta Semi Bold" }}
          >
            — {bloc.conclusion}
          </motion.p>
        )}

        {/* Decorative stars */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex justify-center gap-2"
        >
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ color }} className="text-xl">★</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
