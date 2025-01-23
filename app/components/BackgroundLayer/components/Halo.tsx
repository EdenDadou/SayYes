import React from "react";

interface HaloProps {
  size?: number; // Taille du halo
  rotation?: number; // Angle de rotation
  style?: React.CSSProperties; // Styles supplémentaires
  className?: string; // Classe CSS supplémentaire
  opacity?: number; // Opacité du halo
  color?: string;
}

const Halo: React.FC<HaloProps> = ({
  size = 400,
  rotation = 0,
  style,
  className,
  opacity = 0.15,
  color = "linear-gradient(139deg, #202020 16.88%, #E1FF8B 29.27%, #B0F5FF 45.59%, #DCC4FF 56.18%, #202020 96.23%)",
}) => {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "650.508px",
        opacity: opacity,
        background: color,
        filter: "blur(62px)",
        transform: `rotate(${rotation}deg)`,
        pointerEvents: "none", // Évite les interactions
        ...style,
      }}
    />
  );
};

export default Halo;
