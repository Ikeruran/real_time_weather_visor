//THIS IS A DEMO CODE, YOU HAVE TO CREATE YOUR OWN WUNDERGROUND (SEE README)
const WUNDERGROUND_KEY= "7c9622cd15be4c03kjdelsjdlsw"

navigator.geolocation.getCurrentPosition(ajaxCheckWeather, error)


function ajaxCheckWeather(resp) {

    var lat = resp.coords.latitude
    var lon = resp.coords.longitude

    //config llamada AJAX
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    var url = 
    `https://api.weather.com/v3/location/near?geocode=${lat},${lon}&product=pws&format=json&apiKey=${WUNDERGROUND_KEY}`
    

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => responseManager(JSON.parse(result)))
        .catch(error => alert('error', error));
    muestraCoordenadas(lat, lon)
}


function error(err) {
    if (err.code === 1) {
        alert("Geolocalización no activada")
    } else if (err.code === 2) {
        alert("Geolocalización no disponible")
    } else if (err.code === 3) {
        alert("Geolocalización no posible dentro del límite de tiempo")
    } else {
        alert("Geolocalización no disponible debido a un error desconocido")
    }
}

 function responseManager(resp) {
    let stationId= resp.location.stationId[0]
    console.log(stationId)
    pedirDatos(stationId)

}

async function pedirDatos(stationId){

    const response= await fetch (`https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=m&numericPrecision=decimal&apiKey=${WUNDERGROUND_KEY}`)
    const data= await response.json()
    console.log(data.observations[0])

    muestraTemperatura(data.observations[0].metric.temp)
    muestraHumedad(data.observations[0].humidity)
    muestraPrecipitacion(data.observations[0].metric.precipTotal)
    muestraUbicacion(data.observations[0].neighborhood)

}


function muestraUbicacion(ubicacion) {
    
    elemento = document.getElementById('ubicacionPedida');
    elemento.innerHTML = ubicacion;
}

function muestraTemperatura(temperatura) {
    temp = document.getElementById("temp");
    temp.innerHTML = temperatura;
}

function muestraHumedad(humedad) {
    humed = document.getElementById("humedad");
    humed.innerHTML = humedad;

}

function muestraPrecipitacion(precipitacion){
    preci = document.getElementById("precipitacion");
    preci.innerHTML = precipitacion;

}

function muestraCoordenadas(lat, lon) {
    coordenadas = document.getElementById("coordenadas");
    coordenadas.innerHTML = `<br> Latitud: ${lat} <br> Longitud: ${lon}`

}