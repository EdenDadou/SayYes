import type { SVGProps } from "react";
const MasqueMobile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 334 498"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <g clipPath="url(#clip0_819_1465)">
      <g clipPath="url(#clip1_819_1465)">
        <rect y={298} width={334} height={232} fill="black" />
        <g filter="url(#filter0_f_819_1465)">
          <path
            d="M-72.3686 523.416C-74.3161 425.339 22.9062 470.274 150.591 470.274C278.276 470.274 388.071 425.339 390.019 523.416C391.966 621.493 290.036 701 162.351 701C34.6666 701 -70.4211 621.493 -72.3686 523.416Z"
            fill="url(#paint0_linear_819_1465)"
          />
        </g>
        <rect
          y={298}
          width={210}
          height={334}
          transform="rotate(-90 0 298)"
          fill="url(#paint1_linear_819_1465)"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_f_819_1465"
        x={-399.697}
        y={132.7}
        width={1117.04}
        height={895.6}
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
          stdDeviation={163.65}
          result="effect1_foregroundBlur_819_1465"
        />
      </filter>
      <linearGradient
        id="paint0_linear_819_1465"
        x1={-65.7553}
        y1={579.52}
        x2={357.521}
        y2={521.942}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B481FF" stopOpacity={0.7} />
        <stop offset={0.990398} stopColor="#B0F5FF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_819_1465"
        x1={210}
        y1={465}
        x2={-0.0000173524}
        y2={465}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopOpacity={0} />
        <stop offset={1} />
      </linearGradient>
      <clipPath id="clip0_819_1465">
        <rect
          width={528}
          height={334}
          fill="white"
          transform="translate(0 528) rotate(-90)"
        />
      </clipPath>
      <clipPath id="clip1_819_1465">
        <rect
          width={658.817}
          height={342.67}
          fill="white"
          transform="translate(-6.36523 533.305) rotate(-90)"
        />
      </clipPath>
    </defs>
  </svg>
);
export default MasqueMobile;
