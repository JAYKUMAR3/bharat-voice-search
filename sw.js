const cacheName = 'bharat-cache-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './image/bharat_logo.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});