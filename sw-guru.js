// Service Worker sederhana untuk AbsensiTK Guru
// Fungsinya: bikin app bisa di-install (syarat wajib PWA) dan cache halaman
// utama supaya tetap bisa dibuka (walau data presensi tetap perlu internet).
const CACHE_NAME = 'absensitk-guru-v1';
const FILES_TO_CACHE = [
  './index.html',
  './manifest-guru.json',
  './icon-guru-192.png',
  './icon-guru-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network-first: selalu coba internet dulu (supaya data selalu terbaru),
  // baru fallback ke cache kalau offline.
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});

// ===== WEB PUSH NOTIFICATION =====
// Diterima walau aplikasi tertutup / HP terkunci, selama browser masih
// aktif di latar belakang sistem (bukan force-close total oleh pengguna).
self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch(e) {}
  const title = data.title || 'AbsensiTK Guru';
  const options = {
    body: data.body || '',
    icon: 'icon-guru-192.png',
    badge: 'icon-guru-192.png',
    vibrate: [120, 60, 120],
    data: { url: data.url || './index.html' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || './index.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
