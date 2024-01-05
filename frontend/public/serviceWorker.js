const CACHE_NAME = "Planner Bíblico"

const urls = ['index.html']

this.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urls)
        })
    )
})

this.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            return fetch(e.request).catch(() => caches.match('index.html'))
        })
    )
})

this.addEventListener('activate', (e) => {
    const cacheWhiteList = []
    cacheWhiteList.push(CACHE_NAME)
    e.waitUntil(caches.keys().then((cache) => Promise.all(cacheWhiteList.map((cacheName) => {
        if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName)
        }
    }))))
})