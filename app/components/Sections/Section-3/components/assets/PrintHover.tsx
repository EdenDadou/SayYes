import type { SVGProps } from "react";
const SvgPrintHover = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={100}
    height={100}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_di_2994_5555)">
      <path
        d="M62.9988 32.4554H58.0008V27.0487C58.0008 26.4728 57.5498 26 57.0004 26H34.9996C34.4502 26 33.9992 26.4728 33.9992 27.0487V32.4554H29.0012C27.3489 32.4554 26 33.8693 26 35.6014V54.4689C26 56.2009 27.3489 57.6149 29.0012 57.6149H33.9992V64.9513C33.9992 65.5272 34.4502 66 34.9996 66H57.0004C57.5498 66 58.0008 65.5272 58.0008 64.9513V57.6149H62.9988C64.6511 57.6149 66 56.2009 66 54.4689V35.5971C66 33.865 64.6511 32.4511 62.9988 32.4511V32.4554ZM52.9988 37.6944C52.9988 37.1185 53.4498 36.6458 53.9992 36.6458C54.5486 36.6458 54.9996 37.1185 54.9996 37.6944C54.9996 38.2703 54.5486 38.7431 53.9992 38.7431C53.4498 38.7431 52.9988 38.2703 52.9988 37.6944ZM36 28.0973H56V32.4554H36V28.0973ZM56 63.9027H36V51.1682H56V63.9027ZM60.8011 38.7431H57.9516C57.4022 38.7431 56.9512 38.2703 56.9512 37.6944C56.9512 37.1185 57.4022 36.6458 57.9516 36.6458H60.8011C61.3506 36.6458 61.8016 37.1185 61.8016 37.6944C61.8016 38.2703 61.3506 38.7431 60.8011 38.7431ZM38.0008 55.5176C38.0008 54.9417 38.4518 54.4689 39.0012 54.4689H53.0029C53.5523 54.4689 54.0033 54.9417 54.0033 55.5176C54.0033 56.0935 53.5523 56.5662 53.0029 56.5662H39.0012C38.4518 56.5662 38.0008 56.0935 38.0008 55.5176ZM38.0008 59.708C38.0008 59.132 38.4518 58.6593 39.0012 58.6593H53.0029C53.5523 58.6593 54.0033 59.132 54.0033 59.708C54.0033 60.2839 53.5523 60.7566 53.0029 60.7566H39.0012C38.4518 60.7566 38.0008 60.2839 38.0008 59.708Z"
        fill="url(#holographicGradient)"
      />
    </g>
    <defs>
      <filter
        id="filter0_di_2994_5555"
        x={0}
        y={0}
        width={100}
        height={100}
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
          result="effect1_dropShadow_2994_5555"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2994_5555"
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
          result="effect2_innerShadow_2994_5555"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgPrintHover;
