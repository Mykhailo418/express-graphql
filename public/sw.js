const cacheName = 'v1';
this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) { // create new cache
      return cache.addAll([
        'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css',
        '/comp/app.js',
        '/users',
        '/create',
        '/addCompany',
      ]);
    })
  );
});
this.addEventListener('activate', function(event) {
  console.log('Service Worker Activated Event - ',event);
  // Remove unwanted caches
  event.waitUntil(
    caches.keys().then( cacheNames => {
      return Promise.all(
        cacheNames.map((cache) => {
          if(cache !== cacheName){
            console.log('Remove old cache',cache);
            return caches.delete(cache)
          }
        })
      );
    })
  );
});
this.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();

        caches.open(cacheName).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function (err) {
        console.error(err);
      });
    }
  }));
});

this.addEventListener('push', function(event) {
  console.log('push: ',event);
});
