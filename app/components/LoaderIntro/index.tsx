import { motion } from "framer-motion";

export default function LoaderIntro() {
  return (
    <div className={`absolute w-full h-screen top-0 left-0 right-0 z-50`}>
      <div className="absolute inset-0">
        <motion.video
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 6.8 }}
          className={`w-full h-screen object-cover`}
          autoPlay
          muted
        >
          <source src="./video/intro.mp4" type="video/mp4" />
        </motion.video>
      </div>
    </div>
  );
}
