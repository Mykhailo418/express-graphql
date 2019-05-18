// Service Worker
// -- https://developer.mozilla.org/ru/docs/Web/API/Service_Worker_API/Using_Service_Workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
  //navigator.serviceWorker.register('/sw_cached_site.js', { scope: '/' })
  .then(function(reg) {
    // регистрация сработала
    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }
  })
  .catch(function(error) {
    // регистрация прошла неудачно
    console.log('Registration failed with ' + error);
  });
};
