import { memo, type SVGProps, type CSSProperties } from "react";
import { useViewport } from "~/utils/hooks/useViewport";

// Styles pour l'optimisation GPU sur mobile
const gpuOptimizedStyle: CSSProperties = {
  willChange: "transform",
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  contain: "layout paint",
  pointerEvents: "none",
};

interface BackgroundProject1Props extends SVGProps<SVGSVGElement> {
  isMobile?: boolean;
}

const BackgroundProject1 = memo(function BackgroundProject1(
  props: BackgroundProject1Props
) {
  const { isMobile: _deprecatedIsMobileProp, ...svgProps } = props;
  const isMobile = useViewport();

  // Fonction pour calculer une couleur plus sombre basée sur la couleur principale
  const getDarkerColor = (baseColor: string) => {
    if (!baseColor) return "#0A2A62";

    const hex = baseColor.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const newR = Math.round(r * 0.56);
    const newG = Math.round(g * 0.49);
    const newB = Math.round(b * 0.48);

    const toHex = (n: number) => n.toString(16).padStart(2, "0");
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
  };

  const baseColor = svgProps.fill || "#1255CB";
  const darkerColor = getDarkerColor(baseColor);

  // Styles de blur CSS (utilisés pour desktop et mobile)
  const getBlurStyle = (blurValue: number): CSSProperties => ({
    filter: `blur(${blurValue}px)`,
    WebkitFilter: `blur(${blurValue}px)`,
    willChange: "filter",
    transform: "translateZ(0)",
    WebkitTransform: "translateZ(0)",
    isolation: "isolate" as const,
  });

  const blurScale = 1;
  const blur = (value: number) => getBlurStyle(value * blurScale);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1280 1044"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      style={{ ...gpuOptimizedStyle, ...svgProps.style }}
      {...svgProps}
    >
      {/* <g mask="url(#bg1-c)" filter={isMobile ? "url(#bg1-d)" : undefined}>
        <ellipse
          cx={152.646}
          cy={781.921}
          fill={svgProps.fill || "#1255CB"}
          rx={152.646}
          ry={781.921}
          transform="matrix(-.52678 .85 .7861 .61811 -356.828 -9.07)"
          style={!isMobile ? blur(274.777) : undefined}
        />
      </g>
      <g
        filter={isMobile ? "url(#bg1-e)" : undefined}
        style={!isMobile ? blur(43.65) : undefined}
      >
        <path
          fill={darkerColor}
          d="M-226.515 218.584c25.703-198.081 165.722 225.868 811.554 387.791 530.061 151.46 921.211-144.56 895.511 53.521S1101.82 1376.83 513.081 1227.6-252.218 416.666-226.515 218.584"
        />
      </g>
      <g
        filter={isMobile ? "url(#bg1-f)" : undefined}
        style={!isMobile ? blur(68.65) : undefined}
      >
        <path
          fill={svgProps.fill || "#1255CB"}
          d="M-227.445 310.023c27.367-210.9 164.227 237.387 810.074 399.198 529.921 152.532 924.281-168.247 896.921 42.654-27.37 210.9-385.34 767.865-974.078 618.635-588.74-149.23-760.283-849.587-732.917-1060.487"
        />
      </g> */}
      <g
        filter={isMobile ? "url(#bg1-g)" : undefined}
        style={!isMobile ? blur(43.65) : undefined}
      >
        <path
          fill="#fff"
          d="M-382.81 885.501c12.557-270.696 393.198-114.418 905.36-71.661 512.16 42.756 961.9-44.201 949.34 226.49-12.55 270.7-437.92 455.48-950.085 412.73C9.642 1410.3-395.368 1156.2-382.81 885.501"
        />
      </g>
      <g
        filter={isMobile ? "url(#bg1-h)" : undefined}
        style={!isMobile ? blur(54.917) : undefined}
      >
        <ellipse
          cx={732.708}
          cy={190.536}
          fill="url(#bg1-i)"
          rx={732.708}
          ry={190.536}
          transform="matrix(-.81582 .5783 .60034 .79975 1540.98 -633.949)"
        />
      </g>
      <g
        filter={isMobile ? "url(#bg1-j)" : undefined}
        style={!isMobile ? blur(19.221) : undefined}
      >
        <ellipse
          cx={706.052}
          cy={41.396}
          fill="url(#bg1-k)"
          rx={706.052}
          ry={41.396}
          transform="matrix(-.81582 .5783 .60034 .79975 1835.73 -660.531)"
        />
      </g>
      <g
        filter={isMobile ? "url(#bg1-l)" : undefined}
        style={!isMobile ? blur(15) : undefined}
      >
        <ellipse
          cx={729.285}
          cy={191.517}
          fill="url(#bg1-m)"
          rx={729.285}
          ry={191.517}
          transform="matrix(-.72914 .68437 .71336 .7008 1585.5 -693.998)"
        />
      </g>
      <g
        filter={isMobile ? "url(#bg1-n)" : undefined}
        style={!isMobile ? blur(19.221) : undefined}
      >
        <ellipse
          cx={702.752}
          cy={24.468}
          fill="url(#bg1-o)"
          rx={702.752}
          ry={24.468}
          transform="matrix(-.72914 .68437 .71336 .7008 1671.87 -600.162)"
        />
      </g>
      <defs>
        {isMobile && (
          <>
            <filter
              id="bg1-d"
              width={2339.05}
              height={2100.21}
              x={-992.101}
              y={-446.113}
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                result="effect1"
                stdDeviation={274.777 * blurScale}
              />
            </filter>
            <filter
              id="bg1-e"
              width={1885.26}
              height={1261.87}
              x={-316.214}
              y={79.613}
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                result="effect1"
                stdDeviation={43.65 * blurScale}
              />
            </filter>
            <filter
              id="bg1-f"
              width={1985.69}
              height={1415.51}
              x={-367.503}
              y={117.367}
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                result="effect1"
                stdDeviation={68.65 * blurScale}
              />
            </filter>
            <filter
              id="bg1-g"
              width={2029.84}
              height={903.678}
              x={-470.394}
              y={642.827}
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                result="effect1"
                stdDeviation={43.65 * blurScale}
              />
            </filter>
            <filter
              id="bg1-h"
              width={1437.1}
              height={1120.51}
              x={339.06}
              y={-618.092}
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                result="effect1"
                stdDeviation={54.917 * blurScale}
              />
            </filter>
            <filter
              id="bg1-j"
              width={1230}
              height={896.237}
              x={669.574}
              y={-667.229}
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                result="effect1"
                stdDeviation={19.221 * blurScale}
              />
            </filter>
            <filter
              id="bg1-l"
              width={1158.3}
              height={1093.91}
              x={611.223}
              y={-607.643}
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur result="effect1" stdDeviation={15 * blurScale} />
            </filter>
            <filter
              id="bg1-n"
              width={1102.3}
              height={1039.38}
              x={625.773}
              y={-621.768}
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                result="effect1"
                stdDeviation={19.221 * blurScale}
              />
            </filter>
          </>
        )}
        <radialGradient
          id="bg1-i"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(732.708 0 0 190.536 732.708 190.536)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={svgProps.fill || "#1255CB"} />
          <stop
            offset={1}
            stopColor={svgProps.fill || "#1255CB"}
            stopOpacity={0}
          />
        </radialGradient>
        <radialGradient
          id="bg1-k"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(706.052 0 0 41.3956 706.052 41.396)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </radialGradient>
        <radialGradient
          id="bg1-m"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(729.285 0 0 191.517 729.285 191.517)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.212} stopColor={svgProps.fill || "#1255CB"} />
          <stop
            offset={1}
            stopColor={svgProps.fill || "#1255CB"}
            stopOpacity={0}
          />
        </radialGradient>
        <radialGradient
          id="bg1-o"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(702.752 0 0 24.4682 702.752 24.468)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </radialGradient>
        <clipPath id="bg1-a">
          <path fill="#fff" d="M0 0h1280v1044H0z" />
        </clipPath>
        <clipPath id="bg1-b">
          <path fill="#fff" d="M.188 0h1280v729H.188z" />
        </clipPath>
      </defs>
    </svg>
  );
});

export default BackgroundProject1;
