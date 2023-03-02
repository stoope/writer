const cacheName = "v1";

self.addEventListener("fetch", async function (event) {
  if (event.request.destination === "font") {
    event.respondWith(
      caches.open(cacheName).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchedResponse = fetch(event.request).then(
            (networkResponse) => {
              cache.put(event.request, networkResponse.clone());

              return networkResponse;
            }
          );

          return cachedResponse || fetchedResponse;
        });
      })
    );
  } else {
    return;
  }
});
