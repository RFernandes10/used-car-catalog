const CACHE = "marcio-veiculos-v1";
const STATIC_ASSETS = [
  "/",
  "/catalogo",
  "/sobre",
  "/contato",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  if (url.pathname.startsWith("/images/")) {
    event.respondWith(
      caches.open(CACHE).then((cache) =>
        fetch(request)
          .then((res) => { cache.put(request, res.clone()); return res; })
          .catch(() => caches.match(request))
      )
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then((res) => {
      if (res.ok && request.method === "GET") {
        const cloned = res.clone();
        caches.open(CACHE).then((cache) => cache.put(request, cloned));
      }
      return res;
    }))
  );
});
