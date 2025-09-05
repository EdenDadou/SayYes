import * as React from "react";
import type { SVGProps } from "react";
const SvgIdee = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={12}
    height={13}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.46329 0.0824585C3.42884 0.0824585 0.967762 2.49604 0.967762 5.47344C0.936258 7.21067 1.67723 8.87619 2.99661 10.036C3.26754 10.2425 3.54982 10.4341 3.84091 10.6122H3.79933V11.5989C3.79933 12.321 4.39538 12.9058 5.13131 12.9058H7.79527C8.52994 12.9033 9.12474 12.3197 9.12726 11.5989V10.6122H9.06803C9.33392 10.4502 9.65022 10.24 9.94131 10.0236C11.2494 8.86259 11.984 7.20449 11.9576 5.47344C11.945 2.50222 9.4927 0.0960596 6.46329 0.0824585ZM6.00712 9.10741V6.87064H3.73254L6.91569 2.85585V5.08148H9.19026L6.00712 9.10617V9.10741Z"
      fill="url(#paint0_linear_386_2702)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_386_2702"
        x1={4.17264}
        y1={12.9666}
        x2={12.7722}
        y2={2.15383}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DCC4FF" />
        <stop offset={0.5} stopColor="#B0F5FF" />
        <stop offset={1} stopColor="#E1FF8B" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgIdee;
