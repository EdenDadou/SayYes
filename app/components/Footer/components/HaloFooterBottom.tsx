import type { SVGProps } from "react";
const HaloFooterBottom = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 1191 97"
    aria-hidden="true"
    {...props}
  >
    <g filter="url(#a)">
      <ellipse cx={595.5} cy={97} fill="url(#b)" rx={552.5} ry={54} />
    </g>
    <defs>
      <radialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(552.5 0 0 54 595.5 97)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B0F5FF" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </radialGradient>
      <filter
        id="a"
        width={1189.79}
        height={192.789}
        x={0.606}
        y={0.606}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_557_7087"
          stdDeviation={21.197}
        />
      </filter>
    </defs>
  </svg>
);
export default HaloFooterBottom;
