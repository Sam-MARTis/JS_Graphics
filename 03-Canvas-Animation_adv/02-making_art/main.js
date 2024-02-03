let canvas;
let ctx;
let flowfield;
let flowfieldanimation;
let mouseX = window.width / 2;;
let mouseY = window.height / 2;
let lasttime=0;
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
        this.#ctx.moveTo(this.#width/2, this.#height/2);
        this.#ctx.lineTo(x, y);
        this.#ctx.stroke();
        

    }
    animate = (timestamp) =>{
        
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
        
        this.#draw(this.#width/2+ 200*Math.sin(this.angle+0.9), this.#height/2+ 100*Math.cos(this.angle));
        this.angle+=0.1
        // this.x+=0.1;
        // x+=1;
        // console.log("Animating");
        flowfieldanimation =requestAnimationFrame(this.animate.bind(this));

    }
}