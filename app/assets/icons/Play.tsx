import type { SVGProps } from "react";

const Play = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path
      fill={props.fill || "currentColor"}
      d="M8 6.5c0-1.1.9-1.5 1.8-.9l9.4 5.5c.9.5.9 1.3 0 1.8l-9.4 5.5c-.9.5-1.8.2-1.8-.9v-11z"
    />
  </svg>
);

export default Play;
