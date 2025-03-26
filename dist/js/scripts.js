"use strict";function switchLanguageSelector(){var e=document.querySelector(".language-selector-wrapper > div");e&&e.classList.toggle("hidden")}function switchLoginWindow(){var e=document.querySelector("header .signin-menu");e&&e.classList.toggle("hidden")}function emulateCheckboxClick(){var e=document.querySelector("header div.checkbox-wrapper > input");e&&(e.checked=!e.checked)}function openCloseMobileCart(){var e=document.querySelector("header .cart-wrapper");e&&e.classList.toggle("active")}function openCloseMobileMenu(){var e;null===(e=document.querySelector(".mobile-menu-wrapper"))||void 0===e||e.classList.toggle("active")}function articlesGridHeightNormalizer(){var e,t=0,n=0;switch(!0){case window.innerWidth>1280:t=4,n=32;break;case window.innerWidth<=1280&&window.innerWidth>768:t=3,n=24;break;case window.innerWidth<=768&&window.innerWidth>480:t=2,n=24;break;default:t=1,n=16}if(console.log(window.innerWidth,t,n),!(0===t||(null===(e=document.querySelectorAll(".uniform-article-grid .uniform-article"))||void 0===e?void 0:e.length)<=t))for(var r=document.querySelectorAll(".uniform-article"),o=t;o<=r.length-1;o++){r[o].style.marginTop="";var i=r[o-t].children[0].getBoundingClientRect().bottom-r[o].getBoundingClientRect().top+n;r[o].style.marginTop="".concat(i,"px")}}function expandCollapseFooter(){document.querySelector("footer").classList.toggle("collapsed")}document.querySelector("header div.signin").addEventListener("click",(function(){return switchLoginWindow()})),document.querySelector("header div.checkbox-wrapper").addEventListener("click",(function(){return emulateCheckboxClick()})),document.querySelector("header .cart-wrapper").addEventListener("click",(function(){return openCloseMobileCart()})),document.querySelector("header .cart-wrapper > .mobile-cart").addEventListener("click",(function(e){return e.stopPropagation()})),document.querySelector(".mobile-language-selector .selected-option").addEventListener("click",(function(e){return e.target.parentNode.classList.toggle("active")})),document.querySelector(".mobile-menu .close-logo-wrapper > button").addEventListener("click",(function(){return openCloseMobileMenu()})),document.querySelector(".burger-wrapper").addEventListener("click",(function(){return openCloseMobileMenu()})),window.addEventListener("load",(function(){articlesGridHeightNormalizer()})),window.addEventListener("resize",(function(){articlesGridHeightNormalizer()})),document.querySelector(".mobile-chapter-opener").addEventListener("click",(function(e){return e.target.classList.toggle("active")})),document.querySelector("footer .hide-show").addEventListener("click",(function(){return expandCollapseFooter()}));