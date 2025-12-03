import { BentoItem } from "~/server/portfolio.server";
import "~/styles/tailwind.css";

// Fonction pour déterminer si un média est une vidéo
function isVideoFile(url: string): boolean {
  // Utiliser une regex pour vérifier l'extension à la fin de l'URL, avant d'éventuels paramètres
  const isVideo = /\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/i.test(url);
  return isVideo;
}

export default function BentoMobile({ bento }: { bento: BentoItem }) {
  if (!bento || !bento.lines || bento.lines.length === 0) {
    return null;
  }

  return bento.lines
    .filter((bento) => bento.format !== "3 square")
    .map((line, lineIndex) => (
      <div key={lineIndex} className="gap-4 w-full flex flex-col m-auto">
        {line.listImage &&
          line.listImage.map((image, imageIndex) => (
            <div
              key={imageIndex}
              className={`relative rounded-[16px] overflow-hidden ${
                line.format === "1/3 - 2/3"
                  ? `${imageIndex === 1 ? "h-[286px]" : "h-[222px]"} w-full`
                  : line.format === "2/3 - 1/3"
                    ? `${imageIndex === 0 ? "h-[286px]" : "h-[222px]"} w-full`
                    : line.format === "banner"
                      ? "h-[180px] w-full"
                      : line.format === "3 square"
                        ? "w-[319px] h-[319px]"
                        : line.format === "2 square"
                          ? "grid-cols-2"
                          : line.format === "full"
                            ? "h-[620px] w-full"
                            : "aspect-square"
              }`}
            >
              {isVideoFile(image) ? (
                <video
                  src={image}
                  className="w-full h-full object-cover object-center"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  onError={(e) => {
                    console.error("❌ Erreur chargement vidéo:", image);
                  }}
                  onCanPlay={() => {
                    console.log("✅ Vidéo prête:", image);
                  }}
                >
                  Votre navigateur ne prend pas en charge la lecture de vidéos.
                </video>
              ) : (
                <img
                  src={image}
                  alt={
                    line.listImageAlt?.[imageIndex] ||
                    image.split("/").pop()?.split(".")[0] ||
                    `Image ${imageIndex + 1}`
                  }
                  className="w-full h-full object-cover object-center"
                />
              )}
            </div>
          ))}
      </div>
    ));
}
