"use strict";

// setting box;
document.querySelector(".toggle-setting").onclick = function ()
{
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
}

// switch color;
let lis = document.querySelectorAll(".colors-list li");
let mainColor = localStorage.getItem("colorList");

if (mainColor != null) {
    document.documentElement.style.setProperty("--main-color", mainColor);
    document.querySelectorAll(".colors-list li").forEach((li) =>
    {
        li.classList.remove("active");
        if (li.dataset.color === mainColor) {li.classList.add("active");
        }
    })
}
lis.forEach((li) =>
{
    li.addEventListener("click", (e) =>
    {
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        localStorage.setItem("colorList", e.target.dataset.color);
        handleActive(e);
    })
})


// landing RandBg;
let landPage = document.querySelector(".landing-page");
let imgs = ["post-1.jpg", "post-2.jpg", "post-3.jpg", "work-1.jpg", "work-3.jpg", "work-4.jpg", "work-5.jpg"];
let RanSpans = document.querySelectorAll(".ranBackEl span");
let bgOption;
let ctlInterval;
function randomizeImgs()
{
    if (bgOption === true) {
        ctlInterval = setInterval(() =>
        {
            let rndmNum = Math.floor(Math.random() * imgs.length);
            landPage.style.backgroundImage = `url('img/${imgs[rndmNum]}')`;
        }, 1500)
    }
};

// localStorage RandBg;
let bgLocalStorage = localStorage.getItem("bg_option");
if (bgLocalStorage !== null) {
    RanSpans.forEach((span) =>
    {
        span.classList.remove("active");
    });
    if (bgLocalStorage === true) {
        bgOption = true;
        document.querySelector(".ranBackEl .yes").classList.add("active");
    } else {
        bgOption = false;
        document.querySelector(".ranBackEl .no").classList.add("active");
    }
}

// switch RandBg;
RanSpans.forEach((span) =>
{
    span.addEventListener("click", (e) =>
    {
        handleActive(e); 
        if (e.target.dataset.background === "yes") {
            bgOption = true;
            randomizeImgs();
            localStorage.setItem("bg_option", true);
        } else {
            bgOption = false;
            clearInterval(ctlInterval);
            localStorage.setItem("bg_option", false);
        }
    })
})


// select skills selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function ()
{
    let skillsOffsetTop = ourSkills.offsetTop; //The offsetTop property returns the top position (in pixels) relative to the top of the offsetParent element.
    let skillsOuterHeight = ourSkills.offsetHeight; //offsetheight = height including border & padding
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;
    
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
    } else {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(span =>
        {
            span.style.width = span.dataset.progress;
        })
    }
};


// create imgs popUp;
let ourGallery = document.querySelectorAll(".gallery .imgs-box img");
ourGallery.forEach(img =>
{
    img.addEventListener("click", (e) =>
    {
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        if (img.alt != null) {
            let imgHeading = document.createElement("h3");
            let imgTxt = document.createTextNode(img.alt);
            imgHeading.appendChild(imgTxt);
            popupBox.appendChild(imgHeading);
        }

        let ppupimg = document.createElement("img");
        ppupimg.src = e.target.src;
        popupBox.appendChild(ppupimg);

        document.body.appendChild(popupBox);

        let closBtn = document.createElement("span");
        let closBtnTxt = document.createTextNode("X");
        closBtn.appendChild(closBtnTxt);
        closBtn.className = "closBtn";
        popupBox.appendChild(closBtn);

    })
})

document.addEventListener("click", (e) =>
{
    if (e.target.className == "closBtn") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
})


// select all bullets;
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");
function scrollToSomeWhere(element)
{
    element.forEach((ele) =>
    {
        ele.addEventListener("click", (e) =>
        {
            document.querySelector(e.target.dataset.section).scrollIntoView({ behavior: 'smooth' });
        })
    });
}
scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

// handleactive states;
function handleActive(ev)
{
    ev.target.parentElement.querySelectorAll(".active").forEach((i) => { i.classList.remove("active"); })
    ev.target.classList.add("active");
}  


// manage bullets opt;
let bullOpt = document.querySelectorAll(".bulletsopt span");
let bullCont = document.querySelector(".nav-bullets");

if (localStorage.getItem("bulletState") != null) {
    bullOpt.forEach(bull =>
    {
        bull.classList.remove("active");
    })
    if (localStorage.getItem("bulletState") === "block") {
        bullCont.style.display = "block";
        document.querySelector(".bulletsopt .yes").classList.add("active");
    } else {
        bullCont.style.display = "none";
        document.querySelector(".bulletsopt .no").classList.add("active");
    }
}

bullOpt.forEach(bull =>
{
    bull.addEventListener("click", (e) =>
    {
        if (e.target.dataset.display === "yes") {
            bullCont.style.display = "block";
            localStorage.setItem("bulletState", e.target.dataset.display);
        } else {
            bullCont.style.display = "none";
            localStorage.setItem("bulletState", e.target.dataset.display);
        }
        handleActive(e);
    });
});


// reset options;
document.querySelector(".resetOpts").onclick = function ()
{
    // localStorage.clear(); this 'll clear all storage, if U need specific one U've to select it.....
    localStorage.removeItem("bg_option");
    localStorage.removeItem("colorList");
    localStorage.removeItem("bulletState");

    window.location.reload();
};


// toggle Ul;
let toggleBtn = document.querySelector(".toggleUl");
let linksUl = document.querySelector(".links");
toggleBtn.onclick = function (e)
{
    e.stopPropagation();
    linksUl.classList.toggle("open");
};

document.addEventListener("click", e =>
{
    if (e.target !== toggleBtn && e.target !== linksUl) {
        if (linksUl.classList.contains("open")) {
            linksUl.classList.toggle("open");
        }
    }
});

linksUl.onclick = function (e) { e.stopPropagation() };