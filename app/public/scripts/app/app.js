const   toggle        = document.querySelector('#toggle'),
        extendMenu    = document.querySelector('.menu__collapse'),
        modalClose    = document.querySelector('.modal button[type="submit"]'),
        modal         = document.querySelector('.modal'),
        cookieBar     = document.querySelector('.privacy-bar'),
        cookieClosers = document.querySelectorAll('.privacy-bar a, .privacy-bar i'),
        pageBody      = document.querySelector('body'),
        header        = document.querySelector('header'),
        acceptBtn     = document.querySelector('#cookie-consent'),
        checkbox      = document.querySelector('input[type="checkbox"]'),
        inputFields   = document.querySelectorAll('input[required], textarea'),
        contactSubmit = document.querySelector('form.contact button'),
        subscribeBtn  = document.querySelector('.form__consent button'),
        faders        = document.querySelectorAll('.fade-in'),
        appearOnScroll= require('./modules/intersectionObserver')

//intersection observer api fade-in
faders.forEach(fader => {
    appearOnScroll.observe(fader);
})

//header navbar functionality        
toggle.addEventListener('click', function(e){   
    extendMenu.classList.toggle('visible');
});

//adapt vh variable for mobile screen
//get the viewport height and multiply by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
//set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

//landing page functionality
if(pageBody.classList.contains('landing')){
    header.classList.add('landing');
    
    let cookieStorage = localStorage.getItem('cookieConsent');
    if(cookieStorage){cookieBar.classList.add('hide')};

    let ageStorage = localStorage.getItem('ageConsent');
    if(ageStorage){modal.classList.add('hide')};

    //close cookiebar functionality
    let closeBtns = Array.from(cookieClosers);
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function(e){
            cookieBar.classList.remove('in-view');
        });
    });

    acceptBtn.addEventListener('click', function(){
        localStorage.setItem('cookieConsent', true)
    })

    //modal functionality
    modalClose.addEventListener('click', function(e){   
        modal.classList.remove('in-view');
        if(checkbox.checked){localStorage.setItem('ageConsent', true);}       
    });
}

//form functionality
if(inputFields.length !== 0){
    if(pageBody.classList.contains('landing')){
        subscribeBtn.disabled = true;
    }
    if(pageBody.classList.contains('contact')){
        contactSubmit.disabled = true;
    }
    for(let i = 0; i < inputFields.length; i++){
        inputFields[i].addEventListener('input', function(){
            let values = [];
            let checked = checkbox.checked;
            inputFields.forEach(field => values.push(field.value));
            if(pageBody.classList.contains('landing')){
                //there is more than one checkbox on this page
                checked = document.querySelector('input[type="checkbox"].subscribe').checked
                subscribeBtn.disabled = values.includes('') || !checked;
            }       
            if(pageBody.classList.contains('contact')){

                contactSubmit.disabled = values.includes('') || !checked;
            }     
        })
    };        
};