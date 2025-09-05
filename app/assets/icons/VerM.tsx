import type { SVGProps } from "react";
const SvgVerM = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={1279}
    height={325}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_f_386_2615)">
      <ellipse
        cx={648}
        cy={315.5}
        rx={741}
        ry={87.4999}
        fill="url(#paint0_linear_386_2615)"
        fillOpacity={0.8}
      />
    </g>
    <defs>
      <filter
        id="filter0_f_386_2615"
        x={-320.3}
        y={0.699997}
        width={1936.6}
        height={629.6}
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
          stdDeviation={113.65}
          result="effect1_foregroundBlur_386_2615"
        />
      </filter>
      <linearGradient
        id="paint0_linear_386_2615"
        x1={1177.56}
        y1={325.599}
        x2={190.697}
        y2={768.945}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.115385} stopColor="#B481FF" stopOpacity={0.6} />
        <stop offset={0.394231} stopColor="#B0F5FF" stopOpacity={0.8} />
        <stop offset={0.658654} stopColor="#B0F5FF" stopOpacity={0.8} />
        <stop offset={0.894231} stopColor="#E1FF8B" stopOpacity={0.4} />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgVerM;
