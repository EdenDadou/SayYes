import type { MetaFunction } from "@remix-run/node";
import "~/styles/tailwind.css";
import Desktop from "~/components/Layout/Desktop";
import { useViewport } from "~/utils/hooks/useViewport";
import Mobile from "~/components/Layout/Mobile";

export const VIDEO_DURATION = 4.5;

export const meta: MetaFunction = () => {
  return [
    { title: "Say Yes !" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const isMobile = useViewport();

  return !isMobile ? <Desktop /> : <Mobile />;
}
