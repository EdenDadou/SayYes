import type { SVGProps } from "react";
const ArrowLight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 42 43"
    aria-hidden="true"
    {...props}
  >
    <circle
      cx={20.818}
      cy={20.818}
      r={20.551}
      stroke="#fff"
      strokeOpacity={0.31}
      strokeWidth={0.534}
      transform="matrix(-1 0 0 1 41.636 .79)"
    />
    <g filter="url(#a)">
      <path
        fill="#fff"
        d="M23.114 13.553c.016-.017.531-.142 1.143-.279.613-.136 1.12-.227 1.129-.202.008.026.071.439.14.917.14.962.477 2.085.837 2.787 1.122 2.19 3.136 3.638 5.578 4.015l.622.096v1.934l-.564.091c-3.693.602-6.1 3.283-6.551 7.295-.03.262-.065.476-.078.476-.125 0-2.189-.482-2.228-.52-.028-.028-.007-.274.047-.546.597-3.017 2.307-5.472 4.526-6.498l.533-.246-16.24-.02-2.932-.012v-1.957l2.95-.012 16.214-.02-.672-.33c-1.744-.857-3.124-2.54-3.937-4.797-.231-.643-.58-2.11-.517-2.172"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={23.487}
        height={18.106}
        x={9.076}
        y={13.068}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={0.491} />
        <feGaussianBlur stdDeviation={0.351} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        <feBlend in2="shape" result="effect1_innerShadow_557_6650" />
      </filter>
    </defs>
  </svg>
);
export default ArrowLight;
