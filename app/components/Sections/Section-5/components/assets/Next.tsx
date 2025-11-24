import type { SVGProps } from "react";
const SvgNext = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={94}
    height={94}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_bd_3168_13082)">
      <path
        d="M17 17H77V77H17V17Z"
        fill="white"
        fillOpacity={0.05}
        shapeRendering="crispEdges"
      />
    </g>
    <g filter="url(#filter1_bdi_3168_13082)">
      <path
        d="M23.9315 23H71V71H23L23.9315 23Z"
        fill="url(#holographicGradient)"
      />
    </g>
    <path
      d="M44.6001 54.1992L51.8001 46.9992L44.6001 39.7992"
      stroke="#202020"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <filter
        id="filter0_bd_3168_13082"
        x={-59.992}
        y={-59.992}
        width={213.984}
        height={213.984}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation={38.496} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_3168_13082"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={8.136} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_backgroundBlur_3168_13082"
          result="effect2_dropShadow_3168_13082"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_3168_13082"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_bdi_3168_13082"
        x={-1}
        y={-1}
        width={96}
        height={96}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation={12} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_3168_13082"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={4.8} dy={4.8} />
        <feGaussianBlur stdDeviation={6} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_backgroundBlur_3168_13082"
          result="effect2_dropShadow_3168_13082"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_3168_13082"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={0.6} />
        <feGaussianBlur stdDeviation={0.6} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect3_innerShadow_3168_13082"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgNext;
