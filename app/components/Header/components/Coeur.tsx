import type { SVGProps } from "react";
const Coeur = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={14}
    height={13}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0.599609 4.92351V4.34848C0.607356 4.30409 0.618424 4.25969 0.622851 4.2153C0.695895 3.52399 0.92388 2.8866 1.33558 2.3084C2.16784 1.13932 3.69844 0.564286 5.1405 0.890911C5.96723 1.07801 6.61356 1.53148 7.14368 2.15196C7.19459 2.21115 7.24328 2.27246 7.29309 2.33271C7.31411 2.3158 7.32186 2.31157 7.32739 2.30523C7.37056 2.25343 7.41151 2.19952 7.45688 2.14773C8.37104 1.09598 9.52203 0.606568 10.953 0.86977C12.3331 1.12346 13.2517 1.93527 13.7254 3.17729C14.2489 4.54932 14.0253 5.85476 13.1986 7.07353C12.7404 7.75003 12.1782 8.34409 11.5529 8.87789C10.3266 9.92331 9.08156 10.9486 7.83981 11.9771C7.48787 12.2689 7.09609 12.2562 6.72976 11.9549C5.77466 11.1706 4.81734 10.3863 3.86777 9.59562C3.06761 8.93075 2.29179 8.2405 1.65432 7.42447C1.2404 6.89278 0.907279 6.31986 0.74127 5.67084C0.678187 5.42561 0.646092 5.17297 0.599609 4.92351Z"
      fill="url(#holographicGradient)"
    />
    <defs>
      <linearGradient
        id="holographicGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="20%"
      >
        <stop offset="0%" stopColor="#4FFFF5">
          <animate
            attributeName="stop-color"
            values="#FE77B7; #FEAB71; #E6FF9C; #B7EEEF; #4FFFF5; #FE77B7"
            dur="3s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="25%" stopColor="#B7EEEF">
          <animate
            attributeName="stop-color"
            values="#4FFFF5; #FE77B7; #FEAB71; #E6FF9C; #B7EEEF; #4FFFF5"
            dur="3s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="50%" stopColor="#E6FF9C">
          <animate
            attributeName="stop-color"
            values="#B7EEEF; #4FFFF5; #FE77B7; #FEAB71; #E6FF9C; #B7EEEF"
            dur="3s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="75%" stopColor="#FEAB71">
          <animate
            attributeName="stop-color"
            values="#E6FF9C; #B7EEEF; #4FFFF5; #FE77B7; #FEAB71; #E6FF9C"
            dur="3s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="100%" stopColor="#FE77B7">
          <animate
            attributeName="stop-color"
            values="#FEAB71; #E6FF9C; #B7EEEF; #4FFFF5; #FE77B7; #FEAB71"
            dur="3s"
            repeatCount="indefinite"
          />
        </stop>
      </linearGradient>
    </defs>
  </svg>
);
export default Coeur;
