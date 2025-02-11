const CACHE_NAME = "logistics-app-cache-v1";
const urlsToCache = [
    "index.html",
    "style.css",
    "app.js",
    "manifest.json",
    "icons/icon-192.png",
    "icons/icon-512.png"
];

// 서비스 워커 설치 및 캐싱
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

// 요청을 가로채서 캐시에서 제공
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// 오래된 캐시 삭제
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});
