// console.log('testing')

var canvas = document.getElementById('firstCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.height = 1000 * devicePixelRatio;
console.log(canvas);

var c = canvas.getContext('2d');
// c.scale(0.5, 0.5);
c.beginPath();

c.strokeStyle = '#222299';
c.lineWidth= 1;

// c.moveTo(0, 0);
c.moveTo(0,0);
// c.lineTo(100, 100);

// c.stroke();
// c.moveTo(100, 100);
// c.lineTo(100, 200);
// c.moveTo(200, 100);
// c.stroke();
const move = (x, y) => {
    console.log(x, y);
    c.lineTo(x, y);
    c.stroke();
    c.moveTo(x, y);
}


const command = (func, x, y) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            func(x, y);
            resolve();
        }, 2000);
    });
};
// a = command(move, 10, 100).then(() => {console.log("Done I guess!");})
// .then(() => {command(move, 10, 300)});

a = Promise.resolve()

const normalize = (x) =>{
    return Math.round((x+15)*40)
}

// // move(100,300);
var x=1.960
var y=2.04
var z=12.51
var dt = 0.0001;
const dxdt=(x,y,z) => {return 400*(y-x)}
const dydt=(x,y,z)=> {return -120*x-10*(x*z) +280*y}
const dzdt=(x,y,z) => {return 10*x*y  - 30*z}
while(true){

    x = x+(dxdt(x, y, z)*dt);
    y = y+(dydt(x, y, z)*dt);
    z = z+(dzdt(x, y, z)*dt);
    // a = a.then(()=>{command(move, (x*i), y*i*i)}).then(() => {console.log("Done I guess!")});
    a = a.then(
            () => {
                command(move, (normalize(x)), normalize(y))
            }
        )
        .then(
            () => {
                console.log("Done I guess!");
                return new Promise(
                    (resolve) => {
                    setTimeout(resolve, 1000);
                    }   
                );
            }
        );
    
}

