//asigar nombre y version de la cache
const cache_name = "v1_cache_pwa";

var urlsToCache = [
    './',
    './styles/styles.css',
    './img/azure.png',
    './img/css.png',
    './img/desarrollo-web.png',
    './img/html.png',
    './img/iis.png',
    './img/imgestudio.jpg',
    './img/imgtrabajo.jpeg',
    './img/imgyo.jpg',
    './img/js.png',
    './img/net.jpg',
    './img/netcore.png',
    './img/sql.png',
    './img/icon/icon.png',
    './img/icon/icon16.png',
    './img/icon/icon32.png',
    './img/icon/icon64.png',
    './img/icon/icon96.png',
    './img/icon/icon128.png',
    './img/icon/icon192.png',
    './img/icon/icon256.png',
    './img/icon/icon384.png',
    './img/icon/icon512.png',
    './img/icon/icon1024.png',
]

self.addEventListener('install',e => {
    e.waitUntil(
        caches.open(cache_name)
                .then(cache => {
                    return cache.addAll(urlsToCache)
                        .then(() =>{
                            self.skipWaiting();
                        })
                        .catch(err => {
                            console.log('No se ha cargado la cache', err)
                        })
                })
    )
})

//evento activate permite que trabaje offline
self.addEventListener('activate', e=> {
    //añadimos todos los elementos en la cache
    const cacheWhiteList = [cache_name];
    e.waitUntil(
        caches.keys()
                .then(cacheNames =>{
                    return Promise.all(
                        cacheNames.map(cacheName =>{
                            if(cacheWhiteList.indexOf(cacheName) === -1){
                                //borrar elements que no esten en cache
                                //o no se necesiten
                                return caches.delete(cacheName);
                            }
                        })
                    )
                })
                .then(() => {
                    //activar cache en el dispositivo
                    self.clients.claim();
                })
    )
})

self.addEventListener('fetch', e=>{
    e.respondWith(
        caches.match(e.request)
                .then(res => {
                    if(res){
                        //devuelvo datos del cache
                        return res;
                    }
                    return fetch(e.request);
                })
    )
})