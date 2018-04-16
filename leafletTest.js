// loads a Leaflet map and sets the center coordinate
var mymap = L.map('mapid').setView([4.629159, -74.077034], 6);

// loads actual images of the world
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
}).addTo(mymap);

var popup = L.popup();
// for the polygon coordinates [lat, long]
// append coordinate pairs to this, and when you click Complete Polygon, it
// clears it and passes it to a geoJSON polygon
var coordinates = [];

// loads a geoJSON object array of preexisting polygons to display at start
L.geoJSON(myObjects).addTo(mymap);

//
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
    // circle scales with map. we don't want that.
    var circle = L.circleMarker([e.latlng.lat,e.latlng.lng], {
        radius: 2
    }).addTo(mymap);
    // pushes this point to be added to the polygon
    coordinates.push([e.latlng.lat,e.latlng.lng])
}

mymap.on('click', onMapClick);

//
document.getElementById("createPolygon").addEventListener("click", function() {
  // TODO want to add to geoJSON layer, not polygon layer
    var polygon = L.polygon(coordinates).addTo(mymap);
    // console.log(JSON.stringify(polygon.toGeoJSON()));
    coordinates = [];
}, false);
