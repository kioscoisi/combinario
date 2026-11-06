// Funciona sin conexión: guarda la app y sus librerías. Los resultados (/selae/, /espn/) siempre van a internet.
const V = 'app-1794004973';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png',
  'lib/qrcode.min.js', 'lib/jsQR.min.js', 'lib/jspdf.umd.min.js', 'lib/zxing.min.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || u.pathname.startsWith('/selae/') || u.pathname.startsWith('/espn/')) return;
  if (e.request.mode === 'navigate') {   // la app: primero internet (para coger la versión nueva), si no hay, la guardada
    e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(V).then(c => c.put('index.html', cp)); return r; })
      .catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
