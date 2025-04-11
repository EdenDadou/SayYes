import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import * as styles from "./styles/index.css";
import Page404 from "./components/404";
import { useViewport } from "./utils/hooks/useViewport";
import Page404Mobile from "./components/404/mobile/Page404Mobile";

export function links() {
  return styles;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="w-screen h-auto">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <link rel="preload" as="image" href="/images/modal/bg.png" />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const isMobile = useViewport();
  return !isMobile ? <Page404 /> : <Page404Mobile />;
}
