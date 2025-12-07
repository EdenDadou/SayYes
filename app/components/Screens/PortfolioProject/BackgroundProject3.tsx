import { memo, type SVGProps, type CSSProperties } from "react";

const gpuOptimizedStyle: CSSProperties = {
  willChange: "transform",
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  contain: "layout paint",
};

const BackgroundProject3 = memo(function BackgroundProject3(props: SVGProps<SVGSVGElement>) {
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
      viewBox="0 0 1280 1604"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
      style={{ ...gpuOptimizedStyle, ...props.style }}
      {...props}
    >
      <g clipPath="url(#clip0_1172_4458)">
        <g filter="url(#filter0_f_1172_4458)">
          <path
            d="M-968.671 -1.85459C-926.162 -164.435 -633.393 238.77 643.972 560.54C1693.12 840.55 2450.71 697.49 2408.2 860.07C2365.69 1022.65 1692.19 1367.59 527.679 1072.87C-636.83 778.159 -1011.18 160.726 -968.671 -1.85459Z"
            fill={props.fill || "#1255CB"}
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_1172_4458"
          x={-1345.95}
          y={-413.178}
          width={4129.94}
          height={1975.29}
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
            stdDeviation={187.04}
            result="effect1_foregroundBlur_1172_4458"
          />
        </filter>
        <clipPath id="clip0_1172_4458">
          <rect
            width={1281}
            height={1710}
            fill="white"
            transform="translate(0 -162)"
          />
        </clipPath>
      </defs>
    </svg>
  );
});
export default BackgroundProject3;
