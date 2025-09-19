import { motion } from "framer-motion";

interface PhotoMainProps {
  photo: string;
  title: string;
  className?: string;
}

export default function PhotoMain({
  photo,
  title,
  className = "",
}: PhotoMainProps) {
  // If no photo, don't render anything
  if (!photo) {
    return null;
  }

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden h-[650px] ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-full"
      >
        <img
          src={photo}
          alt={`${title} - Photo principale`}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      </motion.div>

      {/* Optional overlay with title */}
      <div className="absolute bottom-6 left-6 right-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-black/20 backdrop-blur-sm rounded-lg p-4"
        >
          <h3 className="text-white font-jakarta-medium text-lg">{title}</h3>
        </motion.div>
      </div>
    </div>
  );
}
