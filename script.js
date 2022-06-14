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
	Canvas.width = window.innerWidth;
	Canvas.height = window.innerHeight;
}

function onClick(smallCanvas, event){
	if(i < 3){
		let rect = Canvas.getBoundingClientRect();
		let x = Math.floor(event.clientX - rect.left);
		let y = Math.floor(event.clientY - rect.top);
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
	//pick point 1 - 3
	var point = Math.floor(Math.random() * 3);
	//go halfway between current point and picked poink
	
	var half = new Coord( (pointCoords[point].x + currentPoint.x)/2 , (pointCoords[point].y + currentPoint.y)/2 );
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



setCanvasSize();