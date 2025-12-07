import { memo, type SVGProps, type CSSProperties } from "react";

const gpuOptimizedStyle: CSSProperties = {
  willChange: "transform",
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  contain: "layout paint",
};

interface BackgroundProject3Props extends SVGProps<SVGSVGElement> {
  isMobile?: boolean;
}

const BackgroundProject3 = memo(function BackgroundProject3(props: BackgroundProject3Props) {
  const { isMobile, ...svgProps } = props;

  // Réduire les valeurs de blur sur mobile pour de meilleures performances
  const blurScale = isMobile ? 0.4 : 1;

  return (
    <svg
      viewBox="0 0 1280 1604"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
      style={{ ...gpuOptimizedStyle, ...svgProps.style }}
      {...svgProps}
    >
      <g clipPath="url(#bg3-clip)">
        <rect width="1280" height="1604" fill="#080809" />
        <g filter="url(#bg3-filter)">
          <path
            d="M-968.671 -1.85459C-926.162 -164.435 -633.393 238.77 643.972 560.54C1693.12 840.55 2450.71 697.49 2408.2 860.07C2365.69 1022.65 1692.19 1367.59 527.679 1072.87C-636.83 778.159 -1011.18 160.726 -968.671 -1.85459Z"
            fill={svgProps.fill || "#1255CB"}
          />
        </g>
      </g>
      <defs>
        <filter
          id="bg3-filter"
          x={-1345.95}
          y={-413.178}
          width={4129.94}
          height={1975.29}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={187.04 * blurScale} result="effect1" />
        </filter>
        <clipPath id="bg3-clip">
          <rect width={1281} height={1710} fill="white" transform="translate(0 -162)" />
        </clipPath>
      </defs>
    </svg>
  );
});

export default BackgroundProject3;
