//Service worker

if('serviceWorker' in navigator){
    console.log('si tiene sw');

    navigator.serviceWorker.register('./sw.js')
                    .then(res => console.log('serviceworker cargado correctamente'))
                    .catch(err => console.log('Serviceworker no se pudo cargar'))
    
}else{
    console.log('no se pudo');
    
}