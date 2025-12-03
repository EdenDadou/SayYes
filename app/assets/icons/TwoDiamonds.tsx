import type { SVGProps } from "react";

interface TwoDiamondsProps extends SVGProps<SVGSVGElement> {
  holographic?: boolean;
}

const TwoDiamonds = ({ holographic, ...props }: TwoDiamondsProps) => (
  <svg
    fill="none"
    viewBox="0 0 39 37"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {holographic && (
      <defs>
        <linearGradient id="holographic-diamonds" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4ffff5">
            <animate attributeName="stop-color" values="#4ffff5;#fe77b7;#feab71;#e6ff9c;#b7eeef;#4ffff5" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="#fe77b7">
            <animate attributeName="stop-color" values="#fe77b7;#feab71;#e6ff9c;#b7eeef;#4ffff5;#fe77b7" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#feab71">
            <animate attributeName="stop-color" values="#feab71;#e6ff9c;#b7eeef;#4ffff5;#fe77b7;#feab71" dur="4s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
    )}
    <path
      d="M22.8214 5.9644C21.0777 13.7418 14.7513 19.8098 6.64273 21.4822C14.7513 23.1546 21.0777 29.2226 22.8214 37C24.565 29.2226 30.8914 23.1546 39 21.4822C30.8914 19.8098 24.565 13.7418 22.8214 5.9644Z"
      fill={holographic ? "url(#holographic-diamonds)" : "currentColor"}
    />
    <path
      d="M14.4273 6.91898C10.8089 6.17158 7.98516 3.4632 7.21365 0C6.43442 3.4706 3.61068 6.17898 0 6.91898C3.6184 7.66638 6.44214 10.3748 7.21365 13.838C7.99288 10.3674 10.8166 7.65898 14.4273 6.91898Z"
      fill={holographic ? "url(#holographic-diamonds)" : "currentColor"}
    />
  </svg>
);
export default TwoDiamonds;
