var canvas = document.getElementById("myCanvas");
//instances 2d on it
var ctx = canvas.getContext("2d");

window.addEventListener('resize', () => {
	setCanvasSize();
});

//Variables
var pointCoords = new Array(3);
var i = 0;
var currentPoint = null;
let t = 50;
let requestID = new Array(t);


//---------------OBJECTS---------------//
function Coord(x, y) {
	this.x = x;
	this.y = y;
}

//---------------OBJECT FUNCTIONS---------------//
Coord.prototype.draw = function (n) {
	ctx.beginPath();
	ctx.arc(this.x, this.y, n, 0, 2 * Math.PI);
	ctx.fill();
}

//---------------HELPER FUNTIONS---------------//
canvas.addEventListener("mousedown", function (e) {
	onClick(canvas, e);
});


function setCanvasSize() {
	canvas.width = parent.innerWidth * 7 / 8;
	canvas.height = canvas.width * 2 / 3;
}

function onClick(smallcanvas, event) {
	if (i < 3) {
		ctx.fillStyle = 'black';
		let rect = canvas.getBoundingClientRect();
		let x = Math.floor(event.clientX - rect.left);
		let y = Math.floor(event.clientY - rect.top);
		console.log(x + ", " + y);
		let temp = new Coord(x, y);
		pointCoords[i] = temp;
		pointCoords[i].draw(5);
		i++;
	}
	else if (i == 3) {
		ctx.fillStyle = "red";
		let rect = canvas.getBoundingClientRect();
		let x = Math.floor(event.clientX - rect.left);
		let y = Math.floor(event.clientY - rect.top);
		currentPoint = new Coord(x, y);
		currentPoint.draw(1.0);
		i++;
		ctx.fillStyle = 'black';
	}
}

function action() {
	//pick point 1 - 3
	var point = Math.floor(Math.random() * 3);
	//go halfway between current point and picked poink
	currentPoint = new Coord((pointCoords[point].x + currentPoint.x) / 2, (pointCoords[point].y + currentPoint.y) / 2);
	//draw point there and set that to new point
	currentPoint.draw(0.1);
}

function start() {
	if(currentPoint === null){
		return;
	}
	for(let i = 0; i < t; i++){
		requestID[i] = requestAnimationFrame(function(){
			step(i);
		});
	}
}

function step(i) {
	action();
	requestID[i] = requestAnimationFrame(function(){
		step(i);
	});
}

function reset(){
	for(let i = 0; i < t; i++){
		cancelAnimationFrame(requestID[i]);
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	currentPoint = null;
	i = 0;
}

//Presets
function equalateral() {
	pointCoords[0] = new Coord(canvas.width / 2, (canvas.height * 1/8));
	pointCoords[1] = new Coord((canvas.width / 2) + (canvas.width / (3 + (2 / 3))), (canvas.height * 2 / 3) + (canvas.height * 1/8));
	pointCoords[2] = new Coord((canvas.width / 2) - (canvas.width / (3 + (2 / 3))), (canvas.height * 2 / 3) + (canvas.height * 1/8));
	pointCoords[0].draw(5);
	pointCoords[1].draw(5);
	pointCoords[2].draw(5);

	currentPoint = new Coord((pointCoords[0].x + pointCoords[1].x) / 2, (pointCoords[0].y + pointCoords[1].y) / 2);
	currentPoint.draw(0.1);
	i = 4;
}

function square() {

}


//-----------Initiation
setCanvasSize();