/* GymBook: deja la página guardada en el teléfono para abrirla sin internet */
const C = "gymbook-v2", A = ["./", "./index.html", "./manifest.webmanifest", "./icono-180.png", "./icono-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(A)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => {
    const red = fetch(e.request).then(x => { if (x && x.ok) { const cp = x.clone(); caches.open(C).then(c => c.put(e.request, cp)); } return x; }).catch(() => r);
    return r || red;
  }));
});
