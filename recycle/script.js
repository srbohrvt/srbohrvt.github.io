let header = document.querySelector('header');
let b_menu = document.querySelector('.burger-menu__button');
window.addEventListener('scroll', function() {
    if (pageYOffset !== 0) {
        header.classList.add('end');
        b_menu.style.top = '-1px';
    } else if (pageYOffset == 0) {
        header.classList.remove('end');
        b_menu.style.top = '31px';
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


/*let div = document.querySelector('.forth_inner_mobile');
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

    if (left_count > 3) {
        left_count--;
        return;
    } else if (left_count == 0) {
        up.innerHTML = u0;
        down.innerHTML = d0;
    } else if (left_count == 1) {
        up.innerHTML = u1;
        down.innerHTML = d0;

    } else if (left_count == 2) {
        up.innerHTML = u1;
        down.innerHTML = d1;
    } else if (left_count == 3) {
        up.innerHTML = u2;
        down.innerHTML = d1;
    }
    line.style.transform = `translate(-${left_count*width*0.47}px, 0)`;

    console.log('   ;   ' + left_count);
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
    } else if (left_count == 1) {
        up.innerHTML = u1;
        down.innerHTML = d0;

    } else if (left_count == 2) {
        up.innerHTML = u1;
        down.innerHTML = d1;
    } else if (left_count == 3) {
        up.innerHTML = u2;
        down.innerHTML = d1;
    }

    console.log('   ;   ' + left_count);

}
let left = true;
let eventL = new Event("swiped-left");
let eventR = new Event("swiped-right");

function tick() {
    console.log(left);
    if (left) {
        if (left_count >= 3) {
            left_count = 0;
            left = false;

            up.innerHTML = u0;
            down.innerHTML = d0;
            line.style.transform = `translate(-${left_count*width*0.47}px, 0)`;
        } else div.dispatchEvent(eventL);
    }
    if (!left) {
        if (left_count == 0) {
            left = true;
        } else div.dispatchEvent(eventR);
    }
}
let timerId = setInterval(() => tick(), 4000);
*/


let cards = document.querySelector('.cards');
let card = document.querySelectorAll('.card');
card[0].addEventListener('swiped-left', HandleLeft_Card0);
card[1].addEventListener('swiped-left', HandleLeft_Card1);

card[1].addEventListener('swiped-right', HandleRight_Card1);
card[2].addEventListener('swiped-right', HandleRight_Card2);

function Display0th() {
    card[1].classList.remove('vis1');
    card[1].classList.add('hid');
    card[2].classList.remove('vis2');
    card[2].classList.add('hid');

    card[0].classList.add('vis0');
    card[0].classList.remove('hid');

    numbers[1].classList.remove('active');
    numbers[2].classList.remove('active');
    numbers[0].classList.add('active');
}
function Display1st() {
    card[0].classList.remove('vis0');
    card[0].classList.add('hid');
    card[2].classList.remove('vis2');
    card[2].classList.add('hid');

    card[1].classList.add('vis1');
    card[1].classList.remove('hid');

    numbers[0].classList.remove('active');
    numbers[2].classList.remove('active');
    numbers[1].classList.add('active');
}
function Display2nd() {
    card[0].classList.remove('vis0');
    card[0].classList.add('hid');
    card[1].classList.remove('vis1');
    card[1].classList.add('hid');

    card[2].classList.add('vis2');
    card[2].classList.remove('hid');

    numbers[0].classList.remove('active');
    numbers[1].classList.remove('active');
    numbers[2].classList.add('active');
}

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


let cards2 = document.querySelector('.cards2');
let card2 = document.querySelectorAll('.card2');

cards2.addEventListener('swiped-left', HandleLeft_Card);
cards2.addEventListener('swiped-right', HandleRight_Card);

function HandleLeft_Card() {
    let current = cards2.style.transform;
    //max -787px
    if (current.length <= 0 || current.slice(10, 11) == '0') {
        cards2.style.transform = `translate(-295px, 0)`;
    } else if (current.slice(10, 14) == '-885' ) {
        return;
    } else {
        current = current.slice(10, 14);
        cards2.style.transform = `translate(${current - 295}px, 0)`;
    }

    //cards2.style.transform = `translate(-270px, 0)`;
}
function HandleRight_Card() {
    let current = cards2.style.transform;
    //max -787px
    if (current.length <= 0) {
        return;
    } else if (current.slice(10, 14) == '0' ) {
        return;
    } else {
        current = current.slice(10, 14);
        cards2.style.transform = `translate(${+current + 295}px, 0)`;
    }

    //cards2.style.transform = `translate(270px, 0)`;
}
/*card2[0].addEventListener('swiped-left', HandleLeft_Card02);
card2[1].addEventListener('swiped-left', HandleLeft_Card12);

card2[1].addEventListener('swiped-right', HandleRight_Card12);
card2[2].addEventListener('swiped-right', HandleRight_Card22);


function HandleLeft_Card02() {
    //cards.style.transform = `translate(-${width}px, 0)`;
    card2[0].classList.remove('vis02');
    card2[0].classList.add('hid2');
    card2[1].classList.add('vis12');
    card2[1].classList.remove('hid2');

}
function HandleLeft_Card12() {
    //cards.style.transform = `translate(-${width}px, 0)`;
    card2[1].classList.remove('vis12');
    card2[1].classList.add('hid2');
    card2[2].classList.add('vis22');
    card2[2].classList.remove('hid2');
}
function HandleRight_Card12() {
    card2[1].classList.remove('vis12');
    card2[1].classList.add('hid2');
    card2[0].classList.add('vis02');
    card2[0].classList.remove('hid2');
}
function HandleRight_Card22() {
    card2[2].classList.remove('vis22');
    card2[2].classList.add('hid2');
    card2[1].classList.add('vis12');
    card2[1].classList.remove('hid2');
}*/



//Формы
let cvr = document.querySelector('.cover');
let body = document.querySelector('body');
//Оставить заяку
let reqFormCaller = document.querySelector('.request');
let reqContainer = document.querySelector('.reqForm');
let reqFormInner = `<h3>Оставить заявку</h3><div class="close1">x</div>
                        <form method="POST" action="actions.php" id="get_req_form"> 
                            <input type="text" name="reqName" placeholder="Имя" required><br>
                            <input type="number" name="reqNumber" placeholder="Телефон" required><br>
                                <button type="submit">Отправить</button>
                        </form>
                    <div class="succes_error_reporter"></div>
                    <img src="img/wave.png">`
reqFormCaller.addEventListener('click', reqFormDisplay);
function reqFormDisplay() {
    reqContainer.style.display = "block";
    cvr.style.display = "block";
    reqContainer.innerHTML = reqFormInner;

    let cls = document.querySelector('.close1');
    cls.addEventListener('click', clsFunc);
    cvr.addEventListener('click', clsFunc);

    //body.style.overflow = "hidden";


    const form = document.getElementById("get_req_form");
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        reqContainer.style.cursor = 'wait';
        const formData = new FormData(this);

        fetch('actions.php', {
            method: 'post',
            body: formData
        }).then(function(response) {
            return response.text();
        }).then(function(text) {
            console.log(text);
            //let cont = reqContainer.querySelector('.succes_error_reporter');
            if (text == 'Message sent!') {
                form.innerHTML = '<div class="succes_error_reporter"><p class="success_r">Заявка успешно отправлена.<br>Наш специалист свяжется с Вами в ближайшее время.</p></div>'
            } else {
                form.innerHTML = '<div class="succes_error_reporter"><p class="error_r">Возникла ошибка</p></div>'
            }
            reqContainer.style.cursor = 'default';

        }).catch(function(error) {
            console.log(error);
        })
    });
}

function clsFunc() {
    reqContainer.style.display = "none";
    cvr.style.display = "none";

    //body.style.overflow = "visible";
}

//Заказать терминал
let terms = document.querySelectorAll('.order-terminal');
for (let i = 0; i < terms.length; i++) {
    terms[i].addEventListener('click', orderTerminal);
}
let ordContainer = document.querySelector('.orderForm');
let ordFormInner = `<h3>Заказать терминал</h3><div class="close3">x</div>
                        <form method="POST" id="get_term_form"> 
                            <input type="text" name="ordName" placeholder="Имя" required><br>
                            <input type="number" name="ordNumber" placeholder="Телефон" required><br>
                                <button type="submit">Заказать</button>
                        </form>
                    <div class="succes_error_reporter"></div>
                    <img src="img/wave.png">
                        `
function orderTerminal() {
    ordContainer.style.display = "block";
    cvr.style.display = "block";
    ordContainer.innerHTML = ordFormInner;

    let cls = document.querySelector('.close3');
    cls.addEventListener('click', clsFunc3);
    cvr.addEventListener('click', clsFunc3);

    //body.style.overflow = "hidden";


    const form = document.getElementById("get_term_form");
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        ordContainer.style.cursor = 'wait';
        const formData = new FormData(this);

        fetch('actions2.php', {
            method: 'post',
            body: formData
        }).then(function(response) {
            return response.text();
        }).then(function(text) {
            //console.log(text);
            //let cont = ordContainer.querySelector('.succes_error_reporter');
            if (text == 'Message sent!') {
                form.innerHTML = '<div class="succes_error_reporter"><p class="success_r">Запрос успешно отправлен<br>Наш специалист свяжется с Вами в ближайшее время</p></div>'
            } else {
                form.innerHTML = '<div class="succes_error_reporter"><p class="error_r">Возникла ошибка</p></div>'
            }
            ordContainer.style.cursor = 'default';

        }).catch(function(error) {
            console.log(error);
        })
    });
}
function clsFunc3() {
    ordContainer.style.display = "none";
    cvr.style.display = "none";

    //body.style.overflow = "visible";
}


