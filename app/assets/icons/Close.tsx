import type { SVGProps } from "react";
const Close = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={30}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={30} height={30} rx={15} fill="white" />
    <rect
      x={9.13086}
      y={20.1982}
      width={15.6522}
      height={1.30435}
      rx={0.652174}
      transform="rotate(-45 9.13086 20.1982)"
      fill="black"
    />
    <rect
      x={10.0547}
      y={9.13049}
      width={15.6522}
      height={1.30435}
      rx={0.652174}
      transform="rotate(45 10.0547 9.13049)"
      fill="black"
    />
  </svg>
);
export default Close;
