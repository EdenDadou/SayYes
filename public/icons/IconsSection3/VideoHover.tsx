import type { SVGProps } from "react";
const SvgVideoHover = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={100}
    height={88}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_di_2994_5532)">
      <path
        d="M62.8775 27.2868L62.1189 27.1643C51.456 25.6119 40.6246 25.6119 29.9617 27.1643L29.2031 27.2868C27.3487 27.5728 26 29.0843 26 30.8818V49.1017C26 50.8991 27.3487 52.4515 29.2031 52.6966L30.636 52.9009C41.2989 54.4124 52.1725 54.3715 62.8353 52.7375C64.6476 52.4515 65.9963 50.94 65.9963 49.1425V30.9226C66.0806 29.0843 64.7319 27.5319 62.8775 27.2868ZM51.5824 40.9313L43.364 45.9152C42.6054 46.3646 41.636 45.8335 41.636 44.9756V35.0078C41.636 34.1499 42.6054 33.6188 43.364 34.0682L51.5824 39.0521C52.2989 39.5015 52.2989 40.4819 51.5824 40.9313Z"
        fill="url(#holographicGradient)"
      />
    </g>
    <defs>
      <filter
        id="filter0_di_2994_5532"
        x={0}
        y={0}
        width={100}
        height={88}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={4} dy={4} />
        <feGaussianBlur stdDeviation={15} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2994_5532"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2994_5532"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={0.35} />
        <feGaussianBlur stdDeviation={0.25} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_2994_5532"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgVideoHover;
