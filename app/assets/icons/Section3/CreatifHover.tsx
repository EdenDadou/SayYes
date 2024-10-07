import type { SVGProps } from "react";
const SvgCreatifHover = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={104}
    height={101}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_di_2994_5483)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M39.821 28.4539C50.7671 23.1821 63.544 27.0096 68.3565 37.0021C68.682 37.678 68.9641 38.3638 69.1995 39.0611C69.6128 40.278 69.4592 41.5111 68.7418 42.6746C68.0244 43.8381 66.9459 44.6106 65.5858 44.9319C64.7375 45.1313 63.8987 45.4253 63.0767 45.8211C57.558 48.479 55.0084 54.6737 57.3044 59.7413C57.8347 60.9092 57.7941 62.1429 57.1838 63.3539C56.5769 64.5632 55.5704 65.4184 54.2362 65.8519C44.0535 69.1714 33.0911 65.1817 28.7145 56.0943C23.9019 46.1018 28.8749 33.7257 39.821 28.4539ZM51.8343 29.4028C50.0698 30.2527 49.2693 32.2449 50.0451 33.8557C50.8209 35.4665 52.8776 36.0826 54.6421 35.2328C56.4067 34.383 57.2072 32.3908 56.4314 30.7799C55.6556 29.1691 53.5989 28.553 51.8343 29.4028ZM62.8266 35.7405C61.3428 35.296 59.6695 36.1019 59.092 37.5391C58.5145 38.9764 59.2501 40.5039 60.734 40.9484C62.2178 41.3929 63.891 40.587 64.4685 39.1497C65.0461 37.7125 64.3104 36.185 62.8266 35.7405ZM46.7601 63.4111C48.9356 62.3633 49.9244 59.9027 48.9679 57.9167C48.0114 55.9307 45.471 55.1697 43.2955 56.2174C41.12 57.2652 40.1313 59.7259 41.0877 61.7119C42.0442 63.6978 44.5846 64.4588 46.7601 63.4111ZM33.9965 57.9926C36.0532 58.6087 38.3722 57.4918 39.176 55.498C39.9765 53.5059 38.9569 51.3888 36.8988 50.7698C34.8421 50.1536 32.523 51.2705 31.7193 53.2643C30.9188 55.2565 31.9383 57.3735 33.9965 57.9926ZM30.7034 44.906C31.548 46.6597 33.7879 47.3307 35.709 46.4054C37.6301 45.4802 38.5019 43.3106 37.6572 41.5569C36.8126 39.8031 34.5728 39.1322 32.6517 40.0574C30.7306 40.9826 29.8588 43.1522 30.7034 44.906ZM38.1674 33.0799C37.4692 34.8174 38.3583 36.6634 40.152 37.2007C41.9458 37.7381 43.968 36.7642 44.6662 35.0267C45.3643 33.2892 44.4752 31.4432 42.6815 30.9058C40.8877 30.3685 38.8655 31.3424 38.1674 33.0799Z"
        fill="url(#holographicGradient)"
      />
    </g>
    <defs>
      <filter
        id="filter0_di_2994_5483"
        x={0.87793}
        y={0.0859375}
        width={102.548}
        height={100.924}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={4} dy={4} />
        <feGaussianBlur stdDeviation={15} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2994_5483"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2994_5483"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={0.35} />
        <feGaussianBlur stdDeviation={0.25} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_2994_5483"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgCreatifHover;
