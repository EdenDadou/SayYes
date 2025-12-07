import { memo, type SVGProps, type CSSProperties } from "react";

const gpuOptimizedStyle: CSSProperties = {
  willChange: "transform",
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  contain: "layout paint",
};

// Styles optimisés pour mobile - force le caching du rendu
const mobileGpuOptimizedStyle: CSSProperties = {
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  contain: "strict",
  contentVisibility: "auto" as CSSProperties["contentVisibility"],
  containIntrinsicSize: "auto 1044px",
  pointerEvents: "none",
};

interface BackgroundProject2Props extends SVGProps<SVGSVGElement> {
  isMobile?: boolean;
}

const BackgroundProject2 = memo(function BackgroundProject2(props: BackgroundProject2Props) {
  const { isMobile, ...svgProps } = props;

  // Réduire les valeurs de blur sur mobile pour de meilleures performances
  const blurScale = isMobile ? 0.4 : 1;
  const baseStyle = isMobile ? mobileGpuOptimizedStyle : gpuOptimizedStyle;

  return (
    <svg
      viewBox="0 0 1280 1044"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...baseStyle, ...svgProps.style }}
      {...svgProps}
    >
      {/* Rectangle de fond blanc */}
      <rect width="1280" height="1044" fill="white" />
      <g clipPath="url(#bg2-clip)">
        <g filter="url(#bg2-filter0)">
          <path
            d="M-226.516 218.585C-200.813 20.5032 -60.7942 444.453 585.038 606.375C1115.1 757.835 1506.25 461.815 1480.55 659.897C1454.84 857.978 1101.82 1376.83 513.08 1227.6C-75.6594 1078.37 -252.219 416.666 -226.516 218.585Z"
            fill={svgProps.fill || "#1255CB"}
          />
        </g>
        <g filter="url(#bg2-filter1)">
          {/* Ce path hérite fill="white" du SVG parent */}
          <path d="M-227.446 310.023C-200.079 99.1226 -63.2192 547.411 582.628 709.222C1112.55 861.753 1506.91 540.975 1479.55 751.875C1452.18 962.775 1094.21 1519.74 505.471 1370.51C-83.2688 1221.28 -254.812 520.923 -227.446 310.023Z" />
        </g>
        <g filter="url(#bg2-filter2)">
          <path
            d="M-382.811 885.501C-370.254 614.806 10.3866 771.084 522.549 813.84C1034.71 856.596 1484.45 769.64 1471.89 1040.34C1459.33 1311.03 1033.97 1495.81 521.804 1453.06C9.64139 1410.3 -395.369 1156.2 -382.811 885.501Z"
            fill="black"
          />
        </g>
      </g>
      <defs>
        <filter
          id="bg2-filter0"
          x={-316.214}
          y={79.6136}
          width={1885.26}
          height={1261.87}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={43.65 * blurScale} result="effect1" />
        </filter>
        <filter
          id="bg2-filter1"
          x={-367.502}
          y={117.367}
          width={1985.69}
          height={1415.51}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={68.65 * blurScale} result="effect1" />
        </filter>
        <filter
          id="bg2-filter2"
          x={-470.396}
          y={642.827}
          width={2029.84}
          height={903.678}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation={43.65 * blurScale} result="effect1" />
        </filter>
        <clipPath id="bg2-clip">
          <rect width={1280} height={1044} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});

export default BackgroundProject2;
