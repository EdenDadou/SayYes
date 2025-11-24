import type { SVGProps } from "react";
const SvgCheckHolo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 42 40"
  >
    <g filter="url(#filter0_di_2993_4395)">
      <path
        d="M17 4.76367C9.81982 4.76367 4 10.5835 4 17.7637C4 24.9439 9.81982 30.7637 17 30.7637C24.1802 30.7637 30 24.9439 30 17.7637C30 10.5835 24.1773 4.76367 17 4.76367ZM15.3739 23.6037C15.114 23.8608 14.7645 24.0052 14.3977 24.011C14.0193 24.0167 13.6554 23.8694 13.3868 23.6037L9.59742 19.7652L11.6279 17.7694L14.4381 20.6144L23.1722 12.3569L25.1218 14.3931L15.371 23.6066L15.3739 23.6037Z"
        fill="url(#holographicGradient)"
      />
    </g>
  </svg>
);
export default SvgCheckHolo;
