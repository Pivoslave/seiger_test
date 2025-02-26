document.querySelector("header div.signin").
    addEventListener("click", () => switchLoginWindow());

document.querySelector("header div.checkbox-wrapper").
    addEventListener("click", () => emulateCheckboxClick())

function switchLanguageSelector(){
    let selector = document.querySelector("span.language-selector-wrapper > div");
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