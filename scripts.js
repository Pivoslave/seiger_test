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