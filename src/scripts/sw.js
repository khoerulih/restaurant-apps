/* eslint-disable import/no-extraneous-dependencies */
import 'regenerator-runtime';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { precacheAndRoute } from 'workbox-precaching';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { setCacheNameDetails, skipWaiting, clientsClaim } from 'workbox-core';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

skipWaiting();
clientsClaim();

setCacheNameDetails({ precache: 'precache' });
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) => url.origin === 'https://dicoding-restaurant-api.el.r.appspot.com',
  new NetworkFirst({
    cacheName: 'restaurant-api',
  }),
);

registerRoute(
  ({ url }) => url.origin === 'https://kit-free.fontawesome.com',
  new CacheFirst({
    cacheName: 'font-awesome',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  }),
);

setCatchHandler(new StaleWhileRevalidate());
