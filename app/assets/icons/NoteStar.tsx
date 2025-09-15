import type { SVGProps } from "react";
const NoteStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="19 19 20 21"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="url(#holographicGradient)"
      d="M31.574 26.693 29.01 19l-2.584 7.687-7.426.315 5.83 5.09-2.025 7.892 6.185-4.543L35.17 40l-2.01-7.897L39 27.03z"
    />
  </svg>
);
export default NoteStar;
