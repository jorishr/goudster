const   toggle     = document.querySelector('#toggle'),
        extendMenu = document.querySelector('.menu__collapse');

toggle.addEventListener('click', function(e){   
    extendMenu.classList.toggle('visible');
})