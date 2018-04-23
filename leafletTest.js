var mapboxUrl = 'https://api.mapbox.com/styles/v1/dmichaels19/cjg2p9i8604622spb0mwgn5x1/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZG1pY2hhZWxzMTkiLCJhIjoiY2pnMm91ZWx6MDAybDJxbzNkbHpvbHI4NSJ9.QMGAMC9IgPony0j7FwPrNA';
// TODO edit attribution to mapbox
var mapboxAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
var map = new L.Map('mapid', { center: new L.LatLng(4.63, -74.1), zoom: 13 });
var mapbox = L.tileLayer(mapboxUrl, { maxZoom: 20, attribution: mapboxAttrib }).addTo(map);
var drawnItems = L.featureGroup().addTo(map);

map.addControl(new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        poly: { allowIntersection: false }
    },
    draw: {
        polygon: { allowIntersection: false, showArea: true }
    }
}));

map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    drawnItems.addLayer(layer);
});

// fetch("url", {
//   method: "GET"
// })
// .then(function(res){
//   return res.json()
// }).then(function(res){
//   L.geoJSON(res).addTo(map);
// })
