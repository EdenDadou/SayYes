import type { SVGProps } from "react";
const Arrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 51 51"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={1.22656}
      y={1.5}
      width={48}
      height={48}
      rx={24}
      stroke={props.color || "white"}
      strokeWidth={2}
    />
    <g filter="url(#filter0_i_506_3271)">
      <path
        d="M27.9826 15.0821C28.0028 15.0624 28.621 14.912 29.3563 14.7479C30.0917 14.5838 30.7013 14.4746 30.7111 14.5051C30.7208 14.5357 30.7969 15.0312 30.8801 15.6063C31.0472 16.7613 31.4519 18.1098 31.8843 18.9532C33.2321 21.5815 35.6503 23.3219 38.5833 23.7742L39.3301 23.8894L39.3301 25.0505L39.3301 26.2117L38.6532 26.322C34.2182 27.0443 31.3268 30.2639 30.7859 35.0819C30.7506 35.3965 30.7084 35.6538 30.6922 35.6538C30.5426 35.6538 28.0642 35.0739 28.0173 35.028C27.9834 34.9948 28.0086 34.6998 28.0734 34.3727C28.7906 30.7501 30.8441 27.8022 33.5089 26.5697L34.1481 26.274C27.3172 26.265 21.4771 26.2599 14.6462 26.2509L11.125 26.2362L11.125 23.8863L14.6676 23.8716L34.1384 23.8483L33.3315 23.4514C31.2379 22.4216 29.5804 20.4016 28.6043 17.6902C28.3262 16.9178 27.9065 15.1567 27.9826 15.0821Z"
        fill={props.color || "white"}
      />
    </g>
    <defs>
      <filter
        id="filter0_i_506_3271"
        x={11.125}
        y={14.5}
        width={28.2051}
        height={21.7432}
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
        <feOffset dy={0.589348} />
        <feGaussianBlur stdDeviation={0.420963} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_506_3271"
        />
      </filter>
    </defs>
  </svg>
);
export default Arrow;
