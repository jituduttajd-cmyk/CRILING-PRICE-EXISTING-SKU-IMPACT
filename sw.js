const CACHE = "ceiling-compare-v11";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {

  const request = event.request;

  /*
   * index.html / navigation:
   * Network first so latest GitHub version is loaded.
   */
  if (
    request.mode === "navigate" ||
    request.url.endsWith("/index.html")
  ) {

    event.respondWith(

      fetch(request)
        .then(response => {

          const copy = response.clone();

          caches.open(CACHE).then(cache => {
            cache.put(request, copy);
          });

          return response;

        })
        .catch(() => {

          return caches.match(request)
            .then(cached => {

              return cached ||
                     caches.match("./index.html");

            });

        })

    );

    return;
  }

  /*
   * Other files:
   * Cache first, then network.
   */
  event.respondWith(

    caches.match(request)
      .then(cached => {

        if (cached) {
          return cached;
        }

        return fetch(request)
          .then(response => {

            if (
              response &&
              response.status === 200
            ) {

              const copy = response.clone();

              caches.open(CACHE).then(cache => {
                cache.put(request, copy);
              });

            }

            return response;

          });

      })

  );

});
