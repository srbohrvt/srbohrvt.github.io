let parameters = [];
let lows = [0,0,0,0,0,0,0,0];
let meds = [0,0,0,0,0,0,0,0];
let highs = [0,0,0,0,0,0,0,0];

let Inappropriate = [1,1,1,1,1,1,1,1];
let Appropriate = [1,1,1,1,1,1,1,1];
let HighlyAppropriate = [1,1,1,1,1,1,1,1];

let medians = [0,0,0,0,0,0,0,0];

let Allvalues = [[25, 35, 50],      //skorost
                [1600, 1750, 2000], //hp
                [370, 440, 560],    //uron
                [6, 9, 13],         //kd
                [30, 40, 50],       //manevr
                [300, 500, 750],    //zaschita
                [350, 390, 405],    //obzor
                [10, 20, 30]];      //mask
let names = [   "Увеличение максимальной скорости", 
                "Увеличение очков прочности", 
                "Увеличение урона", 
                "Улучшение скорости перезарядки", 
                "Улучшение маневренности", 
                "Укрепление бронирования", 
                "Увеличение обзора", 
                "Улучшение маскировки"  ];

let idNames = [0,1,2,3,4,5,6,7];

document.querySelector('button').addEventListener('click', start);
function start() {
    skorost = document.querySelector('#skorost').value;
    hp = document.querySelector('#hp').value;
    uron = document.querySelector('#uron').value;
    kd = document.querySelector('#kd').value;
    manevr = document.querySelector('#manevr').value;
    zaschita = document.querySelector('#zaschita').value;
    obzor = document.querySelector('#obzor').value;
    mask = document.querySelector('#mask').value;
    
    select = document.querySelector('#select').value;

    parameters.push(skorost);
    parameters.push(hp);
    parameters.push(uron);
    parameters.push(kd);
    parameters.push(manevr);
    parameters.push(zaschita);
    parameters.push(obzor);
    parameters.push(mask);

    for(let i = 0; i < 8; i++) {
        lows[i] = Low(parameters[i], Allvalues[i]);
        meds[i] = Med(parameters[i], Allvalues[i]);
        highs[i] = High(parameters[i], Allvalues[i]);
    }

    for (let i = 0; i < 8; i++) {
        Inappropriate[i] = F_Inappropriate(lows[i]);
        Appropriate[i] = F_Appropriate(meds[i]);
        HighlyAppropriate[i] = F_HighlyAppropriate(highs[i]);
    }

    for (let i = 0; i < 8; i++) {
        let figure = Inappropriate[i].concat(Appropriate[i]).concat(HighlyAppropriate[i]);
        let _0 = figure.filter(item => item[0] == 0);
        let _03 = figure.filter(item => item[0] == 0.3);
        let _055 = figure.filter(item => item[0] == 0.55);
        let _073 = figure.filter(item => item[0] == 0.73);
        let _1 = figure.filter(item => item[0] == 1);

        _0.sort(function(a, b) { return a[1] - b[1] }) 
        _03.sort(function(a, b) { return b[1] - a[1] }) 
        _055.sort(function(a, b) { return b[1] - a[1] }) 
        _073.sort(function(a, b) { return b[1] - a[1] }) 
        _1.sort(function(a, b) { return b[1] - a[1] }) 
        let maxCombination = _0;
        maxCombination.push(_03[0]);
        maxCombination.push(_055[0]);
        maxCombination.push(_073[0]);
        maxCombination = maxCombination.concat(_1);
        maxCombination.filter(function(item, pos) {
            return maxCombination.indexOf(item) == pos;
        }) //удалить повторы

        medians[i] = CenterOfMass(maxCombination)[0];
    }
    
    medians[4] = medians[4] - 0.125; //маневренность не так важна
    res = useSelect(medians);
    medians = res[0];
    recommendedStyle = res[1] == 1 ? "Агрессивно на 1 линии" : res[1] == 2 ? "Поддержка, на 2 линии" : "На третьей линии, избегая прямых столкновений лоб в лоб";
    medians = BubbleSort(medians);
    console.log("Рекомендовано: " + names[idNames[7]] + "; " + names[idNames[6]] + "; " + names[idNames[5]])
    console.log("Рекомендуемый стиль игры: " + recommendedStyle);
    console.log(res);
    console.log(idNames);

    document.querySelector('#li1').innerHTML = names[idNames[7]] + ";";
    document.querySelector('#li2').innerHTML = names[idNames[6]] + ";";
    document.querySelector('#li3').innerHTML = names[idNames[5]] + ";";
    document.querySelector('#s').innerHTML = "Рекомендуемый стиль игры: " + recommendedStyle + ".";

    /*console.log('parameters:');
        console.log(parameters[0]);
        console.log('Allvalues:');
        console.log(Allvalues[0])
        console.log('lows:');
        console.log(lows[0]);
        console.log('meds:');
        console.log(meds[0]);
        console.log('highs:');
        console.log(highs[0]);
        console.log('Inappropriate:');
        console.log(Inappropriate[0]);
        console.log('Appropriate:');
        console.log(Appropriate[0]);
        console.log('HighlyAppropriate:');
        console.log(HighlyAppropriate[0]);*/
    restart();

}
function Low(x, values) {
    if (x <= values[0]) return 1;
    if (x > values[0] && x < values[1]) return ((values[1] - x) / (values[1] - values[0]));
    if (x >= values[1]) return 0;
}
function Med(x, values) {
    if (x <= values[0]) return 0;
    if (x > values[0] && x < values[1]) return ((x-values[0])/(values[1]-values[0]));
    if (x >= values[1] && x < values[2]) return ((values[2]-x)/(values[2]-values[1]));
    if (x >= values[2]) return 0;
}
function High(x, values) {
    if (x <= values[1]) return 0;
    if (x > values[1] && x < values[2]) return ( (x-values[1]) / (values[2] - values[1]) );
    if (x >= values[2]) return 1;
}

