import FlexImg from './FlexImg.js';

class Invader extends FlexImg {
	constructor(x, y, width, height, img) {
		super(x, y, width, height, img);
		this.dx = 0;
		this.dy = Math.ceil(Math.random() * 4); //drop speed btw 0 & -3, this may produce coward invaders
		this.reachedEnd = 0;
		this.alive = 1;
  	}

  	draw(ctx) {
  		if (this.alive && !this.reachedEnd) {
  			super.draw(ctx);
  		}
  	}

  	move(canvasHeight) {
  		this.jiggle();
	    super.move(this.dx, this.dy);
	    this.handleBoundary(canvasHeight);
	}


	jiggle() {
		let chance = Math.random();
		if (chance > 0.5 ) {
			this.dx = -0.5;
		} else {
			this.dx = 0.5;
		}
	}

	//gameover if invader reached end of canvas
	handleBoundary(canvasHeight) {
		if (this.y + this.height > canvasHeight) {
	    	//this.x = canvasWidth - this.width;
	    	this.reachedEnd = 1;
	    }
	}
}

export default Invader;