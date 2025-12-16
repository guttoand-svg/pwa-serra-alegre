const CACHE = "serra-alegre-v1";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll([
        "https://fzserraalegre.blogspot.com/"
      ])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
