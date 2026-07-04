const images = document.querySelectorAll(".image img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let current = 0;

// Open Lightbox
images.forEach((img,index)=>{
    img.addEventListener("click",()=>{
        current = index;
        showImage();
        lightbox.classList.add("active");
    });
});

function showImage(){
    lightboxImg.src = images[current].src;
}

// Next
nextBtn.addEventListener("click",()=>{
    current++;
    if(current >= images.length){
        current = 0;
    }
    showImage();
});

// Previous
prevBtn.addEventListener("click",()=>{
    current--;
    if(current < 0){
        current = images.length-1;
    }
    showImage();
});

// Close
closeBtn.addEventListener("click",()=>{
    lightbox.classList.remove("active");
});

// Keyboard
document.addEventListener("keydown",(e)=>{

if(lightbox.classList.contains("active")){

if(e.key==="ArrowRight"){
current++;
if(current>=images.length) current=0;
showImage();
}

if(e.key==="ArrowLeft"){
current--;
if(current<0) current=images.length-1;
showImage();
}

if(e.key==="Escape"){
lightbox.classList.remove("active");
}

}

});


// Filter Buttons

const buttons = document.querySelectorAll(".filter-buttons button");
const items = document.querySelectorAll(".image");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

document.querySelector(".active").classList.remove("active");
button.classList.add("active");

const filter = button.dataset.filter;

items.forEach(item=>{

if(filter==="all" || item.classList.contains(filter)){
item.classList.remove("hide");
}
else{
item.classList.add("hide");
}

});

});

});