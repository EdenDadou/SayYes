import type { SVGProps } from "react";
const SvgBtnLinkedin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={70}
    height={70}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_bdi_3168_12907)">
      <rect
        x={6}
        y={6}
        width={50}
        height={50}
        rx={25}
        fill="url(#holographicGradient)"
      />
      <rect
        x={6.15}
        y={6.15}
        width={49.7}
        height={49.7}
        rx={24.85}
        stroke="white"
        strokeOpacity={0.7}
        strokeWidth={0.3}
        style={{
          mixBlendMode: "overlay",
        }}
      />
    </g>
    <path
      d="M41 31.9305V38.8251H36.9641V32.3509C36.9641 30.7534 36.3756 29.6603 34.9462 29.6603C33.8531 29.6603 33.1805 30.417 32.9283 31.0897C32.8442 31.3419 32.7601 31.6783 32.7601 32.0987V38.8251H28.7242C28.7242 38.8251 28.8083 27.8946 28.7242 26.8016H32.7601V28.4832C33.2646 27.6424 34.2735 26.4652 36.3756 26.4652C38.9821 26.4652 41 28.2309 41 31.9305ZM24.5202 21C23.1749 21 22.25 21.9249 22.25 23.102C22.25 24.2791 23.0908 25.204 24.4361 25.204C25.8655 25.204 26.7063 24.2791 26.7063 23.102C26.7904 21.8408 25.9495 21 24.5202 21ZM22.5022 38.8251H26.5381V26.8016H22.5022V38.8251Z"
      fill="#202020"
    />
    <defs>
      <filter
        id="filter0_bdi_3168_12907"
        x={-14}
        y={-14}
        width={90}
        height={90}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation={10} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_3168_12907"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={4} dy={4} />
        <feGaussianBlur stdDeviation={5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_backgroundBlur_3168_12907"
          result="effect2_dropShadow_3168_12907"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_3168_12907"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={0.5} />
        <feGaussianBlur stdDeviation={0.5} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect3_innerShadow_3168_12907"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgBtnLinkedin;
