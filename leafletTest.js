// the url for the tiles
// var mapboxUrl = 'https://api.mapbox.com/styles/v1/dmichaels19/cjg2p9i8604622spb0mwgn5x1/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZG1pY2hhZWxzMTkiLCJhIjoiY2pnMm91ZWx6MDAybDJxbzNkbHpvbHI4NSJ9.QMGAMC9IgPony0j7FwPrNA';
var mapboxSatelliteUrl = 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NDg1bDA1cjYzM280NHJ5NzlvNDMifQ.d6e-nNyBDtmQCVwVNivz7A#2/0/0';
// attribution text
var mapboxAttrib = '&copy <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>';
// creating the actual leaflet map (with slippy functionality)
var map = new L.Map('mapid', { center: new L.LatLng(4.650814, -74.174559), zoom: 17 });
// adding the mapbox tile data as a layer to the map
// var mapbox = L.tileLayer(mapboxUrl, { maxZoom: 20, attribution: mapboxAttrib }).addTo(map);
var mapboxSatellite = L.tileLayer(mapboxSatelliteUrl, { maxZoom: 20, attribution: mapboxAttrib }).addTo(map);
// adding another layer for drawing polygons
//var drawnItems = L.featureGroup().addTo(map);

/*function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', 'existingPolygons.json', true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          callback(xobj.responseText);
        }
  };
  xobj.send(null);
}
loadJSON(function(response) {
  // Parse JSON string into object
    var existingPolygons = JSON.parse(response);
 });
 */
var existingPolygons = polygons;
var drawnPolygons = L.geoJSON(existingPolygons).addTo(map);
console.log(existingPolygons);

map.addControl(new L.Control.Draw({
    edit: {
        featureGroup: drawnPolygons,
        poly: { allowIntersection: false }
    },
    draw: {
      // polygon: { allowIntersection: false, showArea: true }
        polygon: { allowIntersection: false, metric: true,
                   shapeOptions: { color: '#ff0000'}
                 }
    }
}));

function finishPolygon(polygon) {
  polygon.type = "Feature";
  var i;

  for (i = 0; i < polygon.geometry.coordinates[0].length - 1; i++) {
    if (polygon.geometry.coordinates[0][i][0] == polygon.geometry.coordinates[0][i+1][0]
        && polygon.geometry.coordinates[0][i][1] == polygon.geometry.coordinates[0][i+1][1])
          polygon.geometry.coordinates[0].splice(i+1, 1);
  }
  //Doesn't check for uniqueness
  polygon.properties.cadastreID = (Math.floor(Math.random()*90000000) + 10000000).toString();
  polygon.properties.neighbors = [];
  return(polygon);
}

map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    //console.log(layer)
    //console.log(layer.editing._poly.toGeoJSON());
    newPolygon = layer.editing._poly.toGeoJSON();
    /*if (overlapCheck(newPolygon)) {
      //ERROR MESSAGE
    } else {
      existingPolygons.push(newPolygon);
    }*/
    existingPolygons.push(finishPolygon(newPolygon));
    drawnPolygons.addLayer(layer);
    //console.log(drawnItems);
    console.log(JSON.stringify(existingPolygons));
});

// fetch("url", {
//   method: "POST"
// })
// .then(function(res){
//   return res.json()
// }).then(function(res){
//   L.geoJSON(res).addTo(map);
// })
