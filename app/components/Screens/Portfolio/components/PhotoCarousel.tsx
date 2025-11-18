import { motion } from "framer-motion";

interface PhotoCarouselProps {
  photos: string[];
  title: string;
  className?: string;
}

export default function PhotoCarousel({
  photos,
  title,
  className = "",
}: PhotoCarouselProps) {
  // If no photos, don't render anything
  if (!photos || photos.length === 0) {
    return null;
  }

  // Function to create 5 columns of 5 images each
  const createColumnPhotos = (originalPhotos: string[]): string[][] => {
    const targetCount = 25;
    const allPhotos: string[] = [];

    // First, create array of 25 photos (duplicating if necessary)
    for (let i = 0; i < targetCount; i++) {
      allPhotos.push(originalPhotos[i % originalPhotos.length]);
    }

    // Shuffle the photos randomly
    for (let i = allPhotos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allPhotos[i], allPhotos[j]] = [allPhotos[j], allPhotos[i]];
    }

    // Then separate into 5 columns of 5 images each
    const columnArrays: string[][] = [];
    for (let col = 0; col < 5; col++) {
      const column: string[] = [];
      for (let row = 0; row < 5; row++) {
        const index = row * 5 + col; // Get photo by column order
        column.push(allPhotos[index]);
      }
      columnArrays.push(column);
    }

    return columnArrays;
  };

  const columnArrays = createColumnPhotos(photos);

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden h-[650px] ${className}`}
    >
      {/* Animated Columns Container */}
      <div className="flex gap-2 w-[150%] -ml-[25%] h-full">
        {columnArrays.map((column, columnIndex) => (
          <motion.div
            key={columnIndex}
            className="flex-1 flex flex-col gap-2 h-[300%]"
            animate={{
              y: columnIndex % 2 === 0 ? [0, "-50%"] : ["-50%", 0],
            }}
            transition={{
              duration: 20 + columnIndex * 2, // Vitesses différentes pour chaque colonne
              repeat: Infinity,
              ease: "linear", // Animation linéaire pour un scroll continu
              repeatType: "loop",
            }}
          >
            {[...column, ...column].map((photo, photoIndex) => {
              const globalIndex = columnIndex * 5 + photoIndex;
              return (
                <motion.div
                  key={`${columnIndex}-${photoIndex}`}
                  className="relative rounded-lg flex-1 overflow-hidden"
                >
                  <img
                    key={`${columnIndex}-${photoIndex}`}
                    src={photo}
                    alt={`${title} - Photo ${(globalIndex % photos.length) + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
