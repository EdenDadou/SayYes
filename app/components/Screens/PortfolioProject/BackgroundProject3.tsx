import {
  memo,
  type SVGProps,
  type CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";
import { useViewport } from "~/utils/hooks/useViewport";

// Styles pour l'optimisation GPU (desktop et mobile)
const gpuOptimizedStyle: CSSProperties = {
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  contain: "layout paint",
  pointerEvents: "none",
};

// Fonction pour générer une image PNG à partir du SVG avec filtres
const generatePNGFromSVG = async (
  svgElement: SVGSVGElement,
  width: number = 1280,
  height: number = 1604
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }

      // Cloner le SVG pour éviter de modifier l'original
      const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
      clonedSvg.setAttribute("width", width.toString());
      clonedSvg.setAttribute("height", height.toString());

      // Convertir le SVG en data URL
      const svgData = new XMLSerializer().serializeToString(clonedSvg);
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        const pngDataUrl = canvas.toDataURL("image/png");
        resolve(pngDataUrl);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Failed to load SVG image"));
      };
      img.src = url;
    } catch (error) {
      reject(error);
    }
  });
};

const BackgroundProject3 = memo(function BackgroundProject3(
  props: SVGProps<SVGSVGElement>
) {
  const svgProps = props;
  const svgRef = useRef<SVGSVGElement>(null);
  const [pngDataUrl, setPngDataUrl] = useState<string | null>(null);
  const isMobile = useViewport();

  // Générer l'image PNG sur mobile
  useEffect(() => {
    if (isMobile && svgRef.current && !pngDataUrl) {
      // Attendre que le SVG soit rendu
      setTimeout(() => {
        if (svgRef.current) {
          generatePNGFromSVG(svgRef.current)
            .then(setPngDataUrl)
            .catch(console.error);
        }
      }, 100);
    }
  }, [isMobile, pngDataUrl]);

  // blurScale = 1 pour un rendu identique sur desktop et mobile
  const blurScale = 1;

  // Sur mobile, utiliser l'image PNG si disponible
  if (isMobile && pngDataUrl) {
    return (
      <img
        src={pngDataUrl}
        alt=""
        style={{
          ...gpuOptimizedStyle,
          ...svgProps.style,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        className={svgProps.className}
      />
    );
  }

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1280 1604"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio={svgProps.preserveAspectRatio || "xMidYMid slice"}
      style={{ ...gpuOptimizedStyle, ...svgProps.style }}
      {...svgProps}
    >
      <g clipPath="url(#bg3-clip)">
        <rect width="1280" height="1604" fill="#080809" />
        <g filter={isMobile ? "url(#bg3-filter)" : undefined}>
          <path
            d="M-968.671 -1.85459C-926.162 -164.435 -633.393 238.77 643.972 560.54C1693.12 840.55 2450.71 697.49 2408.2 860.07C2365.69 1022.65 1692.19 1367.59 527.679 1072.87C-636.83 778.159 -1011.18 160.726 -968.671 -1.85459Z"
            fill={svgProps.fill || "#1255CB"}
            style={
              !isMobile
                ? {
                    filter: `blur(${187.04 * blurScale}px)`,
                    WebkitFilter: `blur(${187.04 * blurScale}px)`,
                  }
                : undefined
            }
          />
        </g>
      </g>
      <defs>
        <clipPath id="bg3-clip">
          <rect
            width={1281}
            height={1710}
            fill="white"
            transform="translate(0 -162)"
          />
        </clipPath>
        {/* Filtre SVG pour mobile (utilisé pour générer le PNG) */}
        {isMobile && (
          <filter
            id="bg3-filter"
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
              stdDeviation={187.04 * blurScale}
              result="effect1"
            />
          </filter>
        )}
      </defs>
    </svg>
  );
});

export default BackgroundProject3;
