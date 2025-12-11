import { memo, type SVGProps, type CSSProperties } from "react";

// Styles pour l'optimisation GPU (desktop et mobile)
const gpuOptimizedStyle: CSSProperties = {
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  contain: "layout paint",
  pointerEvents: "none",
};

const BackgroundProject3 = memo(function BackgroundProject3(
  props: SVGProps<SVGSVGElement>
) {
  const svgProps = props;

  // blurScale = 1 pour un rendu identique sur desktop et mobile
  const blurScale = 1;

  return (
    <svg
      viewBox="0 0 1280 1604"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio={svgProps.preserveAspectRatio || "xMidYMid slice"}
      style={{ ...gpuOptimizedStyle, ...svgProps.style }}
      {...svgProps}
    >
      <g clipPath="url(#bg3-clip)">
        <rect width="1280" height="1604" fill="#080809" />
        <g style={{ filter: `blur(${187.04 * blurScale}px)` }}>
          <path
            d="M-968.671 -1.85459C-926.162 -164.435 -633.393 238.77 643.972 560.54C1693.12 840.55 2450.71 697.49 2408.2 860.07C2365.69 1022.65 1692.19 1367.59 527.679 1072.87C-636.83 778.159 -1011.18 160.726 -968.671 -1.85459Z"
            fill={svgProps.fill || "#1255CB"}
          />
        </g>
      </g>
      <defs>
        <clipPath id="bg3-clip">
          <rect
            width={1281}
            height={1710}
            fill="white"
            transform="translate(0 -162)"
          />
        </clipPath>
      </defs>
    </svg>
  );
});

export default BackgroundProject3;
