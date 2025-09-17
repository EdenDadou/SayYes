import type { SVGProps } from "react";

interface AnimatedBurgerMenuProps extends SVGProps<SVGSVGElement> {
  isOpen?: boolean;
  onToggle?: () => void;
}

const AnimatedBurgerMenu = ({
  isOpen = false,
  onToggle,
  ...props
}: AnimatedBurgerMenuProps) => {
  return (
    <div
      className="cursor-pointer p-1"
      role="button"
      aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
    >
      <svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        {...props}
      >
        {/* Première ligne - devient la partie supérieure de la croix */}
        <rect
          x="3"
          y="6"
          width="18"
          height="2"
          rx="1"
          fill="currentColor"
          style={{
            transformOrigin: "12px 12px",
            transform: isOpen
              ? "rotate(45deg) translateY(5px)"
              : "rotate(0deg) translateY(0px)",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {/* Deuxième ligne - disparaît avec un fade */}
        <rect
          x="3"
          y="11"
          width="18"
          height="2"
          rx="1"
          fill="currentColor"
          style={{
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? "scaleX(0)" : "scaleX(1)",
            transformOrigin: "center",
            transition: "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
          }}
        />

        {/* Troisième ligne - devient la partie inférieure de la croix */}
        <rect
          x="3"
          y="16"
          width="18"
          height="2"
          rx="1"
          fill="currentColor"
          style={{
            transformOrigin: "12px 12px",
            transform: isOpen
              ? "rotate(-45deg) translateY(-5px)"
              : "rotate(0deg) translateY(0px)",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </svg>
    </div>
  );
};

export default AnimatedBurgerMenu;
