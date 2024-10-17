import { motion, MotionValue, useTransform } from "framer-motion";

interface AnimatedCardProps {
  card: JSX.Element;
  i: number;
  progress: MotionValue<number>;
}

export const AnimatedCard = ({ card, i, progress }: AnimatedCardProps) => {
  const minScale = 0.8;
  const maxScale = 1.1;

  // Calculate start, middle, and end points for scaling based on index
  const start = Math.max(0, (i - 1) / 5);
  const middle = i / 5;
  const end = Math.min(1, (i + 1) / 5);

  const inputRange = [start, middle, end];
  const outputRange = [minScale, maxScale, minScale];

  const scale = useTransform(progress, inputRange, outputRange);
  return (
    <motion.div
      key={i}
      style={{ scale }}
      className="flex-shrink-0 h-full flex justify-center items-center"
    >
      {card}
    </motion.div>
  );
};
