import type { SVGProps } from "react";

const Pause = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <rect
      x="6"
      y="4"
      width="4"
      height="16"
      rx="1"
      fill={props.fill || "currentColor"}
    />
    <rect
      x="14"
      y="4"
      width="4"
      height="16"
      rx="1"
      fill={props.fill || "currentColor"}
    />
  </svg>
);

export default Pause;
