// console.log('testing')

var canvas = document.getElementById('firstCanvas');
canvas.width = window.innerWidth;
// console.log('window.innerWidth: ' + window.innerWidth); //InnerWidth = 18
canvas.height = window.innerHeight;
canvas.height = 1000 * devicePixelRatio;
console.log(canvas);

var c = canvas.getContext('2d');
// c.scale(0.5, 0.5);
c.beginPath();

c.strokeStyle = '#222299';
c.lineWidth= 1;

// c.moveTo(0, 0);
c.moveTo(window.innerWidth/2,window.innerHeight/2);
// c.lineTo(100, 100);

// c.stroke();
// c.moveTo(100, 100);
// c.lineTo(100, 200);
// c.moveTo(200, 100);
// c.stroke();
const move = (x, y) => {
    // console.log(x, y);
    c.lineTo(x, y);
    c.stroke();
    c.moveTo(x, y);
}


const command = (func, x, y) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            func(x, y);
            resolve();
        }, 2000);
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

// // move(100,300);

// c.moveTo(normalizeX(0), normalize(0));
// move(normalizeX(100+33), normalize(0));
// c.moveTo(normalize((33)), normalize(0));
// move(normalize(33), normalize(100));
var x=1.960
var y=2.04
var z=12.51
c.moveTo(normalizeX(y), normalizeY(z));
var dt = 0.00005;
const dxdt=(x,y,z) => {return 400*(y-x)}
const dydt=(x,y,z)=> {return -120*x-10*(x*z) +280*y}
const dzdt=(x,y,z) => {return 10*x*y  - 30*z}

//[  0.6911211,  0.5110536, -0.5110536;
// -0.5110536,  0.8455606,  0.1544394;
// 0.5110536,  0.1544394,  0.8455606 ]
transformX = (x, y, z) =>{
    // return 0.6911211*x + 0.5110536*y + -0.5110536*z;
    return x;
}
transformY = (x, y, z) =>{
    // return -0.5110536*x +  0.8455606*y +  0.1544394*z;
    return y;
}
transformZ = (x, y, z) =>{
    // 0.5110536*x + 0.1544394*y +  0.8455606*z;
    return z;
}
for(let i=0; i<100000; i++){
    
    // a = a.then(()=>{command(move, (x*i), y*i*i)}).then(() => {console.log("Done I guess!")});
    a = a.then(
            () => {
                command(move, normalizeX(transformY(x,y,z)), normalizeY(transformZ(x,y,z)));
                console.log(normalizeX(transformY(x,y,z)));
            }
        )
        .then(
            () => {
                // console.log("Done I guess!");
                
                return new Promise(
                    (resolve) => {
                        // console.log(dxdt(x,y,z));

                        x = x+(dxdt(x, y, z)*dt);
                        y = y+(dydt(x, y, z)*dt);
                        z = z+(dzdt(x, y, z)*dt);
                    resolve();
                    }   
                );
            }
        );
    
}

