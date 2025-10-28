import type { SVGProps } from "react";
const NoteStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="19 19 20 21"
    aria-hidden="true"
    {...props}
  >
    <defs>
      <linearGradient
        id="holographicGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="50%"
      >
        <stop offset="0%" stopColor="#4FFFF5">
          <animate
            attributeName="stop-color"
            values="#FE77B7; #FEAB71; #E6FF9C; #B7EEEF; #4FFFF5; #FE77B7"
            dur="4s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="50%" stopColor="#B7EEEF">
          <animate
            attributeName="stop-color"
            values="#4FFFF5; #FE77B7; #FEAB71; #E6FF9C; #B7EEEF; #4FFFF5"
            dur="4s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="100%" stopColor="#E6FF9C">
          <animate
            attributeName="stop-color"
            values="#B7EEEF; #4FFFF5; #FE77B7; #FEAB71; #E6FF9C; #B7EEEF"
            dur="4s"
            repeatCount="indefinite"
          />
        </stop>
      </linearGradient>
    </defs>
    <path
      fill={props.fill || "url(#holographicGradient)"}
      d="M31.574 26.693 29.01 19l-2.584 7.687-7.426.315 5.83 5.09-2.025 7.892 6.185-4.543L35.17 40l-2.01-7.897L39 27.03z"
    />
  </svg>
);
export default NoteStar;
