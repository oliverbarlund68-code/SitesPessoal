const NOME_CACHE = 'Cine-Club-v1';

const urlParaCachear = [
    './index5.html',
    './css/style3.css',
    './script3.js',
    './img/icon-192x192.png',
    './img/icon-512x512.png'
];
self.addEventListener('install', (evento) => {
    evento.waitUntil(
        caches.open(NOME_CACHE).then((cache) => {
            console.log("Arquivo em cache com sucesso")
            return cache.addAll(urlParaCachear);
        })
    )
})
self.addEventListener('fetch', (evento) => {
    evento.respondWith(
        caches.match(evento.request).then((respostaCache) => {
            return respostaCache || fetch(evento.request);
        })
    )
})