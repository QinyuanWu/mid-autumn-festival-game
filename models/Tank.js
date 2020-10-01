import FlexImg from './FlexImg.js';

class Tank extends FlexImg {
	constructor(x, y, width, height, img) {
		super(x, y, width, height, img);
		this.dx = 0;
		document.addEventListener("keydown", this.keyDownHandler.bind(this));
    	document.addEventListener("keyup", this.keyUpHandler.bind(this));
  	}

  	//move left or right when user hit the key
  	keyDownHandler(e) {
	    if (e.key === "Right" || e.key === "ArrowRight") {
	    	this.dx = 5;
	    } else if (e.key === "Left" || e.key === "ArrowLeft") {
	    	this.dx = -5;
	    }
	 }

	//stops the tank when user release the key
  	keyUpHandler(e) {
	    if (e.key === "Right" || e.key === "ArrowRight") {
	    	this.dx = 0;
	    } else if (e.key === "Left" || e.key === "ArrowLeft") {
	     	this.dx = 0;
	    }
	 }

	//move only left and right
	move(canvasWidth) {
	    super.move(this.dx, 0);
	    this.handleBoundary(canvasWidth);
	}

	//stops the tank when it reaches either end
  	handleBoundary(canvasWidth) {
	    if (this.x < 0) {
	    	this.x = 0;
	    } else if (this.x + this.width > canvasWidth) {
	    	this.x = canvasWidth - this.width;
	    }
  	}

}

export default Tank;