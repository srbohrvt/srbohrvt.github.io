let X = new Array(4);
//поиск веса относительно роста
function findWeigth (grow)
{
    return Math.floor(((Math.random() * (45 - 18) + 18)*((grow/100)**2)));
}

//Заполнение матрицы нулями
for (let i = 0; i < X.length; i++) {
  X[i] = new Array(100);
  for (let j = 0; j < 100; j++)
  {
      X[i][j] = 0;
  }
}

//Заполнение матрицы ростом и весом
for (let j = 0; j < 100; j++)
{
    X[0][j] = Math.floor((
    (Math.random() * (200 - 25) + 25) + (Math.random() * (200 - 25) + 25))/2);
    X[1][j] = findWeigth(X[0][j]);
}
//Гистограмма рост-вес
let ctx1 = document.getElementById('growWeigth').getContext('2d');
let chart1 = new Chart(ctx1, {
    // The type of chart we want to create
    type: 'bar',
    // The data for our dataset
    data: {
        labels: X[1],
        datasets: [{
            label: 'Рост-вес',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: X[0],
        }]
    },
    // Configuration options go here
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    maxTicksLimit: 100
                },
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 200,
                },
            }]
        }
    }
});


//----------------------------------------------------------------------------


//Гистограмма рост/вес
let numbers = new Array(100);
for (let i = 0; i < 100; i++)
{
    numbers[i]=i;
}
//Массив значений рост/вес
function heightDevidedByWeight (mat)
{
    let ndw = new Array(100);
    for (let i = 0; i < 100; i++)
    {
        ndw[i] = +(mat[1][i]/mat[0][i]).toFixed(2);
    }
    return ndw;
}
let ratio = new Array(100)
ratio = heightDevidedByWeight(X);
let ctx2 = document.getElementById('ratio').getContext('2d');
let chart2 = new Chart(ctx2, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: numbers,
        datasets: [{
            label: 'Вес/рост каждой выборки',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: ratio,
        }]
    },

    // Configuration options go here
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    maxTicksLimit: 100
                },
            }]
        }
    }
});


//----------------------------------------------------------------------------


let s = 0.9;
noise = ((Math.random()*Math.random()*Math.random()*Math.random())/4) * (s**2 - 0) + 0;//ШУМ
for (let i = 0; i < 100; i++)
{
    X[2][i] = +(ratio[i] + noise).toFixed(5);//УРОВЕНЬ ГЛЮКОЗЫ РОСТ/ВЕС + ШУМ
}
let t = 0.1;
for (let i = 0; i < 100; i++)
{
    (X[2][i] > t)?X[3][i] = 1 : X[3][i] = 0;//больной или здоровый человек
} 


// Сделаем перебор σ и τ от 0 до 1 с шагом 0.01
let ss;
let tt;
let sickS = new Array(10)//матрица, хранящая количесво больных для каждой сигмы и тау (их по 100)
for (let i = 0; i < 10; i++)
{
    sickS[i] = new Array(100);
    for (let j = 0; j < 100; j++)
        sickS[i][j] = 0;
}
for (ss = 0.0; ss < 1; ss = +(ss + 0.1).toFixed(2))
{
    let index = Math.round(ss*10);
    noise = ((Math.random() + Math.random() + Math.random())/3) * (ss**2 - 0) + 0;//ШУМ
    let newPeople2 = new Array(100);//хранит значение глюкозы для каждого человека
    for (let i = 0; i < 100; i++)
    {
        newPeople2[i] = +(ratio[i] + noise).toFixed(5);//УРОВЕНЬ ГЛЮКОЗЫ РОСТ/ВЕС + ШУМ
    }
    for (tt = 0; tt < 1.00; tt = +(tt+0.01).toFixed(2))
    {
        let index2 = Math.round(tt*100);
        for (let j = 0; j < 100; j++)
        {
            (newPeople2[j] > tt) ? sickS[index][index2]+=1 : sickS[index][index2]+=0;
        }
    }
}
let ctx3 = document.getElementById('hdw').getContext('2d');
let chart3 = new Chart(ctx3, {
    // The type of chart we want to create
    type: 'line',
    // The data for our dataset
    data: {
        labels: numbers.map(x => x = +(x/100).toFixed(1)),
        datasets: [
            {
                label: 'количество больных от сигмы = 0',
                borderColor: 'rgb(255, 99, 132)',//розовый
                data: sickS[0],
            },
            {
                label: 'количество больных от сигмы = 0.1',
                borderColor: 'rgb(2, 99, 132)',//тёмно-синий
                data: sickS[1],
            },
            {
                label: 'количество больных от сигмы = 0.2',
                borderColor: '#00FA9A',//ярко-зеленый
                data: sickS[2],
            },
            {
                label: 'количество больных от сигмы = 0.3',
                borderColor: '#87CEEB',//голубой
                data: sickS[3],
            },
            {
                label: 'количество больных от сигмы = 0.4',
                borderColor: '#FF00FF',//фиолетово розовый
                data: sickS[4],
            },
            {
                label: 'количество больных от сигмы = 0.5',
                borderColor: '#FFFF00',//желтый
                data: sickS[5],
            },
            {
                label: 'количество больных от сигмы = 0.6',
                borderColor: '#000000',//черный
                data: sickS[6],
            },
            {
                label: 'количество больных от сигмы = 0.7',
                borderColor: '#00FFFF',//бирюзовый
                data: sickS[7],
            },
            {
                label: 'количество больных от сигмы = 0.8',
                borderColor: '#FFA500',//оранжевый
                data: sickS[8],
            },
            {
                label: 'количество больных от сигмы = 0.9',
                borderColor: '#F8F8FF',//белый
                data: sickS[9],
            },
        ]
    },
    // Configuration options go here
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    maxTicksLimit: 10
                },
            }]
        }
    }
});



/*let quantity_ratio = new Array(100);
for (let i = 0; i < quantity_ratio.length; i++) {
    quantity_ratio[i] = 0;
}
let num = 0;
for (let i = 0; i < 100; i++)
{
    quantity_ratio[i] = 
}
    
let numbers2 = new Array(100);
numbers2 = numbers;

let ctx21 = document.getElementById('ratio2').getContext('2d');
let chart21 = new Chart(ctx21, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: numbers2.map(x => x = Math.floor(x/10).toFixed(1)),
        datasets: [{
            label: 'Количество выборок с определенным отношением вес/рост',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: ratio,
        }]
    },

    // Configuration options go here
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    maxTicksLimit: 10
                },
            }]
        }
    }
});
*/