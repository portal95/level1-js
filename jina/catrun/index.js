var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");

//고양이 그림 부르기
var catImage = [];
catImage[0] = new Image();
catImage[1] = new Image();

var catLoad = false;
catImage.onload = function() {
	catLoad = true;
}
catImage[0].src = "cat1.png";
catImage[1].src = "cat2.png";

//배경 그림 부르기
var bg = new Image();
var bgLoad = false;
bg.onload = function() {
	bgLoad = true;
}
bg.src = 'bg.png';

//장애물  그림 부르기
var objImage = new Image();
var objLoad = false;
objImage.onload = function() {
	objLoad = true;
}
objImage.src = "obj.png";

//장애물 변수
var Crab = {
	"sx":35,
	"sy":460,
	"w":225,
	"h":300,
	"x":600,
	"y":250,
	"width":70,
	"height":70
};

//장애물 그리기
var obji = 0;
function drawobj() {
	obji += 3;
	ctx.drawImage(objImage,Crab.sx,Crab.sy,Crab.w,Crab.h
		,Crab.x-obji,Crab.y,Crab.width,Crab.height);
	ctx.drawImage(objImage,Crab.sx,Crab.sy,Crab.w,Crab.h
		,Crab.x-obji+Crab.x,Crab.y,Crab.width,Crab.height);

		if (obji == Crab.x) {
			 obji = 0;
		}
}

//장애물 충돌감지
function collision() {
	if (Crab.x-obji > catX-15 && Crab.x-obji < catX+catwidth-15
	&& Crab.y > catY-15 && Crab.y < catY+catheight-15) {
		gameover();	
		gameend = true;
	}
}

//game over
function gameover() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "red";
	ctx.font = "40px Verdana";
	ctx.fillText("GAME OVER", 150, 170);
}

//점수 계산
var score = 0;
function checkScore() {
	score++;
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.font = "20px Verdana";
	ctx.fillText("Score: " + score, 15, 30);

}

//배경 변수
var ddx = - 0.75;
var bgX = 0;
var i = 0;
//배경그리기
function drawbg() {
	i=i+2;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.drawImage(bg,0 - i,0,canvas.width, canvas.height);
	ctx.drawImage(bg,0 - i + canvas.width,0,canvas.width, canvas.height);

	if (i == canvas.width ) {
		i = 0;
	}
}

//고양이 사이즈와 초기좌표
var catwidth = 90;
var catheight = 90;
var catX = 120;
var catY = 220;
//고양이 움직임
var dx = 0;
var dy = -7;
//고양이 중력
var g = 0.2;
//고양이 그리기
var count = 0;
var idx = 0;
var delay = 10;
function drawcat() {
	catX += dx;
	dy = dy + g;
	catY += dy;

	if (catX >= 500 || catX <= 0) {
		dx = -dx;
	}
	if(catY >= 230) {
		catY = 230;
	}

	count++;
	if (count >= delay) {
		idx++;
	if (idx > 1) {
		idx = 0;
	}
		count = 0;
	}

	if (catY != 230) {
		ctx.drawImage(catImage[0],catX,catY,catwidth,catheight);
	} else {
		ctx.drawImage(catImage[idx],catX,catY,catwidth,catheight);
	}
}

//키보드 조작
document.addEventListener("keypress", jump);
//점프 실행 함수
function jump() {
	if (event.keyCode == 32) {
		if (catY > canvas.height / 2){
			dy = -8;
		}
	}
}

//일시정지 함수
var isRunning = true;
function pause() {
	isRunning = !isRunning;

	if(isRunning) {
		drawAll();
	}
}

//재시작 함수
function start(){
	document.location.reload();
}

//그리기
var gameend = false;
function drawAll() {
	if (gameend) {
		return;
	} else {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		drawbg();
		drawobj();
		collision();
		drawcat();
		checkScore();

		if(isRunning) {
		requestAnimationFrame(drawAll);
		}
	}
	
}
drawAll();
