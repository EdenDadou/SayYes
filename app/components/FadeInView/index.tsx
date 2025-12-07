import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface FadeInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  threshold?: number;
}

export default function FadeInView({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  y = 40,
  once = true,
  threshold = 0.1,
}: FadeInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold, margin: "100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
