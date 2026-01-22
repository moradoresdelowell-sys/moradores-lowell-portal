// Service Worker para PWA - Versão Completa
const CACHE_NAME = 'mdl-portal-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/carrega-conteudo.js',
    '/firebase-config.js',
    '/logo-moradores.png'
];

// Instalação - Armazena arquivos no cache
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Ativação - Limpa caches antigos
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch - Serve arquivos do cache quando offline
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Retorna do cache se encontrar, senão vai pra internet
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});