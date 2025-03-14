document.querySelector("header div.signin").
    addEventListener("click", () => switchLoginWindow());

document.querySelector("header div.checkbox-wrapper").
    addEventListener("click", () => emulateCheckboxClick())

document.querySelector("header .cart-wrapper").
    addEventListener("click", () => openCloseMobileCart())

document.querySelector("header .cart-wrapper > .mobile-cart").
    addEventListener("click", (e) => e.stopPropagation())

document.querySelector(".mobile-language-selector .selected-option").
    addEventListener("click", (e) => e.target.parentNode.classList.toggle("active"))

document.querySelector(".mobile-menu .close-logo-wrapper > button").
    addEventListener("click", () => openCloseMobileMenu());

document.querySelector(".burger-wrapper").addEventListener(
    "click", () => openCloseMobileMenu()
)

window.addEventListener("load", () =>{
    articlesGridHeightNormalizer();
})

window.addEventListener("resize", () => {
    articlesGridHeightNormalizer();
})

document.querySelector("#articles .mobile-chapter-opener").
    addEventListener("click", (e) => e.target.classList.toggle("active"));

function switchLanguageSelector(){
    let selector = document.querySelector(".language-selector-wrapper > div");
    if(selector) selector.classList.toggle('hidden');
}

function switchLoginWindow(){
    let form = document.querySelector("header .signin-menu");
    if(form) form.classList.toggle('hidden');
}

function emulateCheckboxClick(){
    let checkbox = document.querySelector("header div.checkbox-wrapper > input");
    if(checkbox) checkbox.checked = !checkbox.checked;
}

function openCloseMobileCart(){
    let cart = document.querySelector("header .cart-wrapper")
    if(cart) cart.classList.toggle('active');
}

function openCloseMobileMenu(){
    let menu = document.querySelector(".mobile-menu-wrapper")?.classList.toggle("active");
}

function articlesGridHeightNormalizer(){
    let gridRows = 0;
    let gap = 0;
    switch (true){
        case (window.innerWidth > 1280): gridRows = 4; gap = 32; break;
        case(window.innerWidth <= 1280 && window.innerWidth > 768): gridRows = 3; gap = 24; break;
        case(window.innerWidth <= 768 && window.innerWidth > 480): gridRows = 2; gap = 24; break;
        default: gridRows = 1; gap = 16; break;
    }

    console.log(window.innerWidth, gridRows, gap);

    if(gridRows === 0 || document.querySelectorAll(".uniform-article-grid .uniform-article")?.length <= gridRows)
        return;

    let articles = document.querySelectorAll(".uniform-article");

    for(let i = gridRows; i <= articles.length-1; i++){
        articles[i].style.marginTop = ``;
        let prevEndPoint = articles[i-gridRows].children[0].getBoundingClientRect().bottom;
        let topDiff = prevEndPoint - articles[i].getBoundingClientRect().top + gap;
        articles[i].style.marginTop = `${topDiff}px`;
    }
}