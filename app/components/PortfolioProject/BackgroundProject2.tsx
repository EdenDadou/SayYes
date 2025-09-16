import type { SVGProps } from "react";
const BackgroundProject2 = (props: SVGProps<SVGSVGElement>) => {
  // Fonction pour calculer une couleur plus sombre basée sur la couleur principale
  const getDarkerColor = (baseColor: string) => {
    // Couleur par défaut si pas de couleur fournie
    if (!baseColor) return "#0A2A62";

    // Extraire les valeurs RGB de la couleur hex
    const hex = baseColor.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Appliquer la même réduction que entre #1255CB et #0A2A62
    // Réduction d'environ 44% pour R, 51% pour G, 52% pour B
    const newR = Math.round(r * 0.56);
    const newG = Math.round(g * 0.49);
    const newB = Math.round(b * 0.48);

    // Convertir en hex
    const toHex = (n: number) => n.toString(16).padStart(2, "0");
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
  };

  const baseColor = props.fill || "#1255CB";
  const darkerColor = getDarkerColor(baseColor);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1280 1044"
      aria-hidden="true"
      {...props}
    >
      <g clipPath="url(#a)">
        <path fill="currentColor" d="M0 0h1280v1044H0z" />
        <g clipPath="url(#b)">
          <path fill="#FFF" d="M.188 0h1280v729H.188z" />
          <mask
            id="c"
            width={1281}
            height={704}
            x={0}
            y={0}
            maskUnits="userSpaceOnUse"
            style={{
              maskType: "alpha",
            }}
          >
            <path fill="currentColor" d="M.188 0h1280v704H.188z" />
          </mask>
          <g filter="url(#d)" mask="url(#c)">
            <ellipse
              cx={152.646}
              cy={781.921}
              fill={props.fill || "#1255CB"}
              rx={152.646}
              ry={781.921}
              transform="matrix(-.52678 .85 .7861 .61811 -356.828 -9.07)"
            />
          </g>
        </g>
        <g filter="url(#e)">
          <path
            fill={darkerColor}
            d="M-226.515 218.584c25.703-198.081 165.722 225.868 811.554 387.791 530.061 151.46 921.211-144.56 895.511 53.521S1101.82 1376.83 513.081 1227.6-252.218 416.666-226.515 218.584"
          />
        </g>
        <g filter="url(#f)">
          <path
            fill={props.fill || "#1255CB"}
            d="M-227.445 310.023c27.367-210.9 164.227 237.387 810.074 399.198 529.921 152.532 924.281-168.247 896.921 42.654-27.37 210.9-385.34 767.865-974.078 618.635-588.74-149.23-760.283-849.587-732.917-1060.487"
          />
        </g>
        <g filter="url(#g)">
          <path
            fill="#000"
            d="M-382.81 885.501c12.557-270.696 393.198-114.418 905.36-71.661 512.16 42.756 961.9-44.201 949.34 226.49-12.55 270.7-437.92 455.48-950.085 412.73C9.642 1410.3-395.368 1156.2-382.81 885.501"
          />
        </g>
      </g>
      <defs>
        <filter
          id="d"
          width={2339.05}
          height={2100.21}
          x={-992.101}
          y={-446.113}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_383_3639"
            stdDeviation={274.777}
          />
        </filter>
        <filter
          id="e"
          width={1885.26}
          height={1261.87}
          x={-316.214}
          y={79.613}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_383_3639"
            stdDeviation={43.65}
          />
        </filter>
        <filter
          id="f"
          width={1985.69}
          height={1415.51}
          x={-367.503}
          y={117.367}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_383_3639"
            stdDeviation={68.65}
          />
        </filter>
        <filter
          id="g"
          width={2029.84}
          height={903.678}
          x={-470.394}
          y={642.827}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_383_3639"
            stdDeviation={43.65}
          />
        </filter>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h1280v1044H0z" />
        </clipPath>
        <clipPath id="b">
          <path fill="#fff" d="M.188 0h1280v729H.188z" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default BackgroundProject2;
