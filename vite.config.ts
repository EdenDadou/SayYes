import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa"; // Si tu veux transformer ton app en PWA
import viteImagemin from 'vite-plugin-imagemin'; // Compression des images
import svgr from 'vite-plugin-svgr';
import svgo from 'vite-plugin-svgo';

export default defineConfig({
  // Inclure des fichiers spécifiques (par exemple, les polices)
  assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2', '**/*.svg'],

  // Configuration pour optimiser le bundling et le cache
  build: {
    target: "esnext", // Utilise les dernières fonctionnalités ES
    outDir: "dist", // Répertoire de sortie
    sourcemap: false, // Désactiver les sourcemaps en production pour de meilleures performances
    chunkSizeWarningLimit: 500, // Alerte si un chunk dépasse 500KB
    rollupOptions: {
      output: {
        // Cache-busting pour les fichiers JS/CSS
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },

  // Plugins
  plugins: [
    // Plugin Remix pour gérer la partie Remix
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    // Plugin pour gérer les chemins de tsconfig
    tsconfigPaths(),
    svgr(), // Ajout du plugin SVG
    svgo(),


    // Plugin pour compresser les images en production
    viteImagemin({
      gifsicle: {
        optimizationLevel: 3,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 75,
      },
      pngquant: {
        quality: [0.65, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            removeViewBox: false,
          },
        ],
      },
    }),

    // Si tu veux ajouter une PWA (Progressive Web App)
    VitePWA({
      registerType: 'autoUpdate',  // Auto mise à jour de la PWA
      devOptions: {
        enabled: true,  // Active en mode dev pour tester la PWA
      },
      manifest: {
        name: 'Mon App Remix',
        short_name: 'App Remix',
        description: 'Mon application Remix avec Tailwind CSS',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],

  // Optimisation des dépendances pour les temps de démarrage
  optimizeDeps: {
    include: ['@remix-run/react', 'react', 'react-dom'], // Liste des dépendances essentielles
  },
});
