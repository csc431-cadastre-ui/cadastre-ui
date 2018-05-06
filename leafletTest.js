// the url for the tiles
// var mapboxUrl = 'https://api.mapbox.com/styles/v1/dmichaels19/cjg2p9i8604622spb0mwgn5x1/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZG1pY2hhZWxzMTkiLCJhIjoiY2pnMm91ZWx6MDAybDJxbzNkbHpvbHI4NSJ9.QMGAMC9IgPony0j7FwPrNA';
var mapboxSatelliteUrl = 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NDg1bDA1cjYzM280NHJ5NzlvNDMifQ.d6e-nNyBDtmQCVwVNivz7A#2/0/0';
// attribution text
var mapboxAttrib = '&copy <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>';
// creating the actual leaflet map (with slippy functionality)
var map = new L.Map('mapid', { center: new L.LatLng(4.63, -74.1), zoom: 13 });
// adding the mapbox tile data as a layer to the map
// var mapbox = L.tileLayer(mapboxUrl, { maxZoom: 20, attribution: mapboxAttrib }).addTo(map);
var mapboxSatellite = L.tileLayer(mapboxSatelliteUrl, { maxZoom: 20, attribution: mapboxAttrib }).addTo(map);
// adding another layer for drawing polygons
var drawnItems = L.featureGroup().addTo(map);

var word = L.geoJSON(testPolygons).addTo(map);
console.log(word);

map.addControl(new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        poly: { allowIntersection: false }
    },
    draw: {
      // polygon: { allowIntersection: false, showArea: true }
        polygon: { allowIntersection: false, metric: true,
                   shapeOptions: { color: '#ff0000'}
                 }
    }
}));

map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    console.log(layer)
    console.log(layer.editing._poly.toGeoJSON());
    drawnItems.addLayer(layer);
    console.log(drawnItems);
});

// fetch("url", {
//   method: "POST"
// })
// .then(function(res){
//   return res.json()
// }).then(function(res){
//   L.geoJSON(res).addTo(map);
// })
