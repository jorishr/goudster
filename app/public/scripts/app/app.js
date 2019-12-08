const   toggle        = document.querySelector('#toggle'),
        extendMenu    = document.querySelector('.menu__collapse'),
        modalClose    = document.querySelector('.modal button[type="submit"]'),
        modal         = document.querySelector('.modal'),
        cookieBar     = document.querySelector('.privacy-bar'),
        cookieClosers = document.querySelectorAll('.privacy-bar a, .privacy-bar i');

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