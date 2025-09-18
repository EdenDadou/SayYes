import { BentoItem } from "~/server/portfolio.server";
import "~/styles/tailwind.css";
export default function Bento({ bento }: { bento: BentoItem }) {
  return bento.lines.map((line, lineIndex) => (
    <div
      key={lineIndex}
      className={`grid gap-4 ${
        line.format === "1/3 - 2/3"
          ? "grid-cols-5"
          : line.format === "3 carrés"
            ? "grid-cols-3"
            : line.format === "2 carré"
              ? "grid-cols-2"
              : line.format === "banner"
                ? "grid-cols-1"
                : "grid-cols-1"
      }`}
    >
      {line.listImage.map((image, imageIndex) => (
        <div
          key={imageIndex}
          className={`relative rounded-3xl h-[full] overflow-hidden ${
            line.format === "1/3 - 2/3" && imageIndex === 1
              ? "col-span-3 h-[468px] rounded-3xl"
              : line.format === "1/3 - 2/3"
                ? "col-span-2 h-[468px] rounded-3xl"
                : line.format === "banner"
                  ? "aspect-[21/9]"
                  : line.format === "3 carrés"
                    ? "grid-cols-3"
                    : line.format === "2 carré"
                      ? "grid-cols-2"
                      : line.format === "full"
                        ? "h-[560px] w-full"
                        : "aspect-square"
          }`}
        >
          <img
            src={image}
            alt={`Image ${imageIndex + 1}`}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}
    </div>
  ));
}
