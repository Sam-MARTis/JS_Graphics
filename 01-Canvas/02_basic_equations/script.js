// console.log('testing')
var butPushed = 0;
const butClick = () => {
    butPushed = 1;
}
var canvas = document.getElementById('firstCanvas');
canvas.width = window.innerWidth;
// console.log('window.innerWidth: ' + window.innerWidth); //InnerWidth = 18
canvas.height = window.innerHeight;
canvas.height = 1000 * devicePixelRatio;
console.log(canvas);

var c = canvas.getContext('2d');
// c.scale(0.5, 0.5);
c.beginPath();

c.strokeStyle = 'rgb(200, 0,0)';
c.lineWidth= 1;
const command = (func, x, y, k) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            func(x, y, k);
            resolve();
        }, 1000);
    });
};
// a = command(move, 10, 100).then(() => {console.log("Done I guess!");})
// .then(() => {command(move, 10, 300)});

a = Promise.resolve()

const normalizeX = (x) =>{
    return (window.innerWidth/2 + 30*x)
}
const normalizeY = (y) =>{
    return (window.innerHeight/2 + 30*(y-15))
}

// c.moveTo(0, 0);
c.moveTo(window.innerWidth/2,window.innerHeight/2);
// c.lineTo(100, 100);

// c.stroke();
// c.moveTo(100, 100);
// c.lineTo(100, 200);
// c.moveTo(200, 100
// c.stroke();
var count = 0;
var prev_pos = {x:normalizeX(y), y:normalizeY(z)};
const move = (x, y, col) => {
    // console.log(x, y);
    // c.beginPath();
    if(count=1){
        c.beginPath()
        c.strokeStyle = `rgb(${col.r}, 0, ${col.b})`;
        count =0
    }
    else{
        count = 1;
    }
    c.moveTo(prev_pos.x, prev_pos.y);
    
    // console.log("Stroke style is: " + c.strokeStyle);
    c.lineTo(x, y);
    c.stroke();
    c.moveTo(x, y);
    prev_pos.x = x;
    prev_pos.y = y;
    
}




// // move(100,300);

// c.moveTo(normalizeX(0), normalize(0));
// move(normalizeX(100+33), normalize(0));
// c.moveTo(normalize((33)), normalize(0));
// move(normalize(33), normalize(100));
var x=1.960;
var y=2.04;
var z=12.51;
var b = 0;
var g = 0;
var r = 0;
c.moveTo(normalizeX(y), normalizeY(z));
var dt = 0.0005;
const dxdt=(x,y,z) => {return 400*(y-x)}
const dydt=(x,y,z)=> {return -120*x-10*(x*z) +280*y}
const dzdt=(x,y,z) => {return 10*x*y  - 30*z}

//[  0.6911211,  0.5110536, -0.5110536;
// -0.5110536,  0.8455606,  0.1544394;
// 0.5110536,  0.1544394,  0.8455606 ]
const a11 = 0.6911211, a12 = 0.5110536, a13 = -0.5110536;
const a21 = -0.5110536, a22 = 0.8455606, a23 = 0.1544394;
const a31 = 0.5110536, a32 = 0.1544394, a33 = 0.8455606;

const rotate = (x, y, z) => {
    const newX = a11 * x + a12 * y + a13 * z;
    const newY = a21 * x + a22 * y + a23 * z;
    const newZ = a31 * x + a32 * y + a33 * z;
    // return { x: newX, y: newY, z: newZ };
    return {x:x, y:y, z:z}
};

const proceed = () =>{
for(let i=0; i<200000; i++){
    
    // a = a.then(()=>{command(move, (x*i), y*i*i)}).then(() => {console.log("Done I guess!")});
    a = a.then(
            () => {
                rotatedAxes = rotate(x,y,z);
                // c.strokeStyle = `rgb(${r}, 0, ${b})`;
                command(move, normalizeX(rotatedAxes.y), normalizeY(rotatedAxes.z), {r:r, g:g, b:b});
                // command(move, normalizeX(y), normalizeY(z));
                // console.log(normalizeX(rotatedAxes.y));
            }
        )
        .then(
            () => {
                // console.log("Done I guess!");
                
                return new Promise(
                    (resolve) => {
                        var dfxdt = dxdt(x, y, z);
                        var dfydt = dydt(x, y, z);
                        var dfzdt = dzdt(x, y, z);
                        // console.log(dxdt(x,y,z));
                        let vel = ((dfxdt**2 + dfydt**2 + dfzdt**2)**0.5)/2000;
                        // console.log(vel);
                        r = Math.round(240*vel);
                        b = Math.round(240* (1.5-vel));
                        c.strokeStyle = `rgb(${r}, 0, ${b})`;
                        // console.log(c.strokeStyle);
                        

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

}
proceed();