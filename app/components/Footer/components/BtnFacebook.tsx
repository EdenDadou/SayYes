import { useState, type SVGProps } from "react";
const SvgBtnFacebook = (props: SVGProps<SVGSVGElement>) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
  <svg
    viewBox="0 0 30 30"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    style={{ cursor: "pointer", transition: "transform 0.2s ease" }}
    {...props}
  >
    <g filter="url(#filter0_i_4114_3252)" data-figma-bg-blur-radius={18.6905}>
      <mask id="path-1-inside-1_4114_3252" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0ZM19.0344 15.6486H16.2428V23.5142C15.7642 23.5793 15.2793 23.625 14.7826 23.625C14.233 23.625 13.6976 23.5707 13.169 23.4908V15.6486H10.5V12.7954H13.169V10.8973C13.169 7.75448 14.6911 6.375 17.2875 6.375C18.509 6.375 19.1656 6.46432 19.4833 6.50753L19.5 6.50981V8.99971H17.7292C16.6272 8.99971 16.2422 10.0507 16.2422 11.236V12.7954H19.4727L19.0344 15.6486Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0ZM19.0344 15.6486H16.2428V23.5142C15.7642 23.5793 15.2793 23.625 14.7826 23.625C14.233 23.625 13.6976 23.5707 13.169 23.4908V15.6486H10.5V12.7954H13.169V10.8973C13.169 7.75448 14.6911 6.375 17.2875 6.375C18.509 6.375 19.1656 6.46432 19.4833 6.50753L19.5 6.50981V8.99971H17.7292C16.6272 8.99971 16.2422 10.0507 16.2422 11.236V12.7954H19.4727L19.0344 15.6486Z"
        fill={isHovered ? "url(#holographicGradient)" : "white"}
      />
      <path
        d="M16.2428 15.6486V15.3683H15.9625V15.6486H16.2428ZM19.0344 15.6486V15.929H19.275L19.3116 15.6912L19.0344 15.6486ZM16.2428 23.5142L16.2806 23.792L16.5232 23.759V23.5142H16.2428ZM13.169 23.4908H12.8886V23.7319L13.1271 23.768L13.169 23.4908ZM13.169 15.6486H13.4494V15.3683H13.169V15.6486ZM10.5 15.6486H10.2196V15.929H10.5V15.6486ZM10.5 12.7954V12.5151H10.2196V12.7954H10.5ZM13.169 12.7954V13.0758H13.4494V12.7954H13.169ZM19.4833 6.50753L19.4455 6.78533L19.4455 6.78533L19.4833 6.50753ZM19.5 6.50981H19.7804V6.26499L19.5378 6.232L19.5 6.50981ZM19.5 8.99971V9.28007H19.7804V8.99971H19.5ZM16.2422 12.7954H15.9619V13.0758H16.2422V12.7954ZM19.4727 12.7954L19.7499 12.838L19.7995 12.5151H19.4727V12.7954ZM0.280357 15C0.280357 6.87057 6.87057 0.280357 15 0.280357V-0.280357C6.56089 -0.280357 -0.280357 6.56089 -0.280357 15H0.280357ZM15 29.7196C6.87057 29.7196 0.280357 23.1294 0.280357 15H-0.280357C-0.280357 23.4391 6.56089 30.2804 15 30.2804V29.7196ZM29.7196 15C29.7196 23.1294 23.1294 29.7196 15 29.7196V30.2804C23.4391 30.2804 30.2804 23.4391 30.2804 15H29.7196ZM15 0.280357C23.1294 0.280357 29.7196 6.87057 29.7196 15H30.2804C30.2804 6.56089 23.4391 -0.280357 15 -0.280357V0.280357ZM16.2428 15.929H19.0344V15.3683H16.2428V15.929ZM16.5232 23.5142V15.6486H15.9625V23.5142H16.5232ZM14.7826 23.9054C15.2963 23.9054 15.7946 23.8581 16.2806 23.792L16.205 23.2364C15.7338 23.3005 15.2624 23.3446 14.7826 23.3446V23.9054ZM13.1271 23.768C13.6645 23.8493 14.2147 23.9054 14.7826 23.9054V23.3446C14.2513 23.3446 13.7306 23.2922 13.2109 23.2136L13.1271 23.768ZM12.8886 15.6486V23.4908H13.4494V15.6486H12.8886ZM10.5 15.929H13.169V15.3683H10.5V15.929ZM10.2196 12.7954V15.6486H10.7804V12.7954H10.2196ZM13.169 12.5151H10.5V13.0758H13.169V12.5151ZM12.8886 10.8973V12.7954H13.4494V10.8973H12.8886ZM17.2875 6.09464C15.9417 6.09464 14.827 6.4529 14.0519 7.26388C13.279 8.07258 12.8886 9.2848 12.8886 10.8973H13.4494C13.4494 9.36695 13.8201 8.31803 14.4573 7.6513C15.0924 6.98683 16.0369 6.65536 17.2875 6.65536V6.09464ZM19.5211 6.22973C19.1948 6.18536 18.5251 6.09464 17.2875 6.09464V6.65536C18.4929 6.65536 19.1363 6.74327 19.4455 6.78533L19.5211 6.22973ZM19.5378 6.232L19.5211 6.22973L19.4455 6.78533L19.4622 6.78761L19.5378 6.232ZM19.7804 8.99971V6.50981H19.2196V8.99971H19.7804ZM17.7292 9.28007H19.5V8.71936H17.7292V9.28007ZM16.5226 11.236C16.5226 10.666 16.6164 10.1628 16.8161 9.81211C17.0053 9.47991 17.2887 9.28007 17.7292 9.28007V8.71936C17.0676 8.71936 16.6076 9.04503 16.3288 9.53466C16.0605 10.0058 15.9619 10.6208 15.9619 11.236H16.5226ZM16.5226 12.7954V11.236H15.9619V12.7954H16.5226ZM19.4727 12.5151H16.2422V13.0758H19.4727V12.5151ZM19.3116 15.6912L19.7499 12.838L19.1956 12.7528L18.7573 15.606L19.3116 15.6912Z"
        fill="white"
        fillOpacity={0.7}
        style={{
          mixBlendMode: "overlay",
        }}
        mask="url(#path-1-inside-1_4114_3252)"
      />
    </g>
    <defs>
      <filter
        id="filter0_i_4114_3252"
        x={-18.6905}
        y={-18.6905}
        width={67.381}
        height={67.381}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={0.467262} />
        <feGaussianBlur stdDeviation={0.467262} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_4114_3252"
        />
      </filter>
      <clipPath
        id="bgblur_0_4114_3252_clip_path"
        transform="translate(18.6905 18.6905)"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0ZM19.0344 15.6486H16.2428V23.5142C15.7642 23.5793 15.2793 23.625 14.7826 23.625C14.233 23.625 13.6976 23.5707 13.169 23.4908V15.6486H10.5V12.7954H13.169V10.8973C13.169 7.75448 14.6911 6.375 17.2875 6.375C18.509 6.375 19.1656 6.46432 19.4833 6.50753L19.5 6.50981V8.99971H17.7292C16.6272 8.99971 16.2422 10.0507 16.2422 11.236V12.7954H19.4727L19.0344 15.6486Z"
        />
      </clipPath>
      <linearGradient
        id="paint0_linear_4114_3252"
        x1={3.9375}
        y1={3.75}
        x2={22.7393}
        y2={34.4471}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DCC4FF" />
        <stop offset={0.5} stopColor="#B0F5FF" />
        <stop offset={1} stopColor="#E1FF8B" />
      </linearGradient>
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
  </svg>
);
}
export default SvgBtnFacebook;
