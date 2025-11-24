import { memo } from "react";

export const MemoCard = memo(({ src }: { src: string }) => (
  <img loading="lazy" src={src} alt="card" className="w-[80vw]" />
));
MemoCard.displayName = "MemoCard";
