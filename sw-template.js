/* global self, caches, URL, fetch */
var TO_CACHE = '{{URLS}}'
var FALLBACKS = '{{FALLBACKS}}'
var CACHE_NAME = 'assets-cache-v1'

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(TO_CACHE)
      })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        var pathname = new URL(event.request.url).pathname

        if (response) {
          console.log('serving from cache: ', pathname)
          return response
        }

        var fallbackUrl = FALLBACKS[pathname]
        if (fallbackUrl) {
          console.log('serving fallback: ', pathname)
          return caches.match(fallbackUrl)
        }

        if ('{{ALLOW_NETWORK}}') {
          // fetch from server
          return fetch(event.request)
        }
      })
  )
})
