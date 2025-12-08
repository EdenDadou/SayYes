import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import * as styles from "./styles/index.css";
import Page404 from "./components/Screens/404";
import { useViewport } from "./utils/hooks/useViewport";
import Page404Mobile from "./components/Screens/404/mobile/Page404Mobile";
import { PortfolioProvider } from "./contexts/PortfolioContext";
import { ScrollLockProvider } from "./contexts/ScrollLockContext";

export function links() {
  return styles;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="w-full h-auto overflow-x-hidden">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* Fallback JS pour animer --angle sur Safari iOS qui ne supporte pas @property */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var needsFallback = false;
                try {
                  CSS.registerProperty({
                    name: '--test-angle-support',
                    syntax: '<angle>',
                    inherits: false,
                    initialValue: '0deg'
                  });
                } catch (e) {
                  needsFallback = true;
                }
                if (needsFallback) {
                  document.documentElement.classList.add('no-css-property');
                  var angle = 0;
                  function animate() {
                    angle = (angle + 0.6) % 360;
                    document.documentElement.style.setProperty('--angle', angle + 'deg');
                    requestAnimationFrame(animate);
                  }
                  requestAnimationFrame(animate);
                }
              })();
            `,
          }}
        />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ScrollLockProvider>
      <PortfolioProvider>
        <Outlet />
      </PortfolioProvider>
    </ScrollLockProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const isMobile = useViewport();

  // Attendre que le viewport soit détecté pour éviter le flash
  if (isMobile === null) {
    return null;
  }

  // Afficher la page 404 uniquement pour les erreurs de route (404)
  if (isRouteErrorResponse(error) && error.status === 404) {
    return !isMobile ? <Page404 /> : <Page404Mobile />;
  }

  // Pour les autres erreurs, on peut afficher un message générique
  // ou relancer l'erreur pour le débogage
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Une erreur est survenue</h1>
        <p className="mt-2 text-gray-600">Veuillez réessayer plus tard.</p>
      </div>
    </div>
  );
}
