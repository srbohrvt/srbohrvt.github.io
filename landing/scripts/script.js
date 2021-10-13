let menu = document.querySelector('.burger-menu');
let button = menu.querySelector('.burger-menu_button');
let links = menu.querySelector('.burger-menu__link');
let overlay = menu.querySelector('.burger-menu__overlay');
button.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
});
links.addEventListener('click', () => toggleMenu());
overlay.addEventListener('click', () => toggleMenu());
function toggleMenu() {
    menu.classList.toggle('burger-menu_active');
    if (menu.classList.contains('burger-menu_active')) {
        document.querySelector('body').style.overflow = 'hidden';
        //$('body').css('overflow', 'hidden');
    } else {
        document.querySelector('body').style.overflow = 'visible';
        //$('body').css('overflow', 'visible');
    }
}
