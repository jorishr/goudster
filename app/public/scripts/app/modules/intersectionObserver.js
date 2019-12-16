//fade-in with intersection observer API
const appearOptions = {
    threshold: 0,
    rootMargin: '0px 0px -300px 0px'
};

//the appearOnScroll function 
const appearOnScroll = new IntersectionObserver(function(
        entries,
        appearOnScroll
        ){
            entries.forEach(entry => {
                if(!entry.isIntersecting){ return; }
                else {
                    entry.target.classList.add('reveal');
                    appearOnScroll.unobserve(entry.target);
                }
            })	
        },	
    appearOptions);

module.exports = appearOnScroll;