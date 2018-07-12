var canvas = document.getElementById('xxx');
var ctx = canvas.getContext('2d');

autoSetCanvasSize(canvas);

listenToMouse(canvas);



var eraserEnabled = false;

eraser.onclick = function() {
	eraserEnabled = true;
	actions.className = 'actions x'

}
brush.onclick = function(){
	eraserEnabled = false;
	actions.className = 'actions'
}

function drawCircle(x, y, radius) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	ctx.fill();
	ctx.fillStyle = 'black';
}

function drawLine(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.lineWidth = 5;
	ctx.strokeStyle = 'black';
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.closePath();
}

function autoSetCanvasSize(canvas) {
	setCanvasSize();

	window.onresize = function() {
		setCanvasSize();
	}

	function setCanvasSize() {
		var pageHeight = document.documentElement.clientHeight;
		var pageWidth = document.documentElement.clientWidth;
		canvas.width = pageWidth;
		canvas.height = pageHeight;
	}
}

function listenToMouse() {
	// var ctx = canvas.getContext('2d');
	var using = false;
	var lastPoint = {
		x: undefined,
		y: undefined
	};

	canvas.onmousedown = function(aaa) {
		var x = aaa.clientX;
		var y = aaa.clientY;
		using = true;
		if (eraserEnabled) {
			ctx.clearRect(x - 5, y - 5, 10, 10)
		} else {
			lastPoint = {
				x: x,
				y: y
			}
		}
	}
	canvas.onmousemove = function(aaa) {
		var x = aaa.clientX;
		var y = aaa.clientY;
		if (!using) {
			return
		}
		if (eraserEnabled) {
			ctx.clearRect(x - 5, y - 5, 10, 10)
		} else {
			var newPoint = {
				x: x,
				y: y
			};
			// drawCircle(x, y, 1);
			drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
			lastPoint = newPoint;
		}
	}
	canvas.onmouseup = function(aaa) {
		using = false;
	}
}