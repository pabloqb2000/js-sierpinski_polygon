class DragCircle extends DragElement{
    /**
     * 
     * @param pos Initial position
     * @param r Radius of the element
     * @param onDrag Action to perform when the object is dragged
     * @param onClick Action to perform when the object is clicked
     */
    constructor(pos, r=15, color, onDrag=null, onClick=null) {
        super(pos, true, true, onClick == null, onDrag, onClick);
        this.r = r;
        this.color = color;
        this.offset = createVector(13/24*width, height/2);
    }

    /**
     * Draw the object
     */
    draw() {
        fill(this.highlighted ? 230 : this.color);
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }

    /**
     * If the mouse is over the element
     * dragg it to the mouse position
     * and perform the on drag action
     */
    dragged() {
        this.pos = createVector(mouseX, mouseY).sub(this.offset);
        if(this.onDrag != null) this.onDrag();
    }

    /**
     * Check if mouse is over the object
     */
    mouseIsOver() {
        return createVector(mouseX, mouseY).sub(this.offset).dist(this.pos) <= this.r + 10;
    }
}