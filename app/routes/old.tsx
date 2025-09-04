import type { MetaFunction } from "@remix-run/node";
import "~/styles/tailwind.css";
import { useViewport } from "~/utils/hooks/useViewport";
import React, { Suspense } from "react";

const Mobile = React.lazy(() => import("~/components/Layout/Mobile"));
const Desktop = React.lazy(() => import("~/components/Layout/Desktop"));

export const VIDEO_DURATION = 4.5;

export const meta: MetaFunction = () => {
  return [
    { title: "Say Yes !" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const isMobile = useViewport();

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      {!isMobile ? <Desktop /> : <Mobile />}{" "}
    </Suspense>
  );
}
