import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BlocFAQ } from "~/types/landing-page";
import AnimatedTitle from "./AnimatedTitle";

interface BlocFAQFrontProps {
  bloc: BlocFAQ;
  color: string;
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  color,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm border"
            style={{
              borderColor: color,
              color: color,
            }}
          >
            →
          </span>
          <span className="text-white font-medium" style={{ fontFamily: "Jakarta Semi Bold" }}>
            {question}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              <div className="pl-11">
                <p className="text-white/70 leading-relaxed" style={{ fontFamily: "Jakarta" }}>
                  {answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function BlocFAQFront({ bloc, color }: BlocFAQFrontProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 px-4 bg-black overflow-hidden">
      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-4"
      >
        <span className="text-white/50 text-sm tracking-widest" style={{ fontFamily: "Jakarta" }}>
          ✦ FAQ ✦
        </span>
      </motion.div>

      {/* Title */}
      {bloc.lineTitle && bloc.lineTitle.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <AnimatedTitle lines={bloc.lineTitle} color={color} />
        </motion.div>
      )}

      {/* FAQ items */}
      <div className="max-w-3xl mx-auto space-y-3">
        {bloc.blocs.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            color={color}
          />
        ))}
      </div>
    </section>
  );
}
