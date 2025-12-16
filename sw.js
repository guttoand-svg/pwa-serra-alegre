const CACHE_NAME = "serra-alegre-v3";

const URLS_TO_CACHE = [
  "https://fzserraalegre.blogspot.com/",
  "https://fzserraalegre.blogspot.com/?m=1",
  "https://fzserraalegre.blogspot.com/p/test_89.html",
  "https://fzserraalegre.blogspot.com/p/test_89.html?m=1"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache =>
          cache.put(event.request, clone)
        );
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
