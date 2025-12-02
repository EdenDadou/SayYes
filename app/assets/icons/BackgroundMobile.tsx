import type { SVGProps } from "react";
import { memo } from "react";

/**
 * BackgroundMobile optimisé - filtres blur supprimés pour meilleures performances
 * Les blur SVG sont très coûteux sur mobile et causent des saccades
 */
const BackgroundMobile = memo((props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 390 671"
    aria-hidden="true"
    {...props}
  >
    <g clipPath="url(#a)">
      {/* Shapes sans filtres blur pour de meilleures performances */}
      <path
        fill="url(#c)"
        d="M246.308-12H0v870.573h1017.61V504.77C628.193 619.218 341.151 207.943 246.308-12"
        opacity={0.6}
      />
      <path
        fill="url(#e)"
        d="M1146.85 474.481c-424.988 145.45-916.015-.151-1166.909-185.789-4.24-3.139-10.199-.059-10.199 5.217v562.806a6.37 6.37 0 0 0 6.37 6.37H1149c3.51 0 6.37-2.852 6.37-6.37V480.521c0-4.393-4.36-7.463-8.52-6.04"
        opacity={0.8}
      />
      <path
        fill="url(#g)"
        d="M-134.459 368.185c.118-167.632 152.33 169.009 673.542 230.352 429.652 65.783 705.587-224.767 705.467-57.136s-223.78 639.149-699.075 581.879c-475.298-57.27-680.052-587.464-679.934-755.095"
        opacity={0.7}
      />
      <path
        fill="black"
        d="M1154.97 672.382c-699.909 0-830.097-46.183-1226.632-119.837v379.018H1166.33z"
        opacity={0.5}
      />
    </g>
    <defs>
      <linearGradient
        id="c"
        x1={-37.822}
        x2={158.057}
        y1={246.385}
        y2={183.481}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4034EB" />
        <stop offset={1} />
      </linearGradient>
      <linearGradient
        id="e"
        x1={-267.542}
        x2={2669.84}
        y1={251.561}
        y2={787.44}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4FFFF5" />
        <stop offset={0.002} stopColor="#BAB3DD" />
        <stop offset={0.218} stopColor="#B7EEEF" />
        <stop offset={0.539} stopColor="#E6FF9C" />
        <stop offset={0.573} stopColor="#fff" />
        <stop offset={0.803} stopColor="#FEAB71" />
        <stop offset={1} stopColor="#FE77B7" />
      </linearGradient>
      <linearGradient
        id="g"
        x1={555.081}
        x2={469.338}
        y1={402.476}
        y2={1114.11}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9671E1" />
        <stop offset={0.573} stopColor="#010101" />
      </linearGradient>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h390v671H0z" />
      </clipPath>
    </defs>
  </svg>
));

BackgroundMobile.displayName = "BackgroundMobile";
export default BackgroundMobile;
