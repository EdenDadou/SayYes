import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa"; // Si tu veux transformer ton app en PWA
// import viteImagemin from 'vite-plugin-imagemin'; // Compression des images - disabled due to macOS compilation issues
import svgr from "vite-plugin-svgr";
import svgo from "vite-plugin-svgo";
import { flatRoutes } from "remix-flat-routes";

export default defineConfig({
  server: {
    port: 4000,
    // Options pour désactiver le cache en développement
    hmr: {
      overlay: true, // Afficher les erreurs en overlay
    },
  },


  // Configuration pour gérer le cache en développement
  cacheDir:
    process.env.NODE_ENV === "development"
      ? ".vite-dev-cache"
      : "node_modules/.vite",
  // Inclure des fichiers spécifiques (polices, vidéos)
  assetsInclude: [
    "**/*.ttf",
    "**/*.woff",
    "**/*.woff2",
    "**/*.svg",
    "**/*.mp4",
    "**/*.webm",
    "**/*.ogg",
    "**/*.mov",
    "**/*.avi",
    "**/*.mkv",
  ],


  // Plugins
  plugins: [
    // Plugin Remix pour gérer la partie Remix
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      routes(defineRoutes) {
        return flatRoutes("routes", defineRoutes, {
          ignoredRouteFiles: ["**/.*"], // Ignore dot files (like .DS_Store)
        });
      },
    }),
    // Plugin pour gérer les chemins de tsconfig
    tsconfigPaths(),
    svgr(), // Ajout du plugin SVG
    svgo({
      // Configuration SVGO pour optimiser les SVG volumineux
      multipass: true, // Passe multiple pour une meilleure optimisation
    }),

    // Plugin pour compresser les images en production - disabled due to macOS compilation issues
    // You can enable this later with alternative image optimization solutions
    // viteImagemin({
    //   mozjpeg: {
    //     quality: 75,
    //   },
    //   pngquant: {
    //     quality: [0.65, 0.9],
    //     speed: 4,
    //   },
    //   svgo: {
    //     plugins: [
    //       {
    //         removeViewBox: false,
    //       },
    //     ],
    //   },
    // }),

    // Si tu veux ajouter une PWA (Progressive Web App)
    VitePWA({
      registerType: "autoUpdate", // Auto mise à jour de la PWA
      devOptions: {
        enabled: true, // Active en mode dev pour tester la PWA
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // Augmente la limite à 50 Mo pour gérer les gros assets
      },
      manifest: {
        name: "Mon App Remix",
        short_name: "App Remix",
        description: "Mon application Remix avec Tailwind CSS",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],

  // Optimisation des dépendances pour les temps de démarrage
  // Configuration améliorée pour mieux gérer les imports dynamiques de Remix
  optimizeDeps: {
    include: [
      "@remix-run/react",
      "@remix-run/node",
      "react",
      "react-dom",
    ], // Liste des dépendances essentielles
    esbuildOptions: {
      // Permet à Vite de mieux gérer les imports dynamiques
      target: "esnext",
      // Configuration pour mieux analyser les imports dynamiques
      supported: {
        "dynamic-import": true,
      },
    },
    // Exclure les modules qui utilisent des imports dynamiques avec variables
    // car ils sont gérés par Remix lui-même
    exclude: [],
  },
  // Configuration pour mieux gérer les imports dynamiques et les routes Remix
  ssr: {
    // Configuration SSR pour Remix - permet à Vite de mieux gérer les imports dynamiques
    noExternal: ["@remix-run/react"],
    resolve: {
      // Permet de résoudre correctement les imports dynamiques
      conditions: ["import", "module", "browser", "default"],
    },
  },
  // Configuration pour gérer les avertissements de build
  build: {
    target: "esnext", // Utilise les dernières fonctionnalités ES
    outDir: "dist", // Répertoire de sortie
    sourcemap: false, // Désactiver les sourcemaps en production pour de meilleures performances
    chunkSizeWarningLimit: 2000, // Alerte si un chunk dépasse 2MB (augmenté pour les gros SVG)
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignorer les avertissements sur les imports dynamiques de Remix (comportement normal)
        if (
          warning.code === "DYNAMIC_IMPORT" &&
          (warning.message?.includes("@remix-run") ||
            warning.message?.includes("route.module"))
        ) {
          return;
        }
        // Afficher les autres avertissements
        warn(warning);
      },
      output: {
        // Cache-busting pour les fichiers JS/CSS
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash][extname]",
        // Code splitting manuel pour les gros composants SVG
        manualChunks(id) {
          // Sépare les gros composants SVG dans leurs propres chunks
          if (
            id.includes("BackgroundHomepage") ||
            id.includes("BacgroundSideLueur") ||
            id.includes("BackgroundTemoignage")
          ) {
            return "background-assets";
          }
        },
      },
    },
  },
});
