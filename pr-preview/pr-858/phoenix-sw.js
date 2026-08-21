const CACHE = 'phoenix-v1'
const ASSETS = [
  './phoenix.html',
  './phoenix.webmanifest',
  './phoenix-sw.js',
  './app icons/op-phoenix-icon.png',
]
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)))
  self.skipWaiting()
})
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  )
  self.clients.claim()
})
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return
  e.respondWith(
    caches.match(e.request).then(
      (res) =>
        res ||
        fetch(e.request)
          .then((net) => {
            const copy = net.clone()
            caches.open(CACHE).then((c) => c.put(e.request, copy))
            return net
          })
          .catch(() => caches.match('./phoenix.html'))
    )
  )
})
