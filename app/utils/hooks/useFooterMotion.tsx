import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { useViewport } from "./useViewport";

export const useFooterMotion = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  const scrollConfig: {
    target: React.RefObject<HTMLDivElement>;
    offset: any;
  } = {
    target: footerRef,
    offset: ["350px end", "end end"],
  };

  const { scrollYProgress } = useScroll(scrollConfig);

  // Transformer le scroll progress en opacité
  // 0 = footer pas encore visible, 1 = footer complètement visible
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Opacité réduite pour la deuxième image (20% de l'opacité principale)
  const opacitySecondary = useTransform(scrollYProgress, [0, 1], [0, 1.3]);

  return { footerRef, opacity, opacitySecondary };
};

export default useFooterMotion;
