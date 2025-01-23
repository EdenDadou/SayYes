import type { SVGProps } from "react";
const SvgCoeur = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={29}
    height={29}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 29"
    {...props}
  >
    <defs>
      {/* Dégradé linéaire pour l'effet holographique */}
      <linearGradient
        id="holographicGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="20%"
      >
        <stop offset="0%" stopColor="#DCC4FF">
          <animate
            attributeName="stop-color"
            values="#DCC4FF; #B0F5FF; #E1FF8B; #DCC4FF"
            dur="3s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="33%" stopColor="#B0F5FF">
          <animate
            attributeName="stop-color"
            values="#B0F5FF; #E1FF8B; #DCC4FF; #B0F5FF"
            dur="3s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="100%" stopColor="#E1FF8B">
          <animate
            attributeName="stop-color"
            values="#E1FF8B; #DCC4FF;  #DCC4FF; #B0F5FF; #E1FF8B"
            dur="3s"
            repeatCount="indefinite"
          />
        </stop>
      </linearGradient>
    </defs>
    <g filter="url(#filter0_di_2993_3904)">
      <path
        d="M4 8.77869V8.17281C4.00751 8.12603 4.01824 8.07925 4.02254 8.03248C4.09336 7.30408 4.31442 6.63249 4.71361 6.02326C5.52058 4.79145 7.00467 4.18557 8.40291 4.52972C9.20451 4.72685 9.8312 5.20465 10.3452 5.85843C10.3946 5.9208 10.4418 5.9854 10.4901 6.04888C10.5105 6.03106 10.518 6.0266 10.5233 6.01992C10.5652 5.96535 10.6049 5.90855 10.6489 5.85397C11.5353 4.74579 12.6513 4.23012 14.0388 4.50744C15.377 4.77474 16.2676 5.63011 16.7269 6.93877C17.2345 8.38442 17.0177 9.75991 16.2161 11.0441C15.7719 11.7569 15.2267 12.3828 14.6204 12.9453C13.4314 14.0468 12.2242 15.1271 11.0202 16.2108C10.6789 16.5182 10.2991 16.5048 9.94388 16.1874C9.0178 15.361 8.08957 14.5346 7.16885 13.7015C6.393 13.0009 5.64076 12.2737 5.02266 11.4138C4.62132 10.8536 4.29832 10.25 4.13736 9.56612C4.07619 9.30773 4.04507 9.04154 4 8.77869Z"
        fill="url(#holographicGradient)"
      />
    </g>
  </svg>
);
export default SvgCoeur;
