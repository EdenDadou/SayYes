import type { SVGProps } from "react";
const SvgCardBlueLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 140 130"
    {...props}
  >
    <g filter="url(#filter0_i_2994_5462)">
      <path
        d="M70.0568 69.7401L43.0472 97.5548C49.7414 105.086 59.363 109.814 70.0568 109.814C80.7506 109.814 90.3793 105.086 97.0664 97.5548L70.0568 69.7401Z"
        fill="url(#paint0_linear_2994_5462)"
      />
      <path
        d="M140.004 72.0713C140.004 32.2665 108.663 0 70.0074 0C31.3517 0 0.00390625 32.2665 0.00390625 72.0713C0.00390625 91.3673 7.36824 108.884 19.36 121.818L42.9696 97.5112C37.009 90.8008 33.3692 81.8754 33.3692 72.064C33.3692 51.2357 49.7696 34.3508 70.0004 34.3508C90.2312 34.3508 106.632 51.2357 106.632 72.064C106.632 81.8682 102.992 90.8008 97.0312 97.5112L120.641 121.818C132.633 108.884 139.997 91.36 139.997 72.0713H140.004Z"
        fill="url(#paint1_linear_2994_5462)"
      />
    </g>
    <defs>
      <filter
        id="filter0_i_2994_5462"
        x={0.00390625}
        y={0}
        width={140.25}
        height={122.068}
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
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={0.25} dy={0.25} />
        <feGaussianBlur stdDeviation={0.425} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_2994_5462"
        />
      </filter>
      <linearGradient
        id="paint0_linear_2994_5462"
        x1={70}
        y1={70.5}
        x2={68.4297}
        y2={-0.313098}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B0F5FF" />
        <stop offset={1} stopColor="#D8FAFF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_2994_5462"
        x1={70}
        y1={70.5}
        x2={68.4297}
        y2={-0.313098}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B0F5FF" />
        <stop offset={1} stopColor="#D8FAFF" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgCardBlueLogo;
