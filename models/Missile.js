import FlexImg from './FlexImg.js';

class Missile extends FlexImg {
	constructor (x, y, width, height, img) {
		super(x, y, width, height, img);
		this.display = 1;
		this.dy = -3;
  	}

  	move() {
  		super.move(0, this.dy); //constant speed
  	}

  	draw(ctx) {
  		this.outOfBound();
  		if (this.display) {
  			super.draw(ctx);
  		}
  	}

  	outOfBound() {
  		if (this.y < 0) {
  			this.display = 0;
  			this.dy = 0;
  		}
  	}
}

export default Missile;