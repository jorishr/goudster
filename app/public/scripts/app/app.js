import { brotliDecompressSync } from "zlib";

const   toggle        = document.querySelector('#toggle'),
        extendMenu    = document.querySelector('.menu__collapse'),
        modalClose    = document.querySelector('.modal button[type="submit"]'),
        modal         = document.querySelector('.modal'),
        cookieBar     = document.querySelector('.privacy-bar'),
        cookieClosers = document.querySelectorAll('.privacy-bar a, .privacy-bar i'),
        pageBody      = document.querySelector('body'),
        header        = document.querySelector('header');

let closeBtns = Array.from(cookieClosers);
closeBtns.forEach(btn => {
    btn.addEventListener('click', function(e){
        cookieBar.classList.remove('in-view');
    });
});

toggle.addEventListener('click', function(e){   
    extendMenu.classList.toggle('visible');
});

modalClose.addEventListener('click', function(e){   
    modal.classList.remove('in-view');
});

//get the viewport height and multiply by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
//set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

if(pageBody.classList.contains('landing')){
    header.classList.add('landing');
}