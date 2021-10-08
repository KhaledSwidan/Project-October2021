"use strict";
let landPage = document.querySelector(".landing-page");
let imgs = ["post-1.jpg", "post-2.jpg", "post-3.jpg", "work-1.jpg", "work-3.jpg", "work-4.jpg", "work-5.jpg"];
setInterval(() =>
{
    let rndmNum = Math.floor(Math.random() * imgs.length);
    landPage.style.backgroundImage = `url('img/${imgs[rndmNum]}')`;
}, 2000)


