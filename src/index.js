import 'babel-polyfill'
import {validateIp,addTileLayer,getAddress,addOffset} from './helpers';
import 'leaflet/dist/leaflet.css';
import icon from '../images/icon-location.svg'


const ipinput = document.querySelector('input');
const btn = document.querySelector('button')
const ipInfo = document.getElementById('ip')
const locationInfo = document.getElementById('location')
const timezoneInfo = document.getElementById('timezone')
const ispInfo = document.getElementById('isp')

let map = L.map('map').setView([51.505, -0.09], 13);
let markerIcon = L.icon({
    iconUrl: icon,
    iconSize:     [38, 65], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 64], // point of the icon which will correspond to marker's location
});

// добавляем карту
addTileLayer(map)

btn.addEventListener('click', getData);
ipinput.addEventListener('keydown', handleKey)

// получение данных по IP
function getData(){
    if(validateIp(ipinput.value)){
        getAddress(ipinput.value)   // асинхронная функция, обрабатываем через then нотацию, возвращает промис
            .then(setInfo)
    }
}
      
// обработчик ввода IP по enter
function handleKey(e){
    if (e.key === 'Enter'){
        getData()
    }
}

//вывод прлученной информации
function setInfo(mapData){

    ipInfo.innerText = mapData.ip
    locationInfo.innerText = `${mapData.location.region},
    ${mapData.location.city}`
    timezoneInfo.innerText = `UTC ${mapData.location.timezone}`;
    ispInfo.innerText = mapData.isp
    positionOnMap(mapData)
    // проверяем разрешение
    if(matchMedia('(max-width: 1023px)').matches){
        addOffset(map)
    }
    
}

//вывод поленной инфорации на карту
function positionOnMap(mapData){

    console.log(mapData)
    let x = mapData.location.lat
    let y = mapData.location.lng
    L.marker([x, y],{icon: markerIcon}).addTo(map);
    map.setView([x, y], 13)

}

// предустанавил какое то значение на карте
document.addEventListener('DOMContentLoaded', () =>{
    getAddress('102.22.33.1').then(setInfo)
})



