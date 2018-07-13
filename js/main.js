var canvas = document.getElementById('xxx');
var ctx = canvas.getContext('2d');

autoSetCanvasSize(canvas);

listenToUser(canvas);



var eraserEnabled = false;
pen.onclick = function(){
	eraserEnabled = false;
	pen.classList.add('active');
	eraser.classList.remove('active');
}
eraser.onclick = function(){
	eraserEnabled = true;
	eraser.classList.add('active');
	pen.classList.remove('active');
}
red.onclick = function(){
	ctx.fillStyle = 'red';
	ctx.strokeStyle = 'red';
	red.classList.add('active');
	green.classList.remove('active');
	blue.classList.remove('active');
}
green.onclick = function(){
	ctx.fillStyle = 'green';
	ctx.strokeStyle = 'green';
	red.classList.remove('active');
	green.classList.add('active');
	blue.classList.remove('active');
}
blue.onclick = function(){
	ctx.fillStyle = 'blue';
	ctx.strokeStyle = 'blue';
	red.classList.remove('active');
	green.classList.remove('active');
	blue.classList.add('active');
}
// eraser.onclick = function() {
// 	eraserEnabled = true;
// 	actions.className = 'actions x'

// }
// brush.onclick = function() {
// 	eraserEnabled = false;
// 	actions.className = 'actions'
// }

function drawCircle(x, y, radius) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	ctx.fill();
	// ctx.fillStyle = 'black';
}

function drawLine(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.lineWidth = 5;
	// ctx.strokeStyle = 'black';
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

function listenToUser() {
	// var ctx = canvas.getContext('2d');
	var using = false;
	var lastPoint = {
		x: undefined,
		y: undefined
	};
	//特性检测
	if (document.body.ontouchstart !== undefined) {
		//触屏
		canvas.ontouchstart = function(aaa) {
			var x = aaa.touches[0].clientX;
			var y = aaa.touches[0].clientY;
			console.log(x, y);
			using = true;
			if (eraserEnabled) {
				ctx.clearRect(x - 5, y - 5, 10, 10)
			} else {
				lastPoint = {
					x: x,
					y: y
				}
			}
			console.log('开始摸我了。。。。');
			console.log(aaa);
		}
		canvas.ontouchmove = function(aaa) {
			var x = aaa.touches[0].clientX;
			var y = aaa.touches[0].clientY;
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
			console.log('边摸边动。。。。');
		}
		canvas.ontouchend = function(aaa) {
			// console.log('up');
			using = false;
			console.log('摸完了！');
		}
	} else {
		//非触屏
		canvas.onmousedown = function(aaa) {

			// console.log('down');
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
			// console.log('move');
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
			// console.log('up');
			using = false;
		}
	}

}