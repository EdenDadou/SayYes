import type { SVGProps } from "react";
const SvgHalo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={590}
    height={785}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity={0.1} filter="url(#filter0_f_2993_3360)">
      <ellipse
        cx={209.972}
        cy={325.254}
        rx={209.972}
        ry={325.254}
        transform="matrix(-0.866476 -0.499219 -0.499219 0.866476 712.618 182.645)"
        fill="url(#paint0_linear_2993_3360)"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_2993_3360"
        x={0.450684}
        y={-65.1211}
        width={735.717}
        height={849.537}
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
          result="effect1_foregroundBlur_2993_3360"
        />
      </filter>
      <linearGradient
        id="paint0_linear_2993_3360"
        x1={130.95}
        y1={29.8194}
        x2={591.865}
        y2={375.966}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#202020" />
        <stop offset={0.156199} stopColor="#E1FF8B" />
        <stop offset={0.361803} stopColor="#B0F5FF" />
        <stop offset={0.495238} stopColor="#DCC4FF" />
        <stop offset={1} stopColor="#202020" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgHalo;
