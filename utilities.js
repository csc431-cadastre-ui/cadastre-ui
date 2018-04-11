function getPolygonCoordFromgeoJSON(geoJSONString) {
    /*  Author: Nathan Fox
        Updated: Apr 11, 2018
        
        Retrieves an array of lat/long coordinates from a geoJSON String
        in a format suitable for Leaflet.

        Input: String in geoJSON form of a Cadastre Polygon.
        Output: 2-D array of lat/long coordinates: [[lat1, long1], ..., [latN, longN]];
    */
    var polygonCoord = JSON.parse(geoJSONString).geometry.coordinates;
    var i, temp;
    for (i = 0; i < polygonCoord.length; i++) {
        temp = polygonCoord[i][0];
        polygonCoord[i][0] = polygonCoord[i][1];
        polygonCoord[i][1] = temp;
    }
    return polygonCoord;
}
