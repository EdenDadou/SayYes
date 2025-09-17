import type { SVGProps } from "react";
const SvgMenuMobile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 97 60"
    fill="none"
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_di_3654_5623)">
      <path
        d="M60.624 0.152344H-0.000167847V60H75.123L60.624 0.152344Z"
        fill="url(#paint0_linear_3654_5623)"
      />
    </g>
    <foreignObject x={-5.38507} y={-5.54327} width={82.1041} height={71.524}>
      <div
        style={{
          backdropFilter: "blur(7.59px)",
          clipPath: "url(#bgblur_0_3654_5623_clip_path)",
          height: "100%",
          width: "100%",
        }}
      />
    </foreignObject>
    <g filter="url(#filter1_di_3654_5623)" data-figma-bg-blur-radius={15.1898}>
      <path
        d="M52.1224 9.64648H9.80566V50.7917H61.5293L52.1224 9.64648Z"
        fill="url(#holographicGradient)"
      />
      <path
        d="M61.3864 50.6778L52.0316 9.76041H9.91959V50.6778H61.3864Z"
        stroke="white"
        strokeOpacity={0.7}
        strokeWidth={0.227846}
        style={{
          mixBlendMode: "overlay",
        }}
      />
    </g>
    <path d="M20 21H44V23H20V21Z" fill="#202020" />
    <path d="M20 29H44V31H20V29Z" fill="#202020" />
    <path d="M20 37H44V39H20V37Z" fill="#202020" />
    <defs>
      <clipPath
        id="bgblur_0_3654_5623_clip_path"
        transform="translate(5.38507 5.54327)"
      >
        <path d="M52.1224 9.64648H9.80566V50.7917H61.5293L52.1224 9.64648Z" />
      </clipPath>
      <linearGradient
        id="paint0_linear_3654_5623"
        x1={127.698}
        y1={-17.3032}
        x2={95.3189}
        y2={105.592}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#626262" />
        <stop offset={1} />
      </linearGradient>
      <linearGradient
        id="paint1_linear_3654_5623"
        x1={60.6226}
        y1={34.5}
        x2={11.9004}
        y2={14.6388}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DCC4FF" />
        <stop offset={0.5} stopColor="#B0F5FF" />
        <stop offset={1} stopColor="#E1FF8B" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgMenuMobile;
