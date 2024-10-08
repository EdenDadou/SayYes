import * as React from "react";
import type { SVGProps } from "react";
const SvgEvent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={94}
    height={100}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_di_2994_5509)">
      <path
        d="M57.9046 48.4782C57.3661 48.4782 56.9284 48.9303 56.9284 49.4863V62.8117C56.9284 63.4597 56.417 63.9878 55.7895 63.9878H29.0952C28.4676 63.9878 27.9563 63.4597 27.9563 62.8117V41.6216H57.9046C58.443 41.6216 58.8808 41.1695 58.8808 40.6135V33.9728C58.8808 32.2126 57.494 30.7805 55.7895 30.7805H51.8615V27.6882C51.8615 26.7521 51.1332 26 50.2306 26C49.328 26 48.6036 26.7521 48.6036 27.6802V30.7765H36.3934V27.6802C36.3934 26.7521 35.6651 26 34.7664 26C33.8677 26 33.1394 26.7521 33.1394 27.6802V30.7765H29.0913C27.3868 30.7765 26 32.2086 26 33.9688V62.8077C26 64.5679 27.3868 66 29.0913 66H55.7856C57.4901 66 58.8769 64.5679 58.8769 62.8077V49.4863C58.8769 48.9303 58.4392 48.4782 57.9007 48.4782H57.9046Z"
        fill="url(#paint0_linear_2994_5509)"
      />
      <path
        d="M48.6307 50.3384L45.3883 49.8544L43.9357 46.8261C43.556 46.034 42.4598 46.034 42.0801 46.8261L40.6275 49.8544L37.3851 50.3384C36.5329 50.4664 36.1958 51.5466 36.8118 52.1666L39.1554 54.5189L38.6015 57.8432C38.4543 58.7153 39.3414 59.3833 40.1045 58.9713L43.0098 57.3991L45.9152 58.9713C46.6744 59.3833 47.5615 58.7153 47.4182 57.8432L46.8643 54.5189L49.2079 52.1666C49.8238 51.5466 49.483 50.4664 48.6346 50.3384H48.6307Z"
        fill="url(#paint1_linear_2994_5509)"
      />
      <path
        d="M59.0435 45.2859C59.0435 46.8541 56.7657 46.8541 56.7657 45.2859C56.7657 43.7178 59.0435 43.7178 59.0435 45.2859Z"
        fill="url(#paint2_linear_2994_5509)"
      />
    </g>
    <defs>
      <filter
        id="filter0_di_2994_5509"
        x={0}
        y={0}
        width={93.0435}
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
          result="effect1_dropShadow_2994_5509"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2994_5509"
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
          result="effect2_innerShadow_2994_5509"
        />
      </filter>
      <linearGradient
        id="paint0_linear_2994_5509"
        x1={32.829}
        y1={98}
        x2={63.0202}
        y2={91.1414}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2F2F2F" />
        <stop offset={1} stopColor="#929292" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_2994_5509"
        x1={32.829}
        y1={98}
        x2={63.0202}
        y2={91.1414}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2F2F2F" />
        <stop offset={1} stopColor="#929292" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_2994_5509"
        x1={32.829}
        y1={98}
        x2={63.0202}
        y2={91.1414}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2F2F2F" />
        <stop offset={1} stopColor="#929292" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgEvent;
