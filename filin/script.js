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

let menu = document.querySelector('.burger-menu');
let button = menu.querySelector('.burger-menu__button');
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


let div = document.querySelector('.forth_inner_mobile');
let line = document.querySelector('.line');
let up = document.querySelector('.up');
let down = document.querySelector('.down');
let u0 = `<p class="span6">Вы покупаете терминал – мы<br>доставляем его бесплатно.<br>Лучшее место установки с<br>
высокой проходимостью: СТО,<br>мойка, ТЦ. Но вы можете<br>установить его и в своем офисе.</p>`;
let u1 = `<p class="span6">Оплата с карты поступает сразу<br>на счет страховой компании, вы<br>же получаете<br>
вознаграждение, которое<br>составит от 5 до 25%.</p>`;
let u2 = `<p class="span6">Ваши расходы – только покупка<br>терминала!</p>`;
let d0 = `<p class="span6">Терминал работает интуитивно<br>просто. Клиент в любое время<br>самостоятельно может<br>
оформить полис ОСАГО и<br>оплатить его картой.</p>`;
let d1 = `<p class="span6">Ваше вознаграждение вы видите<br>в личном кабинете, деньги в<br>любой момент можно<br>
вывести на свой расчетный счет.</p>`;
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

div.addEventListener('swiped-left', HandleLeft_Line);
let left_count = 0;
div.addEventListener('swiped-right', HandleRight_Line);
function HandleLeft_Line() {
    left_count++;

    if (left_count > 4) {
        left_count--;
        return;
    } else if (left_count == 0) {
        up.innerHTML = u0;
        down.innerHTML = d0;
        console.log(left_count)
    } else if (left_count == 1) {
        up.innerHTML = u1;
        down.innerHTML = d0;
        console.log(left_count)

    } else if (left_count == 2) {
        up.innerHTML = u1;
        down.innerHTML = d1;
        console.log(left_count)
    } else if (left_count == 3) {
        up.innerHTML = u2;
        down.innerHTML = d1;
        console.log(left_count)
    }
    line.style.transform = `translate(-${left_count*width*0.47}px, 0)`;

    //console.log('   ;   ' + left_count);
}
function HandleRight_Line() {
    if (left_count == 0) {
        return;
    }
    
    line.style.transform = `translate(-${(left_count-1)*width*0.47}px, 0)`;
    left_count--;

    if (left_count == 0) {
        up.innerHTML = u0;
        down.innerHTML = d0;
        console.log(left_count)
    } else if (left_count == 1) {
        up.innerHTML = u1;
        down.innerHTML = d0;
        console.log(left_count)

    } else if (left_count == 2) {
        up.innerHTML = u1;
        down.innerHTML = d1;
        console.log(left_count)
    } else if (left_count == 3) {
        up.innerHTML = u2;
        down.innerHTML = d1;
        console.log(left_count)
    }

    console.log(left_count);
}



let left = true;
let eventL = new Event("swiped-left");
let eventR = new Event("swiped-right");

function tick() {
    console.log(left_count);
    if (left) {
        if (left_count >= 4) {
            left_count--;
            left = false;
        } else div.dispatchEvent(eventL);
    }
    if (!left) {
        if (left_count == 0) {
            left = true;
        } else div.dispatchEvent(eventR);
    }
}
let timerId = setInterval(() => tick(), 4000);


let cards = document.querySelector('.cards');
let card = document.querySelectorAll('.card');
let numbers = document.querySelectorAll('.card_number');
card[0].addEventListener('swiped-left', HandleLeft_Card0);
card[1].addEventListener('swiped-left', HandleLeft_Card1);

card[1].addEventListener('swiped-right', HandleRight_Card1);
card[2].addEventListener('swiped-right', HandleRight_Card2);

function HandleLeft_Card0() {
    //cards.style.transform = `translate(-${width}px, 0)`;
    card[0].classList.remove('vis0');
    card[0].classList.add('hid');
    card[1].classList.add('vis1');
    card[1].classList.remove('hid');

    numbers[0].classList.remove('active');
    numbers[1].classList.add('active');

}
function HandleLeft_Card1() {
    //cards.style.transform = `translate(-${width}px, 0)`;
    card[1].classList.remove('vis1');
    card[1].classList.add('hid');
    card[2].classList.add('vis2');
    card[2].classList.remove('hid');

    numbers[1].classList.remove('active');
    numbers[2].classList.add('active');
}
function HandleRight_Card1() {
    card[1].classList.remove('vis1');
    card[1].classList.add('hid');
    card[0].classList.add('vis0');
    card[0].classList.remove('hid');

    numbers[1].classList.remove('active');
    numbers[0].classList.add('active');
}
function HandleRight_Card2() {
    card[2].classList.remove('vis2');
    card[2].classList.add('hid');
    card[1].classList.add('vis1');
    card[1].classList.remove('hid');

    numbers[2].classList.remove('active');
    numbers[1].classList.add('active');
}
