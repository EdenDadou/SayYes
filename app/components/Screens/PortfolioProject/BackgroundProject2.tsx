import { memo, type SVGProps, type CSSProperties } from "react";

const gpuOptimizedStyle: CSSProperties = {
  willChange: "transform",
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  contain: "layout paint",
};

const BackgroundProject2 = memo(function BackgroundProject2(props: SVGProps<SVGSVGElement>) {
  // Fonction pour calculer une couleur plus sombre basée sur la couleur principale
  const getDarkerColor = (baseColor: string) => {
    // Couleur par défaut si pas de couleur fournie
    if (!baseColor) return "#0A2A62";

    // Extraire les valeurs RGB de la couleur hex
    const hex = baseColor.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

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
      viewBox="0 0 1280 1044"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...gpuOptimizedStyle, ...props.style }}
      {...props}
    >
      {/* Rectangle de fond blanc */}
      <rect width="1280" height="1044" fill="white" />
      <g clipPath="url(#clip0_1770_4968)">
        <g filter="url(#filter0_f_1770_4968)">
          <path
            d="M-226.516 218.585C-200.813 20.5032 -60.7942 444.453 585.038 606.375C1115.1 757.835 1506.25 461.815 1480.55 659.897C1454.84 857.978 1101.82 1376.83 513.08 1227.6C-75.6594 1078.37 -252.219 416.666 -226.516 218.585Z"
            fill={props.fill || "#1255CB"}
          />
        </g>
        <g filter="url(#filter1_f_1770_4968)">
          <path d="M-227.446 310.023C-200.079 99.1226 -63.2192 547.411 582.628 709.222C1112.55 861.753 1506.91 540.975 1479.55 751.875C1452.18 962.775 1094.21 1519.74 505.471 1370.51C-83.2688 1221.28 -254.812 520.923 -227.446 310.023Z" />
        </g>
        <g filter="url(#filter2_f_1770_4968)">
          <path
            d="M-382.811 885.501C-370.254 614.806 10.3866 771.084 522.549 813.84C1034.71 856.596 1484.45 769.64 1471.89 1040.34C1459.33 1311.03 1033.97 1495.81 521.804 1453.06C9.64139 1410.3 -395.369 1156.2 -382.811 885.501Z"
            fill="black"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_1770_4968"
          x={-316.214}
          y={79.6136}
          width={1885.26}
          height={1261.87}
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
          <feGaussianBlur
            stdDeviation={43.65}
            result="effect1_foregroundBlur_1770_4968"
          />
        </filter>
        <filter
          id="filter1_f_1770_4968"
          x={-367.502}
          y={117.367}
          width={1985.69}
          height={1415.51}
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
          <feGaussianBlur
            stdDeviation={68.65}
            result="effect1_foregroundBlur_1770_4968"
          />
        </filter>
        <filter
          id="filter2_f_1770_4968"
          x={-470.396}
          y={642.827}
          width={2029.84}
          height={903.678}
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
          <feGaussianBlur
            stdDeviation={43.65}
            result="effect1_foregroundBlur_1770_4968"
          />
        </filter>
        <clipPath id="clip0_1770_4968">
          <rect width={1280} height={1044} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
export default BackgroundProject2;
