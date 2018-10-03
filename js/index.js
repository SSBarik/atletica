//http://sta.sh/0u3oh93m17
var canvas;
var context;
var screenWidth;
var screenHeight;
var doublePI = Math.PI * 2;
var step = 0;
// a collection of meteorites
var points = [];
//Focal length determines the view angle of a lens. Longer focal length means a narrower view angle.
var focalLength = 70;
//bgGradient is used to define fillstyle, which sets the color and gradient of the canvas
//var bgGradient;
//use to check if the meteorites is out of the universe
var TrajectoryRadius;
//universeRadiusDefined changes as the screen recises
var universeRadiusDefined;

window.onload = function()
{
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    //window.onresize - An event handler for the resize event on the window.
    window.onresize = function()
	{	
    //set the height and width of the canvas the same as the screen size
		screenWidth = window.innerWidth;
		screenHeight = window.innerHeight;
      
    universeRadiusDefined = screenWidth/6;
		// define the height, width of the canvas
		canvas.width = screenWidth;
		canvas.height = screenHeight;
		//createRadialGradient() method creates a radial/circular gradient object in canvas
		bgGradient=context.createRadialGradient(screenWidth /2, screenHeight / 2, screenWidth, screenWidth / 2, screenHeight / 2, 0);
		//create a mixture of black and red radial gradient, outer shell is red, innershell is black
		bgGradient.addColorStop(0.8, '#000');
		//bgGradient.addColorStop(0.8, '#000');
		bgGradient.addColorStop(0.7, '#FFFFFF');
	};
  //set up the background
	window.onresize();
	//generates an array of points
	generatePoints();
	//creates animation and graphics
    loop();
};

// used for loop() to update the animation frames
//allows modern browsers to stop drawing graphics when a tab or window is not visible.
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( callback ){
				window.setTimeout(callback, 1000 / 60);
			};
})();
// generates an array of points as meteorites
function generatePoints()
{
	for(var i = 1000; i > -1; i--)
	{	
		//generate random points and store them in points[]
		var point3D = {x:(1 - Math.random() * 2) * 500, y:(1-Math.random() * 2) * 500, z:(1 - Math.random() * 2) * 500, vx:0, vy:0, vz:0};

		points.push(point3D);
	}
}
// set a time loop to update the animation frame every few seconds
function loop()
{
  //set transpancy to 40%
	context.globalAlpha = 0.1;
	//renders the radial gradient of the background
	context.fillStyle = bgGradient;
	//set the fillStyle to cover the whole screen window
	context.fillRect(0, 0, screenWidth, screenHeight);
	//when updating the meteorites set the transparency back to 100%
	context.globalAlpha = 3;
	//draw the shooting meteorites animation
	updatePoints();
	//render the shooting meteroriets
	//renderPoints();
	//draw lightenings of meteorites in the back ground
	renderLightening();

	step += 0.3;
	//call the requestionAnimFrame to update the animatino frames
	requestAnimFrame(loop);

	//draw flashing text in the canvas
	/*context.font = "20px Arial";
	//if(Math.random() > 0.4) {
		context.fillText("The Universe.........is Infinite, so is Alex's power !!",5,30);
		//context.fill();
		}
    */
}

//creates and renders the meteorites
function renderPoints()
{
	var i = points.length - 1;

	for(i; i > -1; --i)
	{
		var point = points[i];
		var scale = focalLength / (point.z + focalLength);

		var px = point.x * scale + (screenWidth / 2);
		var py = point.y * scale + (screenHeight / 2);

		//load the body of meteorites
		//drawPoint({x: px, y: py}, scale);
	}
}

//creates and renders the lightening in the background
function renderLightening()
{	//set the transpancy of the lightening
	context.globalAlpha = 0.2;
	//set the line width of the lightening in the back
	context.lineWidth = 0.3;
	//set the color of the lightening
	//context.strokeStyle = '#FFF';
	context.strokeStyle = '#98E2F4';
  //begin the lightening path
	context.beginPath();
	for(var i = points.length-1; i > -1; i--)
	{
		var point = points[i];
    //change the scale of the lightening as it moves closer or further away
		var scale = focalLength / (point.z + focalLength);

		if(i === points.length - 3) 
      //move from one meteorites to another, then draw the lighteningi between them
			context.moveTo(point.x * scale + (screenWidth / 2), point.y * scale + (screenHeight / 2));
			context.lineTo(point.x * scale + (screenWidth / 2 ), point.y * scale + (screenHeight / 2));
	}

	//render the lightening in certain time interval
	if(Math.random() > 0.1) {
		context.stroke();
        }
	context.closePath();
	context.globalAlpha = 1;
}

// creates the trajectory of the animation of the points
function updatePoints()
{
  //looping through the pints[] to change the trajectory of each meteorite
	for(var i = points.length-1; i > -1; --i)
	{
		points[i].x += Math.cos(step * 0.6) * 3;
		points[i].y += Math.sin(step * 0.8) * 3;
		points[i].z -= 3;

		//check to prevent the back flow of the stars
		preventBackFlow(points[i]);
    //if use launchControl instead of preventBaackFlow, the shooting stars's launching interview can be regulated
    launchControl(points[i]);
	}
}

// prevent the trajectory of the stars from going into the screen (because the tracjectory is controlled by sin and cos)
function preventBackFlow(point)
{
  //move the lightening back if it moves too close to the screen
	if(point.z < -50) 
		point.z = Math.random() * 2400 + 200;
}
//if use launchControl instead of preventBaackFlow, the shooting stars's launching interval can be regulated
function launchControl(point)
{  // move the lightening at a z-depth of 2500 if it moves too close to the screen
  if(point.z<-50){
    point.z = 2500;
  }
}

//creates and renders the body of meteorites
function drawPoint(point, scale)
{
	context.globalAlpha = scale;
	//changing the color of the meteorites based on the distance it travels
	if(point.x>screenWidth/4 && point.x<screenWidth*3/4&& point.y>screenHeight/6 && point.y<screenHeight*5/6){
  TrajectoryRadius = Math.sqrt((screenWidth/2-point.x)^2+(screenHeight/2-point.y)^2);
  //if (TrajectoryRadius > universeRadiusDefined){
	//render meteorites as green - #FFF
	context.fillStyle = '#C0F4F9';
	}else{
	//render meteorites as black
	context.fillStyle = '#C0F4F9';
	}
	context.beginPath();
	//draw square instead of arc, less CPU used also updates faster
	context.rect(point.x, point.y, scale*10.1, scale*2.1);
	context.arc(point.x,point.y,scale,0,2*Math.PI);
	context.fill();
	context.closePath();
	context.globalAlpha = 2;

}