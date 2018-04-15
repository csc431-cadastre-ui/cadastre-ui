var mymap = L.map('mapid').setView([4.629159, -74.077034], 6);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
}).addTo(mymap);

var marker = L.marker([51.5, -0.09]).addTo(mymap);

var popup = L.popup();
// for the polygon coordinates [lat, long]
var coordinates = [];

L.geoJSON(myObjects).addTo(mymap);

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
    console.log(JSON.stringify(polygon.toGeoJSON()));
    coordinates = [];
}, false);