//Получить презентацию
let presFormCaller = document.querySelector('.download');
let presContainer = document.querySelector('.presForm');
let presFormInner = `<h3>Скачать презентацию</h3><div class="close2">x</div>
                        <form method="POST" id="get_pres_form"> 
                            <input type="text" name="presName" placeholder="Имя" required><br>
                            <input type="email" name="presEmail" placeholder="E-mail" required><br>
                                <button type="submit">Получить презентацию</button>
                        </form>
                        <div class="succes_error_reporter"></div>
                        <img src="img/wave.png">
                        `
presFormCaller.addEventListener('click', presFormDisplay);
function presFormDisplay() {
    presContainer.style.display = "block";
    presContainer.innerHTML = presFormInner;

    cvr.style.display = "block";

    let cls = document.querySelector('.close2');
    cls.addEventListener('click', clsFunc2);
    cvr.addEventListener('click', clsFunc2);

    //body.style.overflow = "hidden";

    const form = document.getElementById("get_pres_form");
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        presContainer.style.cursor = 'wait';
        const formData = new FormData(this);

        fetch('actions4.php', {
            method: 'post',
            body: formData
        }).then(function(response) {
            return response.text();
        }).then(function(text) {
            //console.log(text);
            //let cont = presContainer.querySelector('.succes_error_reporter');
            if (text == 'Message sent!Message sent!') {
                form.innerHTML = '<div class="succes_error_reporter"><p class="success_r">Презентация успешно отправлена.<br>Проверьте свою почту!</p></div>'
            } else {
                form.innerHTML = '<div class="succes_error_reporter"><p class="error_r">Возникла ошибка</p></div>'
            }
            presContainer.style.cursor = 'default';

        }).catch(function(error) {
            console.log(error);
        })
    });

}
function clsFunc2() {
    presContainer.style.display = "none";
    cvr.style.display = "none";

    //body.style.overflow = "visible";
}

