import type { SVGProps } from "react";
const BurgerMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={23}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 14"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M0 1a1 1 0 0 1 1-1h22a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1M0 7a1 1 0 0 1 1-1h22a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1M0 13a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1"
    />
  </svg>
);
export default BurgerMenu;
