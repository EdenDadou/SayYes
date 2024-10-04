import * as React from "react";
import type { SVGProps } from "react";
const SvgHalo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={653}
    height={756}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity={0.15} filter="url(#filter0_f_3059_7720)">
      <ellipse
        cx={326.578}
        cy={377.92}
        rx={170.946}
        ry={275.345}
        transform="rotate(-29.9484 326.578 377.92)"
        fill="url(#paint0_linear_3059_7720)"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_3059_7720"
        x={0.502197}
        y={0.466797}
        width={652.151}
        height={754.904}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation={62}
          result="effect1_foregroundBlur_3059_7720"
        />
      </filter>
      <linearGradient
        id="paint0_linear_3059_7720"
        x1={293.691}
        y1={87.2666}
        x2={682.965}
        y2={431.101}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.0259698} stopColor="#E0FE8C" />
        <stop offset={0.414544} stopColor="#DCC4FF" />
        <stop offset={0.663403} stopColor="#B3F1FF" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgHalo;
