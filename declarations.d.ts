declare module "tailwindcss-textshadow";
declare module "tailwind-scrollbar-hide";
declare module "react-intersection-observer";

declare module "*.svg" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}
