let sld, hideBtn, stopBtn;
let points;
let startPt;
let lastDrawn;
let iterations = 250;

function setup() {
	createCanvas(windowWidth, windowHeight+5);
	background(32);

	// Create UI elements
	sld = new Slider(start=3, end=24, value=3, 0, 0, width/12, height/60, 1, "Points", true, 0, resetPoints);
	hideBtn = new ToggleButton(0,0, width/12, height/30, "Hide pts", reDrawPoints);
	stopBtn = new ToggleButton(0,0, width/12, height/30, "Stop");

	startPt = new DragCircle(createVector(0,0), 3, color(227, 103, 86), reDrawPoints)

	// Start UI
	UI.tableWidth = 1;
	UI.tableHeight = 100;
	UI.distrubute();

	resetPoints();
}

function draw() {
	// Draw UI and draggable elements
	fill(32);
	noStroke();
	rect(sld.x, sld.y, sld.width, sld.height);
	UI.update();
	UI.draw();

	translate(13/24*width, height/2);
	Drag.update();
	if(!hideBtn.active) Drag.draw();

	if(!stopBtn.active){
		stroke(230, 100);
		strokeWeight(1);
		for(let i = 0; i < iterations*sld.value; i++) {
			lastDrawn = p5.Vector.add(lastDrawn, random(points).pos).div(2);
			point(lastDrawn.x, lastDrawn.y);
		}
	}
}

function resetPoints() {
	points = [];
	Drag.elements = [startPt];
	Drag.selected = null;
	for(let i = 0; i < sld.value; i++) {
		let a = 2*PI*i/sld.value;
		points.push(new DragCircle(createVector(width/4 * sin(a), width/4 * cos(a)), 3, color(86, 210, 227), reDrawPoints))
	}

	reDrawPoints();
}

function reDrawPoints() {
	background(32);
	lastDrawn = startPt.pos.copy();
}