values_oborudovanije = [0.3, 0.55, 0.73];

function F_Inappropriate(multiplicator) {
    dots = [[0, 0], [0, 1 * multiplicator], [0.3, 1 * multiplicator], [0.55, 0]];
    return dots;
}
function F_Appropriate(multiplicator) {
    dots = [[0.3, 0], [0.55, 1 * multiplicator], [0.73, 0]];
    return dots;
}
function F_HighlyAppropriate(multiplicator) {
    dots = [[0.55, 0], [0.73, 1 * multiplicator], [1, 1 * multiplicator], [1, 0]];
    return dots;
}

function CenterOfMass(polygon) {
    let N = polygon.length - 1;
    let cx = 0, cy = 0;
    let res = [0, 0];
    let i, j;
    let sumDet = 0;

    let factor = 0;
    for (i = 0; i < N; i++) {
        j = i + 1;
        factor = (polygon[i][0] * polygon[j][1] - polygon[j][0]
                * polygon[i][1]);
        cx += (polygon[i][0] + polygon[j][0]) * factor;
        cy += (polygon[i][1] + polygon[j][1]) * factor;

        sumDet += factor;
    }
    factor = 1 / (3 * sumDet);

    cx *= factor;
    cy *= factor;
    res[0] = cx;
    res[1] = cy;
    return res;
}

function restart() {
    parameters = [];
    lows = [0,0,0,0,0,0,0,0];
    meds = [0,0,0,0,0,0,0,0];
    highs = [0,0,0,0,0,0,0,0];

    Inappropriate = [1,1,1,1,1,1,1,1];
    Appropriate = [1,1,1,1,1,1,1,1];
    HighlyAppropriate = [1,1,1,1,1,1,1,1];

    medians = [0,0,0,0,0,0,0,0];

    Allvalues = [[25, 35, 50], 
                    [1600, 1750, 2000], 
                    [370, 440, 560], 
                    [6, 9, 13], 
                    [30, 40, 50], 
                    [300, 500, 750], 
                    [350, 390, 405], 
                    [10, 20, 30]];
    idNames = [0,1,2,3,4,5,6,7];

}

function BubbleSort(A)       // A - массив, который нужно
{                            // отсортировать по возрастанию.
    var n = A.length;
    for (var i = 0; i < n-1; i++)
     { for (var j = 0; j < n-1-i; j++)
        { 
            if (A[j+1] < A[j])
            { 
                var t = A[j+1]; 
                A[j+1] = A[j]; 
                A[j] = t;

                var t2 = idNames[j+1];
                idNames[j+1] = idNames[j];
                idNames[j] = t2;
            }
        }
     }                     
    return A;    // На выходе сортированный по возрастанию массив A.
}

function useSelect (m) {
    if (select == "line1") {
        return select1(m);
    } 
    if (select == "line2") {
        return select2(m);
    } 
    if (select == "line3") {
        return select3(m);
    }
}

function select1(m) {
    //агрессивный стиль: + к броне, урону/кд, хп
    if (m[1] < 0.45) {       //если хп мало
        if (m[5] < 0.75) {   //и еще и броня слабая
            return select2(m);
        }
    }
    if (m[5] < 0.65) {       //если броня слабая
        if (m[1] < 0.75) {   //и еще и хп не много
            return select2(m);
        }
    }
    m[1] = m[1] + 0.125;
    m[5] = m[5] + 0.125;

    if (uron < 360 && m[3] > 0.4) { //если урон совсем маленький, но кд таки стоит улучшить, добавим ему очков
        m[3] = m[3] + 0.125;
    } else {
        m[2] = m[2] + 0.125;
    }
    return [m, 1];
}
function select2(m) {
    //поддержка: скорость, броня, кд

    if (m[5] < 0.35) {       //если броня слабая
        if (m[1] < 0.45) {   //и еще и хп не много
            return select3(m);
        }
    }
    m[0] = m[0] + 0.125;
    m[5] = m[5] + 0.125;
    m[3] = m[3] + 0.125;
    return [m, 2]
}
function select3(m) {
    //3 линия: скорость, обзор, маскировка
    if (m[5] > 0.7 || m[1] > 0.8) {
        return select1(m);
    } else {
        m[0] = m[0] + 0.125;
        m[6] = m[6] + 0.125;
        m[7] = m[7] + 0.125;
        return [m, 3]
    }
}