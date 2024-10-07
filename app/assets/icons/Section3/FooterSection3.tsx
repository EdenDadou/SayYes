import type { SVGProps } from "react";

const SvgFooterSection3 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 1280 814"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* ClipPath pour masquer le contenu en dehors des contours */}
    <clipPath id="clipPath">
      <path d="M1280 813H1281V812V65.1633V64.1633H1280H923.774L873.026 1.37143L872.726 1L872.248 1L1.92795e-05 1.00043L-0.99998 1.00043V2.00043L-1 739V740H0H357.032L417.733 812.641L418.032 813H418.5H1280Z" />
      {props.children}
    </clipPath>
    {/* Utiliser le clipPath pour le masque */}
    <g clipPath="url(#clipPath)">
      <path
        d="M1280 813H1281V812V65.1633V64.1633H1280H923.774L873.026 1.37143L872.726 1L872.248 1L1.92795e-05 1.00043L-0.99998 1.00043V2.00043L-1 739V740H0H357.032L417.733 812.641L418.032 813H418.5H1280Z"
        stroke="white"
        fill="white"
        fillOpacity={0}
        strokeOpacity={0.4}
        strokeWidth={2}
      />
    </g>
  </svg>
);

export default SvgFooterSection3;
