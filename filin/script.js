let logo = document.querySelector('.header_logo');
let img = document.querySelector('.top');
window.addEventListener('scroll', function() {
    if (pageYOffset !== 0) {
        img.classList.remove('top');
        img.classList.add('top_scroll');
    } else if (pageYOffset == 0) {
        img.classList.add('top');
        img.classList.remove('top_scroll');

    }
});