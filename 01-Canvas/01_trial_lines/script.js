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
c.moveTo(100,100);
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


let command = (func, x, y) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {resolve(func(x,y));}
        , 2000)
    }
    );
};
a = command(move, 10, 100).then(() => {console.log("Done I guess!");})
.then(() => {command(move, 10, 300)});



// // move(100,300);
var X = 50;
var Y = 10;
for (let i = 1; i <10; i++) {
    // a = a.then(()=>{command(move, (X*i), Y*i*i)}).then(() => {console.log("Done I guess!")});
    a.then(command(move, (X*i), Y*i*i)).then(() => {
        console.log("Done I guess!");
        return new Promise((resolve) => {
            setTimeout(resolve, 1000);
        }
        );
    });
    
}

