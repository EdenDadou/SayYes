import type { SVGProps } from "react";
const Star = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 17 17"
    aria-hidden="true"
    {...props}
  >
    <path
      fill={props.fill || "#fff"}
      d="M7.958 16.79c-.328-1.88-1.661-4.24-4.198-6.143C2.514 9.707 1.246 9.095 0 8.833v-.919c2.47-.59 4.897-2.251 6.45-4.503C7.237 2.274 7.74 1.159 7.958 0h.918c.372 2.208 2.077 4.657 4.395 6.297 1.137.808 2.317 1.355 3.52 1.617v.919c-2.427.502-5.247 2.667-6.647 4.875-.7 1.115-1.115 2.143-1.268 3.083z"
    />
  </svg>
);
export default Star;
