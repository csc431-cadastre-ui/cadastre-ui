function newPolygonObj() {
  return ({type:"Feature",geometry:{type:"Polygon",coordinates:[]},properties:{cadastreID:"",neighbors:{neighborID:"",sharedpoints:[]}}})
}

function drawPolygon(polygon, ctx, rect) {
  coords = polygon.geometry.coordinates;

  ctx.fillStyle = '#f00';
  ctx.beginPath();
  //console.log(polygon.geometry.coordinates);
  ctx.moveTo(coords[0][0] - rect.left, coords[0][1] - rect.top);
  for (var i = 1; i < 5; i++) {
    ctx.lineTo(coords[i][0] - rect.left, coords[i][1] - rect.top);
  }
  ctx.closePath();
  ctx.fill();
}

function drawPoint(x, y, ctx, rect){
  ctx.beginPath();
  ctx.arc(arrX[i] - rect.left, arrY[i] - rect.top, 1, 0, 2 * Math.PI, true);
  ctx.stroke();
}
//This is implemented with a modifiable max right now but ideally we could
//set it up so you just click a button when you're done and then we have it
//draw a polygon from all the points clicked.

var arrayMax = 5;

//the arr variables here are arrays that are meant to store the X and Y coords
//respectively for mouse clicks

var arrX = new Array(arrayMax);
var arrY = new Array(arrayMax);
var i = 0;
var j = 0;
var printArray = "Array Elements: ";

var newpolygon = newPolygonObj();

//onload makes this run when the page loads and then onclick is whenever
//you click on that page.

window.onload = function()
{
  window.onclick = function(pos)
  {
    //event is a reserved word so gotta use evt to represent the object holding
    //the coordinates clicked among other things.  Also, the window.event part
    //is what makes this work in Internet Explorer while the value passed on
    //click is what makes it work in nongarbage browsers. (I might have reversed
    //it but wtv)

    var evt = window.event || pos;

    //Below if statement basically just puts a cap on how many points this will take
    //right now, but otherwise stores them and then prints them as proof that this
    //code actually works and I didnt just scam you with something that compiles
    //for some reason but does absolutely nothing
    canvas = document.getElementById('map');
    var ctx = canvas.getContext('2d');
    var rect = canvas.getBoundingClientRect();

    if(i < arrayMax)
    {
      arrX[i] = evt.clientX;
      arrY[i] = evt.clientY;
      drawPoint(arrX[i],arrY[i],ctx,rect);
      document.getElementById("result").innerHTML = printArray + "(" + arrX[i] + ", " + arrY[i] + ")";
      printArray = printArray + "(" + arrX[i] + ", " + arrY[i] + "); ";
      i++;
    } else {

      newpolygon.geometry.coordinates = [];
      for (j = 0; j < i; j++) {
          newpolygon.geometry.coordinates.push([arrX[j], arrY[j]]);
      }
      document.getElementById("geoJSON").innerHTML = JSON.stringify(newpolygon, null, 2);
      console.log(newpolygon)
      drawPolygon(newpolygon, ctx, rect);

    }
  }
}
