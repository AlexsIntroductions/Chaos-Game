var Canvas = document.getElementById("myCanvas");
//instances 2d on it
var ctx = Canvas.getContext("2d");

ctx.fillStyle = 'black';

//Variables
var pointCoords = new Array(3);
var i = 0;
var currentPoint;


//---------------OBJECTS---------------//
function Coord(x, y){
	this.x = x;
	this.y = y;
}

//---------------OBJECT FUNCTIONS---------------//
Coord.prototype.draw = function(n){
	ctx.beginPath();
	ctx.arc(this.x, this.y, n, 0, 2 * Math.PI);
	ctx.fill();
}

//---------------HELPER FUNTIONS---------------//
Canvas.addEventListener("mousedown", function(e){
	onClick(Canvas, e);
});

function setCanvasSize(){
	Canvas.width = 1750;
	Canvas.height = 800;
}

function onClick(smallCanvas, event){
	if(i < 3){
		let rect = Canvas.getBoundingClientRect();
		let x = Math.floor(event.clientX - rect.left);
		let y = Math.floor(event.clientY - rect.top);
		console.log(x + ", " + y);
		let temp = new Coord(x, y);
		pointCoords[i] = temp;
		pointCoords[i].draw(5);
		i++;
	}
	else if(i == 3){
		let rect = Canvas.getBoundingClientRect();
		let x = Math.floor(event.clientX - rect.left);
		let y = Math.floor(event.clientY - rect.top);
		currentPoint = new Coord(x, y);
		currentPoint.draw(0.1);
		i++;
	}
}

function action(){
	//change rng to eb any number of points
	
	//change the half to change based on what fractal you are doing
		//half will just be one of the options
	
	
	
	//pick point 1 - 3
	var point = Math.floor(Math.random() * 3);
	//go halfway between current point and picked poink
	var half = new Coord( (pointCoords[point].x + currentPoint.x) / 2, (pointCoords[point].y + currentPoint.y) / 2 );
	currentPoint = half;
	//draw point there and set that to new point
	currentPoint.draw(0.1);
	//repeat
}

function start(){
	for(let i = 0; i < 1000; i++){
		step();
	}
}

function step() {
	action();
	window.requestAnimationFrame(step);
}

//Presets?
	//1750 x 800
function equalateral(){
	pointCoords[0] = new Coord(1750 / 2, 0);
	pointCoords[1] = new Coord((1750 / 2) + (1750 / (3 + (2/3))), 800);
	pointCoords[2] = new Coord((1750 / 2) - (1750 / (3 + (2/3))), 800);
	pointCoords[0].draw(5);
	pointCoords[1].draw(5);
	pointCoords[2].draw(5);
	
	currentPoint = new Coord( (pointCoords[0].x + pointCoords[1].x) / 2, (pointCoords[0].y + pointCoords[1].y) / 2 );
	currentPoint.draw(0.1);
	i = 4;
}

function square(){
	
}

setCanvasSize();