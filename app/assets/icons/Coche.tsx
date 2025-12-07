import type { SVGProps } from "react";

interface CocheProps extends SVGProps<SVGSVGElement> {
  color?: string;
  holographic?: boolean;
}

const Coche = ({ color, holographic, ...props }: CocheProps) => (
  <svg
    viewBox="0.08 0.08 16.85 16.85"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {holographic && (
      <defs>
        <linearGradient
          id="holographic-coche"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#4ffff5">
            <animate
              attributeName="stop-color"
              values="#4ffff5;#fe77b7;#feab71;#e6ff9c;#b7eeef;#4ffff5"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor="#fe77b7">
            <animate
              attributeName="stop-color"
              values="#fe77b7;#feab71;#e6ff9c;#b7eeef;#4ffff5;#fe77b7"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#feab71">
            <animate
              attributeName="stop-color"
              values="#feab71;#e6ff9c;#b7eeef;#4ffff5;#fe77b7;#feab71"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
    )}
    <path
      d="M8.50342 0.0766602C3.85103 0.0766602 0.0800781 3.84761 0.0800781 8.50001C0.0800781 13.1524 3.85103 16.9234 8.50342 16.9234C13.1558 16.9234 16.9268 13.1524 16.9268 8.50001C16.9268 3.84761 13.154 0.0766602 8.50342 0.0766602ZM7.44981 12.2841C7.28138 12.4506 7.05493 12.5442 6.81726 12.5479C6.5721 12.5517 6.3363 12.4562 6.16225 12.2841L3.70693 9.79691L5.02255 8.50375L6.84346 10.3471L12.5027 4.99667L13.7659 6.31604L7.44793 12.2859L7.44981 12.2841Z"
      fill={holographic ? "url(#holographic-coche)" : color || "currentColor"}
    />
  </svg>
);
export default Coche;
