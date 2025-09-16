import type { SVGProps } from "react";
const Background = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="auto"
    fill="none"
    viewBox="0 0 1280 908"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    {...props}
  >
    <g clipPath="url(#a)">
      <g filter="url(#b)">
        <path
          fill="url(#c)"
          d="M309.333 0H0v1093.33h1278V649C788.933 792.733 428.444 276.222 309.333 0"
        />
      </g>
      <g filter="url(#d)">
        <path
          fill="url(#holographicGradient)"
          d="M1440.31 610.96C906.57 793.628 289.901 610.771-25.191 377.632c-5.327-3.941-12.809-.074-12.809 6.552V1091c0 4.42 3.582 8 8 8h1473c4.42 0 8-3.58 8-8V618.547c0-5.518-5.47-9.373-10.69-7.587"
        />
      </g>
      <g filter="url(#f)">
        <path
          fill="url(#g)"
          d="M-168.865 477.466c.149-210.525 191.309 212.255 845.887 289.294C1216.61 849.375 1563.15 484.48 1563 695.004c-.15 210.525-281.03 802.686-877.95 730.766-596.917-71.92-854.063-737.78-853.915-948.304"
        />
      </g>
      <g filter="url(#h)">
        <path
          fill="black"
          d="M1450.5 859.5C571.5 859.5 408 801.5-90 709v476h1554.77z"
        />
      </g>
    </g>
    <defs>
      <filter
        id="b"
        width={2377.11}
        height={2192.44}
        x={-549.553}
        y={-549.553}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_791_1000"
          stdDeviation={274.777}
        />
      </filter>
      <filter
        id="d"
        width={1689}
        height={922.953}
        x={-138}
        y={276.047}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_791_1000"
          stdDeviation={50}
        />
      </filter>
      <filter
        id="f"
        width={2003.7}
        height={1284.33}
        x={-304.781}
        y={283.377}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_791_1000"
          stdDeviation={67.958}
        />
      </filter>
      <filter
        id="h"
        width={1754.77}
        height={676}
        x={-190}
        y={609}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_791_1000"
          stdDeviation={50}
        />
      </filter>
      <linearGradient
        id="c"
        x1={-47.5}
        x2={198.5}
        y1={324.5}
        y2={245.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4034EB" />
        <stop offset={1} />
      </linearGradient>
      <linearGradient
        id="e"
        x1={-336}
        x2={3353}
        y1={331}
        y2={1004}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4FFFF5" />
        <stop offset={0.002} stopColor="#BAB3DD" />
        <stop offset={0.218} stopColor="#B7EEEF" />
        <stop offset={0.539} stopColor="#E6FF9C" />
        <stop offset={0.573} stopColor="#fff" />
        <stop offset={0.803} stopColor="#FEAB71" />
        <stop offset={1} stopColor="#FE77B7" />
      </linearGradient>
      <linearGradient
        id="g"
        x1={697.114}
        x2={589.431}
        y1={520.532}
        y2={1414.25}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9671E1" />
        <stop offset={0.573} stopColor="#010101" />
      </linearGradient>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h1280v908H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default Background;
