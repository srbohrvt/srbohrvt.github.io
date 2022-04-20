let header = document.querySelector('header');
window.addEventListener('scroll', function() {
    if (pageYOffset !== 0) {
        header.classList.add('white-bg');
    } else if (pageYOffset == 0) {
        header.classList.remove('white-bg');
    }
});
