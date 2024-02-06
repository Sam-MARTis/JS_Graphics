let canvas;
let ctx;
let fractalmine;
let fractalAnimation;
let totalCounts = 0;
let countLimit = 11;
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
    if(totalCounts < countLimit) {
    totalCounts+=1
    cancelAnimationFrame(fractalAnimation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("canvasResize");
    fractalmine = new Fractal(ctx, window.innerWidth, window.innerHeight, totalCounts);
    
    fractalmine.animate(angleTo= 1.57);
    fractalmine.animate(angleTo= -1.57);
    }

}
setInterval(incSize, 1000)


addEventListener('resize', canvasResize);
addEventListener('click', incSize);



class Fractal {
    #ctx
    #width
    #height
  
    constructor(ctx, width, height, count) {
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#ctx.strokeStyle='#ffaaaa';
        this.lineWidth = 6
        this.scaleFactor = 0.707; // 1/sqrt(2)
        this.totalCounts = count;
    }

    drawAngle = (angle, posx, posy, length) => {
        this.#ctx.beginPath();
        this.#ctx.moveTo(posx, posy);

        
        this.#ctx.lineTo(posx+ length*Math.cos(angle), posy+ length*Math.sin(-angle));
        this.#ctx.stroke();

    }
    animate(angleTo = 1.57, delAngle = 1,posx = this.#width/2, posy = this.#height/2, length = this.#width/6, counter = this.totalCounts, lineWidth = this.lineWidth){
        this.count+=1;
        angleTo+=1.57*delAngle;
        let xmov = length*Math.cos(angleTo);
        let ymov = length*Math.sin(-angleTo);
        lineWidth*=(this.scaleFactor **0.65)
        this.#ctx.lineWidth = lineWidth;
        this.drawAngle(angleTo, posx, posy, length);
        posx+=xmov;
        posy+=ymov;
        length*=this.scaleFactor;

        if(counter>0){
            
            this.animate(angleTo, -1, posx, posy,length, counter-1, lineWidth);
            this.animate(angleTo, 1, posx, posy, length, counter-1, lineWidth); 
        }

    }

}