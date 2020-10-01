import FlexObject from "./FlexObject.js";

class FlexImg extends FlexObject{
	constructor(x, y, width, height, img) {
		super(x, y, width, height, "#FFFFFF"); //default white color
		this.img = img;
  	}

  	//override
  	draw(ctx) {
    	ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  	}

}

export default FlexImg;