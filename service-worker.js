<<<<<<< HEAD
const CACHE_NAME = "logistics-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/main.html",
  "/style.css",
  "/app.js",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

// 서비스 워커 설치 및 캐시 저장
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

=======
<<<<<<< HEAD
self.addEventListener('install', function(event) {
  console.log('Service Worker Installed');
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker Activated');
=======
const CACHE_NAME = "logistics-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/main.html",
  "/style.css",
  "/app.js",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

// 서비스 워커 설치 및 캐시 저장
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

>>>>>>> 660441b (병합 충돌 해결)
// 네트워크 요청 시 캐시 확인 후 반환
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// 새로운 서비스 워커 활성화 시 캐시 정리
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
<<<<<<< HEAD
=======
>>>>>>> 376fd42 (PWA 적용)
>>>>>>> 660441b (병합 충돌 해결)
});