//Вторая форма на сайте в черном прямоугольнике
let bb = document.querySelector('.black_box_wrapper').querySelector('.black_box');
const form = document.getElementById("know_price_form");
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        bb.style.cursor = 'wait';
        const formData = new FormData(this);

        fetch('actions3.php', {
            method: 'post',
            body: formData
        }).then(function(response) {
            return response.text();
        }).then(function(text) {
            console.log(text);
            let s = bb.querySelector('.presentation');
            if (text == 'Message sent!') {
                s.innerHTML = `
                                <p class="success_p">Запрос успешно отправлен<br>Наш специалист свяжется с Вами в ближайшее время</p>`
            } else {
                s.innerHTML = '<p class="error_r">Возникла ошибка</p>'
            }
            bb.style.cursor = 'default';

        }).catch(function(error) {
            console.log(error);
        })
    });


//первая форма на сайте в черном прямоугольнике

let bb1 = document.querySelectorAll('.black_box')[0];
const form1 = document.getElementById("get_pres");
    form1.addEventListener('submit', function(e) {
        e.preventDefault();
        bb1.style.cursor = 'wait';
        const formData = new FormData(this);

        fetch('actions5.php', {
            method: 'post',
            body: formData
        }).then(function(response) {
            return response.text();
        }).then(function(text) {
            console.log(text);
            let s = bb1.querySelector('.presentation');
            if (text == 'Message sent!Message sent!') {
                s.innerHTML = '<p class="success_p">Презентация успешно отправлена.<br>Проверьте свою почту!</p>'
            } else {
                s.innerHTML = '<p class="error_r">Возникла ошибка</p>'
            }
            bb1.style.cursor = 'default';

        }).catch(function(error) {
            console.log(error);
        })
});