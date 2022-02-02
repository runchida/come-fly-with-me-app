import { precacheAndRoute } from 'workbox-precaching';
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('fetch', (event) => {
    console.log('This is Service Worker responding')
    event.respondWith(
        new Response(null, { "status": 400 })
    )
});
