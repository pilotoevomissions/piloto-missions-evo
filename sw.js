/* EVO Missions · service worker: guarda o app no aparelho para abrir sem internet.
   Os DADOS dos alunos não passam por aqui: ficam no localStorage do aparelho. */
const VERSION = "evo-campo-v0.3.5";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./apple-touch-icon.png", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
/* Cache primeiro (abre na hora, mesmo sem sinal); com internet, atualiza a cópia em segundo plano. */
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  const isPage = req.mode === "navigate";
  e.respondWith(caches.open(VERSION).then(async c => {
    const hit = await c.match(isPage ? "./index.html" : req, { ignoreSearch: true });
    const net = fetch(req).then(r => { if (r && r.ok) c.put(isPage ? "./index.html" : req, r.clone()); return r; }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    return (await net) || new Response("Sem conexão e sem cópia salva. Abra o app uma vez com internet.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }));
});
self.addEventListener("message", e => { if (e.data === "skipWaiting") self.skipWaiting(); });
