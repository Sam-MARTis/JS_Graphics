let slides = document.getElementsByClassName("Slides");

// const showSlides = () => {
//     for(let i = 0; i < slides.length; i++) {
//         let slide = slides[i];


//     }
// }
var i = 0;
let timeSinceLastSlide = 0;
const autoSlide = () => {
    timeSinceLastSlide += 100;
    if(timeSinceLastSlide >= 4000){
        nextSlide();
    }
}
const SlideShow = (i) => {
    for(let k = 0; k < slides.length; k++) {
        if(k!=i){
            slides[k].classList.remove("active")
            slides[k].classList.add("inactive")
        }
        else{
            slides[k].classList.remove("inactive")
            slides[k].classList.add("active")
        }

    }

}
const nextSlide = () => {
    timeSinceLastSlide=0;
    console.log(i);
    i++;
    if(i==slides.length) i=0;
    SlideShow(i);
}
setInterval(autoSlide, 100)