console.log('working');
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

var popup = L.popup();
// for the polygon
var coordinates = [];
var canDraw = true;

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
    coordinates.push([e.latlng.lat,e.latlng.lng])
}

mymap.on('click', onMapClick);

document.getElementById("createPolygon").addEventListener("click", function() {
    if(canDraw) {
      var polygon = L.polygon(coordinates).addTo(mymap);
    }
    canDraw = false;
}, false);
