let canvas;
let ctx;
let fractalmine;
let fractalAnimation;
let mouseX = window.width / 2;;
let mouseY = window.height / 2;
let lasttime=0;
let totalCounts = 0;
window.onload = () => {
    canvas =document.getElementById("canvas1");
    ctx = canvas.getContext("2d");
    ctx.lineWidth=100;
    

    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    fractalmine = new Fractal(ctx, window.innerWidth, window.innerHeight, totalCounts);
    fractalmine.animate(angleTo= 1.57);
    fractalmine.animate(angleTo= -1.57);
    
};

const canvasResize = () => {
    cancelAnimationFrame(fractalAnimation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("canvasResize");
    fractalmine = new Fractal(ctx, window.innerWidth, window.innerHeight, totalCounts);
    
    fractalmine.animate(angleTo= 1.57);
    fractalmine.animate(angleTo= -1.57);
};
const incSize = () => {
    totalCounts+=1
    cancelAnimationFrame(fractalAnimation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("canvasResize");
    fractalmine = new Fractal(ctx, window.innerWidth, window.innerHeight, totalCounts);
    
    fractalmine.animate(angleTo= 1.57);
    fractalmine.animate(angleTo= -1.57);

}


addEventListener('resize', canvasResize);
addEventListener('click', incSize);



class Fractal {
    #ctx
    #width
    #height
  
    constructor(ctx, width, height, count) {
        this.x = width/2;
        this.y = height/2;;
        this.angle = 0;
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#ctx.strokeStyle='#FFFFFF';
        this.count = 0;
        this.scaleFactor = 0.707;
        this.totalCounts = count;
        console.log("Loaded");
        
        // this.draw(100, 100, 0, 0, 1);
        this.angle = 0;
    }

    draw = (x, y, posx, posy, scale) => {
        console.log("Drawing")
        this.#ctx.beginPath();
        ctx.lineWidth = 5*scale
        this.#ctx.moveTo(posx, posy);

        this.#ctx.lineTo(posx + x*scale, posy+ y*scale);
        this.#ctx.stroke();
        

    }
    drawAngle = (angle, posx, posy, length) => {
        this.#ctx.beginPath();
        this.#ctx.moveTo(posx, posy);

        // console.log(mag);
        
        this.#ctx.lineTo(posx+ length*Math.cos(angle), posy+ length*Math.sin(-angle));
        this.#ctx.stroke();

    }
    animate(angleTo = 1.57, delAngle = 1,posx = this.#width/2, posy = this.#height/2, length = 100, counter = this.totalCounts){
        console.log('Animating');
        this.count+=1;
        angleTo+=1.57*delAngle;
        let xmov = length*Math.cos(angleTo);
        let ymov = length*Math.sin(-angleTo);
        
        // this.draw(posx, posy, 100*Math.sin(this.angle), 100*Math.cos(this.angle), scale);
        this.drawAngle(angleTo, posx, posy, length);

        // requestAnimationFrame(this.animate.bind(this, posx+ 100*Math.sin(this.angle), posy+ 100*Math.cos(this.angle), scale*0.8));
        if(counter>0){
            this.animate(angleTo, -1, posx+xmov, posy+ ymov,length*this.scaleFactor, counter-1);
            this.animate(angleTo, 1, posx+xmov, posy+ ymov,length*this.scaleFactor, counter-1); 
        }

    }

}