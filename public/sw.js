/* Offline cache for the pamphlet. Static assets (textures, photos, fonts, JS) are
   cache-first; the page itself is network-first with a cached fallback. */
const VERSION = "v1";
const CACHE = `pamphlet-${VERSION}`;
const PRECACHE = [
  "/p",
  "/panels/front.webp", "/panels/flap.webp", "/panels/inside-a.webp",
  "/panels/inside-b.webp", "/panels/inside-c.webp", "/panels/back.webp",
  "/product/step-1.webp", "/product/step-2.webp", "/product/step-3.webp", "/product/step-4.webp",
  "/brand/edusphere-mark-white.png", "/brand/edusphere-mark-black.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

const isStatic = (url) =>
  url.origin === self.location.origin &&
  (url.pathname.startsWith("/_next/static/") || /^\/(panels|product|brand)\//.test(url.pathname) || /\.(webp|png|jpg|woff2|js|css)$/.test(url.pathname));

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (isStatic(url)) {
    e.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone()));
            return res;
          }),
      ),
    );
    return;
  }

  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          caches.open(CACHE).then((c) => c.put("/p", res.clone()));
          return res;
        })
        .catch(() => caches.match("/p")),
    );
  }
});
