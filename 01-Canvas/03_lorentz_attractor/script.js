




var butPushed = 0;
var canvas = document.getElementById('firstCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.height = 1000 * devicePixelRatio;
var c = canvas.getContext('2d');
c.strokeStyle = 'rgb(200, 0,0)';
c.lineWidth= 1;

var count = 0;
var x=-7.13
var y=-7.11
var z=25.41
var b = 0;
var g = 0;
var r = 0;
var dt = 0.005;
a = Promise.resolve();







//Functions


const clearScreen = () => {
    c.clearRect(0, 0, canvas.width, canvas.height);
}
const butClick = () => {
    butPushed = 1;
} 
const reloadScreen = () => {
    location.reload();
}


const normalizeX = (x) =>{
    return (window.innerWidth/2 + 30*x);
}
const normalizeY = (y) =>{
    return (window.innerHeight/2 - 18*(y));
}

c.beginPath();


const command = (func, x, y, k) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            func(x, y, k);
            resolve();
        }, 1000);
    });
};




c.moveTo(window.innerWidth/2,window.innerHeight/2);


var prev_pos = {x:normalizeX(y), y:normalizeY(z)};
const move = (x, y, col) => {
    if(count=1){
        c.beginPath()
        c.strokeStyle = `rgb(${col.r}, 0, ${col.b})`;
        count =0
    }
    else{
        count = 1;
    }
    c.moveTo(prev_pos.x, prev_pos.y);
    
    c.lineTo(x, y);
    c.stroke();
    c.moveTo(x, y);
    prev_pos.x = x;
    prev_pos.y = y;
    
}






// c.moveTo(normalizeX(y), normalizeY(z));

const dxdt=(x,y,z) => {return 10*(y-x)}
const dydt=(x,y,z)=> {return x*(28-z)-y}
const dzdt=(x,y,z) => {return x*y-8*z/3}




for(let i=0; i<100000; i++){
    
    a = a.then(
            () => {
                // rotatedAxes = rotate(x,y,z);
                command(move, normalizeX(x), normalizeY(z), {r:r, g:g, b:b});
            }
        )
        .then(
            () => {
                
                return new Promise(
                    (resolve) => {
                        var dfxdt = dxdt(x, y, z);
                        var dfydt = dydt(x, y, z);
                        var dfzdt = dzdt(x, y, z);
                        let vel = ((dfxdt**2 + dfydt**2 + dfzdt**2)**0.5)/100;
                        r = Math.round(240*vel);
                        b = Math.round(240* (1.5-vel));
                        c.strokeStyle = `rgb(${r}, 0, ${b})`;
                        

                        x = x+(dfxdt*dt);
                        y = y+(dfydt*dt);
                        z = z+(dfzdt*dt);
                    if(butPushed == 1){
                        resolve();
                    }
                    else{
                    setTimeout(resolve,1);
                    }
                    
                    }   
                );
            }
        );
    
}

