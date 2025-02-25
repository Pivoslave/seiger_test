function switchLanguageSelector(){
    let selector = document.querySelector("span.language-selector-wrapper > div");
    if(selector) selector.classList.toggle('hidden');
}

function switchLoginWindow(){
    let form = document.querySelector("header .signin-menu");
    if(form) form.classList.toggle('hidden');
}