/* Service worker Diangou Diadia — app shell en cache, fonctionne hors-ligne.
   Incrémenter CACHE à chaque déploiement pour forcer la mise à jour. */
const CACHE = 'diangou-diadia-v5';
const SHELL = [
  './',
  'index.html',
  'styles.css',
  'app.js',
  'manifest.json',
  'fonts/fonts.css',
  'fonts/unbounded-500-latin.woff2',
  'fonts/unbounded-700-latin.woff2',
  'fonts/unbounded-800-latin.woff2',
  'fonts/manrope-400-latin.woff2',
  'fonts/manrope-500-latin.woff2',
  'fonts/manrope-600-latin.woff2',
  'fonts/manrope-700-latin.woff2',
  'fonts/manrope-800-latin.woff2',
  'fonts/noto-naskh-arabic-400-arabic.woff2',
  'fonts/noto-naskh-arabic-400-latin.woff2',
  'fonts/noto-naskh-arabic-500-arabic.woff2',
  'fonts/noto-naskh-arabic-500-latin.woff2',
  'fonts/noto-naskh-arabic-700-arabic.woff2',
  'fonts/noto-naskh-arabic-700-latin.woff2',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png'
];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

/* Polices et icônes ne changent jamais : cache d'abord.
   Code de l'app (html/css/js) : réseau d'abord pour recevoir les mises à jour
   immédiatement, cache en secours pour le hors-ligne. */
function fetchAndCache(req){
  return fetch(req).then(res=>{
    if(res.ok){
      const copy = res.clone();
      caches.open(CACHE).then(c=>c.put(req, copy));
    }
    return res;
  });
}
self.addEventListener('fetch', e=>{
  if(e.request.method!=='GET') return;
  const url = new URL(e.request.url);
  if(url.origin!==location.origin) return;
  if(/\.(woff2|png)$/.test(url.pathname)){
    e.respondWith(
      caches.match(e.request, {ignoreSearch:true}).then(hit=>hit || fetchAndCache(e.request))
    );
  } else {
    e.respondWith(
      fetchAndCache(e.request).catch(()=>
        caches.match(e.request, {ignoreSearch:true}).then(hit=>hit || caches.match('index.html'))
      )
    );
  }
});
