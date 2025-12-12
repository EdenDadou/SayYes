// Service Worker pour cache des images optimisées
const CACHE_NAME = "sayyes-images-v1";
const IMAGE_CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 jours

// URLs à mettre en cache
const isImageRequest = (url) => {
  return (
    url.pathname.startsWith("/api/image") ||
    url.pathname.startsWith("/images/") ||
    url.pathname.startsWith("/uploads/") ||
    /\.(png|jpg|jpeg|webp|avif|gif|svg)$/i.test(url.pathname)
  );
};

// Installation du Service Worker
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// Activation et nettoyage des anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith("sayyes-") && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Stratégie Cache-First pour les images
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Ne gérer que les requêtes d'images
  if (!isImageRequest(url)) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Vérifier le cache
      const cachedResponse = await cache.match(event.request);

      if (cachedResponse) {
        // Vérifier si le cache n'est pas expiré
        const cachedDate = cachedResponse.headers.get("sw-cached-date");
        if (cachedDate) {
          const age = Date.now() - parseInt(cachedDate, 10);
          if (age < IMAGE_CACHE_DURATION) {
            return cachedResponse;
          }
        } else {
          // Pas de date = ancien cache, on le retourne quand même
          return cachedResponse;
        }
      }

      // Sinon, fetch et mettre en cache
      try {
        const networkResponse = await fetch(event.request);

        // Ne mettre en cache que les réponses valides
        if (networkResponse.ok) {
          // Cloner la réponse pour ajouter notre header de date
          const responseToCache = new Response(networkResponse.clone().body, {
            status: networkResponse.status,
            statusText: networkResponse.statusText,
            headers: new Headers(networkResponse.headers),
          });
          responseToCache.headers.set("sw-cached-date", Date.now().toString());

          cache.put(event.request, responseToCache);
        }

        return networkResponse;
      } catch (error) {
        // En cas d'erreur réseau, retourner le cache même expiré
        if (cachedResponse) {
          return cachedResponse;
        }
        throw error;
      }
    })
  );
});

// Écouter les messages pour vider le cache manuellement
self.addEventListener("message", (event) => {
  if (event.data === "CLEAR_IMAGE_CACHE") {
    caches.delete(CACHE_NAME).then(() => {
      event.ports[0].postMessage({ cleared: true });
    });
  }
});
