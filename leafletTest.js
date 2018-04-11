console.log('working');
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

var marker = L.marker([51.5, -0.09]).addTo(mymap);



var popup = L.popup();
// for the polygon coordinates [lat, long]
var coordinates = [];

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
    // circle scales with map. we don't want that.
    var circle = L.circle([e.latlng.lat,e.latlng.lng], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 20
    }).addTo(mymap);
    coordinates.push([e.latlng.lat,e.latlng.lng])
}

mymap.on('click', onMapClick);

document.getElementById("createPolygon").addEventListener("click", function() {
    var polygon = L.polygon(coordinates).addTo(mymap);
    coordinates = [];
}, false);
