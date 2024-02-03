let canvas;
let ctx;
let flowfield;
let flowfieldanimation;
let mouseX = window.width / 2;;
let mouseY = window.height / 2;
window.onload = () => {
    canvas =document.getElementById("canvas1");
    ctx = canvas.getContext("2d");

    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowfield = new FlowFieldEffect(ctx, window.innerWidth, window.innerHeight);
    flowfield.animate();
    
};
const canvasResize = () => {
    cancelAnimationFrame(flowfieldanimation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("canvasResize");
    flowfield = new FlowFieldEffect(ctx, window.innerWidth, window.innerHeight);
    
    flowfield.animate();
};
const mouseMove = (e) => {
    console.log(e);
    mouseX=e.layerX;
    mouseY = e.layerY;
}
const mouseClick = (e) =>{
    console.log(e);
}

addEventListener('resize', canvasResize);
addEventListener('mousemove', mouseMove);
addEventListener('click', mouseClick)



class FlowFieldEffect {
    #ctx
    #width
    #height
  
    constructor(ctx, width, height) {
        this.x = width/2;
        this.y = height/2;;
        this.angle = 0;
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#ctx.strokeStyle='#FFFFFF';
        console.log("Loaded");
        
        // this.#draw(10, 10)
    }

    #draw = (x, y) => {
        const length = 100;
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x+length, y+length);
        this.#ctx.stroke();
        

    }
    animate = () =>{
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
        
        this.#draw(mouseX+ Math.sin(this.angle)*10, mouseY+ Math.cos(this.angle)*10);
        this.angle+=0.3
        // this.x+=0.1;
        // x+=1;
        console.log("Animating");
        flowfieldanimation =requestAnimationFrame(this.animate.bind(this));

    }
}