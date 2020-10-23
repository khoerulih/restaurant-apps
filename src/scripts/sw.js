/* eslint-disable import/no-extraneous-dependencies */
import 'regenerator-runtime/runtime';
import { registerRoute } from 'workbox-routing/registerRoute';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration/ExpirationPlugin';
import { setCacheNameDetails, skipWaiting, clientsClaim } from 'workbox-core';

skipWaiting();
clientsClaim();

setCacheNameDetails({
  precache: 'precache',
  runtime: 'runtime',
  prefix: 'mangeons',
});

precacheAndRoute(
  [
    ...self.__WB_MANIFEST,
    {
      url: 'https://fonts.googleapis.com/css2?family=Karma:wght@300;400;500;600;700&display=swap',
      revision: 1,
    },
  ],
  {
    ignoreURLParametersMatching: [/.*/],
  },
);

registerRoute(
  ({ url }) => url.origin === 'https://dicoding-restaurant-api.el.r.appspot.com',
  new NetworkFirst({
    cacheName: 'restaurant-api',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 80,
        maxAgeSeconds: 14 * 24 * 60 * 60,
      }),
    ],
  }),
);

registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 80,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
);

registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new StaleWhileRevalidate({
    cacheName: 'fonts-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 80,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
);

registerRoute(
  ({ url }) => url.origin === 'https://kit-free.fontawesome.com',
  new StaleWhileRevalidate({
    cacheName: 'fontawesome-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 80,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
);

cleanupOutdatedCaches();
