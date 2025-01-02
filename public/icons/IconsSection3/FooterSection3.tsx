import type { SVGProps } from "react";

const SvgFooterSection3 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 1280 814"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto"
    preserveAspectRatio="xMidYMid slice"
  >
    {/* Dessiner le contour par-dessus */}
    <path
      d="
      M1280 813
      H1280
      V65.1633
      H923.774
      L873.026 1.37143
      H0
      V739
      H357.032
      L418.032 813
      H1280
      Z"
      stroke="white"
      fill="none"
      strokeOpacity={0.4}
      strokeWidth={1}
    />
  </svg>
);

export default SvgFooterSection3;
