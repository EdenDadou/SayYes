import type { SVGProps } from "react";
const SvgLight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={32}
    height={35}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 35"
    {...props}
  >
    <g filter="url(#filter0_bd_2993_3908)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0008 6.43359C8.68796 6.43359 6.00105 9.06863 6.00105 12.3192C5.96666 14.2159 6.77562 16.0342 8.21606 17.3004C8.51186 17.5259 8.82003 17.7351 9.13784 17.9295H9.09243V19.0067C9.09243 19.7951 9.74318 20.4336 10.5466 20.4336H13.455C14.2571 20.4309 14.9065 19.7937 14.9092 19.0067V17.9295H14.8446C15.1349 17.7527 15.4802 17.5232 15.798 17.2869C17.2261 16.0194 18.0281 14.2091 17.9992 12.3192C17.9855 9.07538 15.3082 6.44844 12.0008 6.43359ZM11.5028 16.2866V13.8446H9.01952L12.4947 9.46146V11.8913H14.978L11.5028 16.2853V16.2866Z"
        fill="url(#holographicGradient)"
      />
    </g>
  </svg>
);
export default SvgLight;
