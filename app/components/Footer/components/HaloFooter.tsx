import type { SVGProps } from "react";
const HaloFooter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 1279 325"
    aria-hidden="true"
    {...props}
  >
    <g filter="url(#a)">
      <ellipse
        cx={648}
        cy={315.5}
        fill="url(#b)"
        fillOpacity={0.8}
        rx={741}
        ry={87.5}
      />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1={1177.56}
        x2={190.697}
        y1={325.599}
        y2={768.945}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.115} stopColor="#B481FF" stopOpacity={0.6} />
        <stop offset={0.394} stopColor="#B0F5FF" stopOpacity={0.8} />
        <stop offset={0.659} stopColor="#B0F5FF" stopOpacity={0.8} />
        <stop offset={0.894} stopColor="#E1FF8B" stopOpacity={0.4} />
      </linearGradient>
      <filter
        id="a"
        width={1936.6}
        height={629.6}
        x={-320.3}
        y={0.7}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_557_7086"
          stdDeviation={113.65}
        />
      </filter>
    </defs>
  </svg>
);
export default HaloFooter;
