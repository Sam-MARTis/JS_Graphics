let canvas;
let ctx;
let fractalmine;
let fractalAnimation;
let offset = 0;
let paramValues = new Object();



const getRandomInt = (rangeL, rangeH) =>{
    return Math.floor(rangeL) + Math.floor(Math.random() * (rangeH-rangeL))
}

let totalCounts = 0;
let countLimit = 5;
let branches = getRandomInt(3, 8);

let color = `hsl(${Math.random()*360}, 100%, 50%)`
let randomizeButton = document.getElementById('randomize');





const resetParamValues = () => {
    paramValues = {
        'lineWidth' : 5 + Math.random()*3,
        'scaleFactorLen' : 0.3+ Math.random()*0.5,
        'scaleFactorWidth' : 0.3+ Math.random()*0.4,
       
        'angleRate' : 0.2+Math.random()*5,
        'divergence' : Math.random()*4,
        'scaleFactorAngleRate' : 200*Math.random(),
        'color' : `hsl(${Math.random()*560}, 100%, 50%)`
    }
}

window.onload = () => {
    canvas =document.getElementById('canvas1');
    ctx = canvas.getContext('2d');


    resetParamValues();
    
    
    reset();
    
};



const reset = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineCap="square";
    ctx.lineDashOffset=30;
    ctx.shadowBlur = 0;
    ctx.shadowColor=color;
    
    
    console.log("canvasResize");
    fractalmine = new Fractal(ctx, window.innerWidth, window.innerHeight, totalCounts, branches, offset, paramValues);
    fractalmine.callAnimation()
};
const incSize = () => {
    if(totalCounts < countLimit) {
    totalCounts+=1
    reset();
    }

}
setInterval(incSize, 10)

const randomize = () =>{
    ctx.clearRect(0, 0, window.width, window.height);
    
    let newBranches = 3 +getRandomInt(0, 5);
    color = `hsl(${Math.random()*360}, 100%, 50%)`;
    offset = Math.random()*6.28;
    while (newBranches== branches){
        newBranches = 3 +getRandomInt(0, 5);
    }
    branches = newBranches;
    resetParamValues()
    reset();

}



addEventListener('resize', reset);
addEventListener('click', incSize);
randomizeButton.addEventListener('click', randomize);

// setInterval(randomize, 200);










class Fractal {
    #ctx
    #width
    #height
  
    constructor(ctx, width, height, count, branches, offset, params) {
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.totalCounts = count;
        this.offset = offset
        this.branches = branches;
        this.#ctx.strokeStyle=color;

        
        this.length = Math.min(this.#width/4, this.#height/4);
        
        this.lineWidth = params['lineWidth'];
        this.scaleFactorLen = params['scaleFactorLen'];
        this.scaleFactorWidth = params['scakeFactorWidth'];
        
        this.angleRate = params['angleRate']
        this.divergence = params['divergence']
        
        this.scaleFactorAngleRate = params['scaleFactorAngleRate']
    }

    drawAngle = (angle, posx, posy, length) => {
        this.#ctx.beginPath();
        this.#ctx.moveTo(posx, posy);

        
        this.#ctx.lineTo(posx+ length*Math.cos(angle), posy+ length*Math.sin(-angle));
        this.#ctx.stroke();

    }
    animate(angleTo = 0.57, delAngle = 1, angleRate = this.angleRate, posx = this.#width/2, posy = this.#height/2, length = this.length, counter = this.totalCounts, lineWidth = this.lineWidth){
        this.count+=1;
        angleTo += angleRate*delAngle;
        let xmov = length*Math.cos(angleTo);
        let ymov = length*Math.sin(-angleTo);
        
        lineWidth*=(this.scaleFactorWidth **1)
        this.#ctx.lineWidth = lineWidth;
        this.drawAngle(angleTo, posx, posy, length);
        posx+=xmov/2;
        posy+=ymov/2;
        length*=(this.scaleFactorLen**1);
        angleRate *= this.scaleFactorAngleRate;

        if(counter>0){
            
            this.animate(angleTo, -1.2, angleRate, posx, posy,length/2, counter-1, lineWidth);
            this.animate(angleTo, 1.2, angleRate, posx, posy, length/2, counter-1, lineWidth); 
            posx+= xmov/2;
            posy+= ymov/2;
            this.animate(angleTo, -this.divergence, angleRate, posx, posy,length, counter-1, lineWidth);
            this.animate(angleTo, this.divergence, angleRate, posx, posy, length, counter-1, lineWidth); 
        }

    }
    callAnimation(){
        for (let i = 0; i < branches; i++) {
            this.animate(offset= this.offset+ (i* 6.28/this.branches));
            }
    }

}