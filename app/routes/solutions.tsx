import type { MetaFunction } from "@remix-run/node";
import "~/styles/tailwind.css";
import { useViewport } from "~/utils/hooks/useViewport";
import Header from "~/components/Header";

export const VIDEO_DURATION = 4.5;

export const meta: MetaFunction = () => {
  return [
    { title: "Say Yes !" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Solutions() {
  //   const isMobile = useViewport();

  return (
    <div>
      <Header />
      {/* <Footer /> */}
    </div>
  );
}
