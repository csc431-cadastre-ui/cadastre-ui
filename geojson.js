
function newPolygonObj() {
  return ({type:"Feature",geometry:{type:"Polygon",coordinates:[]},properties:{cadastreID:"",neighbors:{neighborID:"",sharedpoints:[]}}})
}

function drawPolygon(polygon, ctx, rect) {
  coords = polygon.geometry.coordinates;
  ctx.fillStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(coords[0][0] - rect.left, coords[0][1] - rect.top);
  for (var i = 1; i < coords.length; i++) {
    ctx.lineTo(coords[i][0] - rect.left, coords[i][1] - rect.top);
  }
  ctx.closePath();
  ctx.fill();
}

function drawPoint(x, y, ctx, rect){
  ctx.beginPath();
  ctx.arc(x - rect.left, y - rect.top, 4, 0, 2 * Math.PI, true);
  ctx.fill();
}

function completePolygon(newpolygon, ctx, rect) {
  document.getElementById("geoJSON").innerHTML = JSON.stringify(newpolygon, null, 2);
  console.log(newpolygon)
  drawPolygon(newpolygon, ctx, rect);
  canDraw = false;
}

window.onload = function()
{
  var newpolygon = newPolygonObj();
  var canDraw = true;
  canvas = document.getElementById('map');
  var ctx = canvas.getContext('2d');
  var rect = canvas.getBoundingClientRect();

  document.getElementById("createPolygon").addEventListener("click", function() {
      completePolygon(newpolygon, ctx, rect);
  }, false);

  window.onclick = function(pos)
  {
    //window.event for IE and pos for nongarbage browsers
    var evt = window.event || pos;

    if(canDraw)
    {
      newpolygon.geometry.coordinates.push([evt.clientX,evt.clientY]);
      drawPoint(evt.clientX,evt.clientY,ctx,rect);
      document.getElementById("result").innerHTML = "Array Elements:" + JSON.stringify(newpolygon.geometry.coordinates);
    }
  }
}
