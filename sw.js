/*
 * Service worker para jugar sin conexión.
 * La portada no tiene build: la lista de archivos es fija (sube VERSION al cambiar algo).
 * Archivos: primero la caché y, en segundo plano, se actualiza desde la red.
 * Páginas: primero la red (para recibir versiones nuevas) y, sin conexión, la copia guardada.
 */
const VERSION = '2';
const CACHE = `mcl-home-${VERSION}`;
const ARCHIVOS = ['/', '/index.html', '/favicon.svg', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png', '/apple-touch-icon.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ARCHIVOS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((claves) => Promise.all(claves.filter((c) => c !== CACHE).map((c) => caches.delete(c)))).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((respuesta) => {
          if (respuesta.ok) caches.open(CACHE).then((cache) => cache.put('/index.html', respuesta.clone()));
          return respuesta;
        })
        .catch(() => caches.match('/index.html').then((r) => r || caches.match('/'))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((guardada) => {
      const red = fetch(request)
        .then((respuesta) => {
          if (respuesta.ok) {
            const copia = respuesta.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copia));
          }
          return respuesta;
        })
        .catch(() => guardada);
      return guardada || red;
    }),
  );
});
