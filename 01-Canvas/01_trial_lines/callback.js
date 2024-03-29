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
var prev_x = 0;
var prev_y = 0;
const move = (x, y, i) => {
    console.log(x, y, i);
    c.strokeStyle = `rgb(0, 0, ${25*i})`
    c.beginPath();
    c.moveTo(prev_x, prev_y);

    c.lineTo(x, y);
    c.stroke();
    c.moveTo(x, y);
    prev_x = x;
    prev_y = y;
}


const command = (func, x, y, i) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            func(x, y, i);
            resolve();
        }, 2000);
    });
};
// a = command(move, 10, 100).then(() => {console.log("Done I guess!");})
// .then(() => {command(move, 10, 300)});

a = Promise.resolve()



// // move(100,300);
var X = 50;
var Y = 10;

for (let i = 1; i <10; i++) {
    // a = a.then(()=>{command(move, (X*i), Y*i*i)}).then(() => {console.log("Done I guess!")});
    a = a.then(
            () => {
                command(move, (X*i), Y*i*i, i)
                
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

