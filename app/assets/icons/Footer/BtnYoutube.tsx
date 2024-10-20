import type { SVGProps } from "react";
const SvgBtnYoutube = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={70}
    height={70}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_bdi_3168_12909)">
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.0781 39.821C19.5878 39.676 19.1404 39.4179 18.7737 39.0686C18.407 38.7193 18.1318 38.289 17.9712 37.814C17.0537 35.3592 16.7818 25.1087 18.5489 23.0851C19.137 22.4268 19.9674 22.0215 20.8597 21.9572C25.6003 21.4596 40.2468 21.5259 41.929 22.1231C42.4021 22.2729 42.8344 22.5253 43.1934 22.8614C43.5524 23.1975 43.8288 23.6085 44.0019 24.0637C45.0044 26.6015 45.0384 35.8236 43.866 38.2619C43.555 38.8966 43.0343 39.4107 42.3878 39.7215C40.6207 40.584 22.4229 40.5674 20.0781 39.821ZM27.6053 35.0109L36.101 30.6984L27.6053 26.3527V35.0109Z"
      fill="#202020"
    />
    <defs>
      <filter
        id="filter0_bdi_3168_12909"
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
          result="effect1_backgroundBlur_3168_12909"
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
          in2="effect1_backgroundBlur_3168_12909"
          result="effect2_dropShadow_3168_12909"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_3168_12909"
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
          result="effect3_innerShadow_3168_12909"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgBtnYoutube;
