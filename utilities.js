function getPolygonCoordFromgeoJSON(polygonString) {
  /*  Authors: Nathan Fox
      Updated: Apr 11, 2018 by Nathan Fox

      Retrieves an array of lat/long coordinates from a geoJSON String
      in a format suitable for Leaflet.

      Arguments:
        polygonString: String in geoJSON form of a Cadastre Polygon.
      Output:
        polygonCoord: 2-D array of lat/long coordinates:
                        [[lat1, long1], ..., [latN, longN]].
  */
  var polygonCoord = JSON.parse(geoJSONString).geometry.coordinates;
  for (var i = 0; i < polygonCoord.length; i++){
    arr[i].reverse();
  }
  return polygonCoord;
}

function setPolygonCoordtogeoJSON(polygonCoord, polygonString) {
    /*  Authors: Nathan Fox
        Updated: Apr 11, 2018 by Nathan Fox

        Sets an array of lat/long coordinates into an existing geoJSON Polygon
        object in a String format. If this is for a new geoJSON Polygon object,
        pass an empty geoJSON string object; see newPolygonObj() and
        JSON.stringify().

        Arguments:
            polygonCoord: 2-D Array of lat/long coordinates:
                        [[lat1, long1], ..., [latN, longN]].
            polygonString: String for geoJSON Polygon object.
        Returns:
            polygonString: String for geoJSON Polygon object with new array of
                           coordinates.
    */
    //geoJSON requires [long, lat], but Leaflet uses [lat, long]
    for (i = 0; i < polygonCoord.length; i++) {
        temp = polygonCoord[i][0];
        polygonCoord[i][0] = polygonCoord[i][1];
        polygonCoord[i][1] = temp;
    }

}
