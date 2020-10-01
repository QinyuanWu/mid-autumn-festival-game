import Tank from './models/Tank.js';
import Invader from './models/Invader.js';
import Missile from './models/Missile.js';

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//images
const tankImg = new Image(50, 50);
tankImg.src = "./assets/headshot.png";
const invaderImg = new Image(30,30);
invaderImg.src = "./assets/mooncake.png";
const missileImg = new Image(10,10);
missileImg.src = "./assets/missile.png";
const endscreen = new Image(100, 100);
endscreen.src = "./assets/endscreen.png";

//audios
const end = new Audio('./assets/end.mp3');
const explosion = new Audio('./assets/explosion.mp3');
const shoot = new Audio('./assets/shoot.mp3');
const bgm = new Audio('./assets/bgm.mp3');
bgm.autoplay = true;

//constants
let refresh = 1;
let missileRemain = 10;
let invadersDown = 0;
const invaders = [];
const missiles = [];

const tank = new Tank(canvas.width / 2 - 40, canvas.height - 80, 80, 80, tankImg);


function draw() {
  	ctx.clearRect(0, 0, canvas.width, canvas.height);
  	updateTank(ctx);
  	updateInvaders(ctx);
  	updateMissiles(ctx);
  	//ctx.drawImage(img, canvas.width / 2 - 25, canvas.height - 60, 50, 50);
  	document.addEventListener("keydown", fireMissile);
  	ctx.font = "16px Arial";
  	ctx.fillStyle = "#fcba03";
  	ctx.fillText("已拒绝的月饼: " + invadersDown, 8, 20);
  	ctx.fillText("剩余拒绝次数: " + missileRemain, 8, 35);
  	if (refresh) {
  		window.requestAnimationFrame(draw);
  	} else {
  		gameOver();
  	}
}

//bgm.play();
draw();

function updateTank(ctx) {	
	tank.draw(ctx);
  	tank.move(canvas.width);
}

function updateInvaders(ctx) {
	if (Math.random() < 0.008) { //randomly add new invader
		invaders.push(new Invader((canvas.width - 30)*Math.random(), 20, 30, 30, invaderImg)) //random x position
	}
	for (let i = invaders.length - 1; i >= 0; i--) { //update each invader
		invaders[i].move(canvas.height);
		if (!invaders[i].alive) { //invaders has been shot down
			invadersDown++;
			invaders.splice(i, 1);
		} else if (invaders[i].reachedEnd) { //reached ent
			refresh = 0;
		} else { //alive
			invaders[i].draw(ctx);
		}
	}

}

function fireMissile(e) {
	if (e.key === " " || e.key === "Spacebar") {
		if (missileRemain > 0) {
			shoot.play();
			missiles.push(new Missile(tank.x + tank.width / 2 - 10, canvas.height - 110, 20, 25, missileImg));
			missileRemain--;
		}
	}
}


function updateMissiles(ctx) {
	for (let i = missiles.length - 1; i >= 0; i--) {
		missiles[i].draw(ctx); 
		missiles[i].move();
		checkCollide(missiles[i]);
		if (!missiles[i].display) { //either out of bound or collided with invader
			missiles.splice(i, 1);
			missileRemain++; //resupply missile
		}
	}
}

function checkCollide(missile) {
	for (let i = invaders.length - 1; i >= 0; i--) {
		if (invaders[i].intersects(missile)) {
			explosion.play();
			missile.display = 0;
			invaders[i].alive = 0;
		}
	}
}


function gameOver() {
	end.play();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = "52px Arial";
	ctx.fillStyle = "#fcba03";
  	ctx.fillText("中秋快乐~~", 30, canvas.height / 2 - 100);
  	ctx.font = "45px Arial";
  	ctx.fillText("成功拒绝了" + invadersDown + "个月饼", 30, canvas.height / 2 - 50);
  	ctx.drawImage(endscreen, 10, 300, 180, 180);
  	refresh = 0;
}

document.addEventListener("keydown", (_e) => {
  bgm.play();
});