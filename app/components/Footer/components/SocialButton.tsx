import { useState, type SVGProps } from "react";

interface SocialButtonProps extends SVGProps<SVGSVGElement> {
  iconPath: string;
  overlayPath: string;
  figmaId: string;
  hasBgBlurRadius?: boolean;
}

const SocialButton = ({
  iconPath,
  overlayPath,
  figmaId,
  hasBgBlurRadius = true,
  ...props
}: SocialButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const filterId = `filter0_i_${figmaId}`;
  const maskId = `path-1-inside-1_${figmaId}`;
  const clipPathId = `bgblur_0_${figmaId}_clip_path`;
  const paintId = `paint0_linear_${figmaId}`;
  const effectId = `effect1_innerShadow_${figmaId}`;

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
      <g
        filter={`url(#${filterId})`}
        {...(hasBgBlurRadius
          ? { "data-figma-bg-blur-radius": 18.6905 }
          : {})}
      >
        <mask id={maskId} fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d={iconPath}
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d={iconPath}
          fill={isHovered ? "url(#holographicGradient)" : "white"}
        />
        <path
          d={overlayPath}
          fill="white"
          fillOpacity={0.7}
          style={{
            mixBlendMode: "overlay",
          }}
          mask={`url(#${maskId})`}
        />
      </g>
      <defs>
        <filter
          id={filterId}
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
          <feComposite
            in2="hardAlpha"
            operator="arithmetic"
            k2={-1}
            k3={1}
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result={effectId}
          />
        </filter>
        <clipPath
          id={clipPathId}
          transform="translate(18.6905 18.6905)"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d={iconPath}
          />
        </clipPath>
        <linearGradient
          id={paintId}
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
};

export default SocialButton;
