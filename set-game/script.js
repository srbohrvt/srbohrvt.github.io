/*Settings*/
let settings = {
    numberOfPlayers: 1,
    playersNames: ['Player1'],
    gameMode: 'Practice',
    btnIsSet: false,
    btnShowSet: false,
    btnAutomatic: true
}
let names = document.querySelector('.names')
let number = document.querySelector('.numbers')
let n = 1
delegate(number, 'input', 'click', handlePlNum)
/**
 * A function to delegate one "big" event handler to a number of alike elements inside a container.
 * @param {Node} parent A HTML element (obtained with querySelector)
 * @param {string} child A CSS selector (as a string), describing children we want to handle (e.g. `'.items'`)
 * @param {string} when An event as a string, describing when we want the handler to run (e.g. `'click'`)
 * @param {(ev: Event,target: Node) => void} what The function to run on event (with parameters: the event itself and the target, which will be a child)
 */
function delegate(parent, child, when, what) {
    function eventHandling(event) {
        let eventsHandler = this;
        let closestWantedElement = event.target.closest(child);

        if (eventsHandler.contains(closestWantedElement)) {
            what(event, closestWantedElement);
        }
    }

    parent.addEventListener(when, eventHandling);
}
function handlePlNum(event, target) {
    n = target.value;
    settings.numberOfPlayers = +n;
    while (names.firstChild) {
        names.removeChild(names.firstChild);
    }
    for (let i = 0; i < n; i++) {
        let name = document.createElement('input')
        let s = 'Player' + (+i + 1)
        name.type = "text"
        name.value = s
        names.appendChild(name)
    }
    btnSetPlayersNames.style.display = 'block';
    names.style.width = `${+n * 100 + 30}px`
}

let btnSetPlayersNames = document.querySelector('.setPlayersNames');
btnSetPlayersNames.addEventListener('click', function () {
    let namesArray = []
    let namesInputs = names.querySelectorAll('input')
    for (let i = 0; i < n; i++) {
        namesArray[i] = namesInputs[i].value;
        namesInputs[i].style.color = 'rgb(255, 156, 110)';
        namesInputs[i].style.textShadow = '3px 3px 4px rgba(255, 197, 171, 0.603)';
    }
    settings.playersNames = namesArray;
});

let miscOptions = document.querySelector('.misc')
let isPractice = true
let gameMode = document.querySelector('.gameMode')
delegate(gameMode, 'input', 'click', handleGameMode)
function handleGameMode(event, target) {
    target.value == 'Practice' ? isPractice = true : isPractice = false;
    if (!isPractice) {
        miscOptions.style.display = 'none';
        settings.btnIsSet = false;
        settings.btnShowSet = false;
        settings.btnAutomatic = true;
    }
    else
        miscOptions.style.display = 'block'
    settings.gameMode = target.value
}

let enableIsSet = false
let d1 = document.querySelector('.d1');
let e1 = document.querySelector('.e1');
delegate(document.querySelector('.isSet'), 'input', 'click', handleIsSet)
function handleIsSet(event, target) {
    target.checked ? enableIsSet = true : enableIsSet = false;
    settings.btnIsSet = enableIsSet;
    if (enableIsSet) {
        d1.style.color = '#ececec';
        e1.style.color = 'rgb(124, 124, 124)';
    }
    else {
        e1.style.color = '#ececec';
        d1.style.color = 'rgb(124, 124, 124)';
    }
}

let enableShowSet = false
let d2 = document.querySelector('.d2');
let e2 = document.querySelector('.e2');
delegate(document.querySelector('.showSet'), 'input', 'click', handleShowSet)
function handleShowSet(event, target) {
    target.checked ? enableShowSet = true : enableShowSet = false;
    settings.btnShowSet = enableShowSet;

    if (enableShowSet) {
        d2.style.color = '#ececec';
        e2.style.color = 'rgb(124, 124, 124)';
    }
    else {
        e2.style.color = '#ececec';
        d2.style.color = 'rgb(124, 124, 124)';
    }
}

let automaticNoSet = true
let bb3 = document.querySelector('.bb3');
let au3 = document.querySelector('.au3');
delegate(document.querySelector('.noSet'), 'input', 'click', handleNoSet)
function handleNoSet(event, target) {
    target.checked ? automaticNoSet = false : automaticNoSet = true;
    settings.btnAutomatic = automaticNoSet;
    console.log(target.checked)
    console.log(automaticNoSet)

    if (!automaticNoSet) {
        au3.style.color = '#ececec';
        bb3.style.color = 'rgb(124, 124, 124)';
    }
    else {
        bb3.style.color = '#ececec';
        au3.style.color = 'rgb(124, 124, 124)';
    }
}

/*GAME----------------------------------------------------------------------------------------------------*/

let cards = [] //array-container of all-cards
let shapes = ['oval', 'squiggle', 'diamond']
let colors = ['red', 'green', 'purple']
let numbers = ['1', '2', '3']


let letsChoose = false;
let added3 = false;
let WinWindowNotShownLeft = true;
let players = []
let selected
let possibleToSelect = true
//making cards object
let counter = 0
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            cards[counter] = {
                id: counter,
                url: "img/" + shapes[i].toString() + "-" + colors[j].toString() + "-" + numbers[k].toString() + ".png",
                printed: false,
                shape: shapes[i],
                color: colors[j],
                number: numbers[k]
            }
            counter++;
        }
    }
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
let btnStart = document.querySelector('.btnStart')
btnStart.addEventListener('click', start)
/*let btnSettings = document.querySelector('.backToSettings');
btnSettings.addEventListener('click', backToSet)*/
let btnAdd3 = document.querySelector('.add3')
btnAdd3.addEventListener('click', add3)
let btnIsHereSet = document.querySelector('.isHereSet')
btnIsHereSet.addEventListener('click', FunctionIsHereSet)
let btnFindSet = document.querySelector('.findSetHere')
btnFindSet.addEventListener('click', FunctionFindSetHere)
function FunctionFindSetHere() {
    let set = findSet();
    if (set.length != 0) {
        for (let i = 0; i < 3; i++) {
            set[i].classList.add('tdSelectedByButton')
        }
    }
}
function FunctionIsHereSet() {
    let s = findSet()
    s.length == 0 ? setExists = false : setExists = true;
    if (setExists) {
        btnIsHereSet.innerHTML = 'Yes'
        btnIsHereSet.style.color = 'rgb(130, 235, 182)'
        btnIsHereSet.style.textShadow = '3px 3px 4px rgb(255, 255, 255)';
    } else {
        btnIsHereSet.innerHTML = 'No';
        btnIsHereSet.style.color = '#333'
        btnIsHereSet.style.textShadow = '3px 3px 4px #a6a6a6';
    }
    setTimeout(btnHTMLreset, 3000, btnIsHereSet);

    function btnHTMLreset(btn) {
        btn.innerHTML = 'Is here a set?'
        btnIsHereSet.style.color = 'rgb(255, 255, 255)'
        btnIsHereSet.style.textShadow = 'none'
    }

}
function findSet() {
    const table = document.querySelector('table')
    let setToDisplay = []
    let imagesTD
    let hiddenCards = document.querySelectorAll('.showPlus3')
    if (hiddenCards[0].style.display == 'table-cell') {
        imagesTD = table.querySelectorAll('.card')
    } else {
        imagesTD = table.querySelectorAll('.visible')
    }
    let setExists = false;
    for (let i = 0; i < 10; i++) {
        for (let j = i + 1; j < 11; j++) {
            for (let k = j + 1; k < 12; k++) {
                if (i != j && i != k && j != k) {
                    let threeCards = [];
                    threeCards.push(imagesTD[i])
                    threeCards.push(imagesTD[j])
                    threeCards.push(imagesTD[k])
                    if (checkForCorrectChoose(threeCards)) {
                        setExists = true;
                        setToDisplay = threeCards;
                    }
                }
            }
        }
    }
    return setToDisplay
}
/*function backToSet() {
    const startingPage = document.querySelector('.starting')
    const gamePage = document.querySelector('.game')
    gamePage.style.display = "none";
    startingPage.style.display = "block";

    const table = document.querySelector('table')
    const images = table.querySelectorAll('img')
    for (let i = 0; i < 15; i++) {
        images[i].src = '';
    }
    for (let i = 0; i < 27; i++) {
        cards[i].printed = false;
    }
    players = [];
    letsChoose = false;
    added3 = false;
    counter = 0;
    possibleToSelect = true;
    WinWindowNotShownLeft = true;

    remove3()

    document.querySelector('.field').style.display = 'block';
    document.querySelector('.add3').style.display = 'block';
    document.querySelector('.isHereSet').style.display = 'block';
    document.querySelector('.findSetHere').style.display = 'block';
    document.querySelector('.deck').style.display = 'block';

    //document.querySelector('.playersStat').style.position = 'absolute';
    document.querySelector('.playersStat').style.left = '50px';
    document.querySelector('.playersStat').style.transform = 'none';
}*/
function start() {
    console.log(settings)
    gameOptionsDependingOnSets(settings)

    shuffle(cards); //shuffle cards array (deck)
    document.querySelector('.pdeck').innerHTML = `15 cards left`;

    const startingPage = document.querySelector('.starting')
    const gamePage = document.querySelector('.game')
    startingPage.style.display = "none";
    gamePage.style.display = "block";

    const table = document.querySelector('table');
    delegate(table, 'td', 'click', handleTDclick);
    function handleTDclick(event, target) {
        if (letsChoose) {
            target.classList.remove('tdSelectedByButton')
            if (target.querySelector('img').src.substr(-3) != 'png')
                return;
            target.classList.toggle('tdSelected');
        }
    }

    const images = table.querySelectorAll('.figure')
    for (let i = 0; i < 12; i++) {
        let r = Math.floor(Math.random() * 26);
        if (!cards[r].printed) {
            images[i].id = r
            images[i].src = cards[r].url;
            cards[r].printed = true;
        }
        else
            i = i - 1
    }
    playersGame = playersGenerate(settings);


    let timerId = setInterval(() => tryToDisplayWinWindow(players), 1200);

}
function add3() {
    let hiddenCards = document.querySelectorAll('.showPlus3')
    if (hiddenCards[0].style.display == 'table-cell')
        return;
    let nonPrintedCardExists
    for (let i = 0; i < 27; i++) {
        if (cards[i].printed == false) {
            nonPrintedCardExists = true;
            break;
        }
    }
    if (nonPrintedCardExists) {
        hiddenCards[0].style.display = 'table-cell';
        hiddenCards[1].style.display = 'table-cell';
        hiddenCards[2].style.display = 'table-cell';
        replaceSetByNewCards(hiddenCards)
        added3 = true;
    }

    //changeCardsLeft()
}
function remove3() {
    let hiddenCards = document.querySelectorAll('.showPlus3')
    hiddenCards[0].style.display = 'none';
    hiddenCards[1].style.display = 'none';
    hiddenCards[2].style.display = 'none';

    let addToDeck = 0;
    for (let i = 0; i < 3; i++) {
        let card = hiddenCards[i].querySelector('img');
        let path = card.src;
        if (path.slice(-3) == 'png') {
            path = `img/${path.split('/')[path.split('/').length - 1]}`;
            for (let j = 0; j < 27; j++) {
                if (cards[j].url == path) {
                    cards[j].printed = false;
                    addToDeck++;
                }
            }
        }
        hiddenCards[i].querySelector('img').src = '';
    }

    added3 = false;

    let howManyLeft = 0;
    for (let i = 0; i < 27; i++) {
        if (cards[i].printed == false) howManyLeft++;
    }
    document.querySelector('.pdeck').innerHTML = `${+howManyLeft} cards left`;

}

function playersGenerate(sets) {
    let stats = document.querySelector('.playersStat')
    while (stats.firstChild) {
        stats.removeChild(stats.firstChild);
    }

    if (sets.numberOfPlayers == 1) letsChoose = true

    for (let i = 0; i < sets.numberOfPlayers; i++) {
        let stat = document.createElement('div')
        stat.classList.add('stats')
        stats.appendChild(stat);

        let statName = document.createElement('div')
        statName.classList.add('statName')
        statName.id = `${sets.playersNames[i]}`
        statName.innerHTML = sets.playersNames[i]
        stat.appendChild(statName)
        statName.style.cursor = 'pointer'

        statName.addEventListener('click', function () {
            if (!(sets.numberOfPlayers == 1)) {
                //not possible to select if this player hadn't found a set. He is switched off
                if (possibleToSelect && players[+statName.innerHTML.slice(6,statName.innerHTML.length) - 1].canGo) {
                    //Delete selected class from one player in case of clicking to an other player's name
                    /*for (let j = 0; j < settings.numberOfPlayers; j++) {
                        if (players[j].selected) {
                            players[j].selected = false;
                            document.querySelector(`#${players[j].name}`).classList.remove('statNameSelected');
                        }
                    }*/
                    letsChoose = true;
                    //Adds selected class to clicked player's name, define selected variable (number of selected player)
                    if (!statName.classList.contains('statNameSelected')) {
                        statName.classList.add('statNameSelected');
                        for (let k = 0, l = true; k < settings.numberOfPlayers && l; k++) {
                            if (players[k].name == `${statName.innerHTML}`) {
                                l = false;
                                players[k].selected = true;
                                selected = k
                                possibleToSelect = false;
                            }
                        }
                    }

                    //Startt 10 sec timer
                    var timeleft = 10;
                    var downloadTimer = setInterval(function () {
                        let selectedCards = document.querySelectorAll('.tdSelected')
                        let numOfSelectedCards
                        if (selectedCards != null) {
                            numOfSelectedCards = selectedCards.length;
                        }
                        let win = false;
                        if (numOfSelectedCards == 3) {
                            win = checkForCorrectChoose(selectedCards)
                            if (win) {
                                replaceSetByNewCards(selectedCards)
                                if (added3) {
                                    remove3();
                                }
                            }
                            timeleft = 1
                        }
                        timeleft--;
                        document.getElementById(`timer${selected}`).innerHTML = `${timeleft} s`;
                        if (timeleft <= 0) {
                            if (!win) {
                                players[selected].canGo = false;
                                statName.classList.add('statNameCannotBeSelected');
                            }
                            if (selectedCards != null) {
                                for (let i = 0; i < numOfSelectedCards; i++)
                                    selectedCards[i].classList.toggle('tdSelected');
                            }
                            letsChoose = false;
                            possibleToSelect = true;
                            document.querySelector(`#${players[selected].name}`).classList.remove('statNameSelected');

                            reEnableAllPlayersIfRoundFinishedOrSetWasDiscovered(players, win)
                            addPointsToPlayer(win, players[selected])
                            clearInterval(downloadTimer);
                        }
                    }, 1000);
                }
            } else {
                players[0].selected = true;
            }

        });

        let statPoints = document.createElement('div')
        statPoints.classList.add('statPoints')
        statPoints.innerHTML = 0
        stat.appendChild(statPoints)

        let timer = document.createElement('div')
        timer.innerHTML = '0 s'
        timer.classList.add('timer')
        timer.id = `timer${i}`
        stat.appendChild(timer)

        if (settings.numberOfPlayers == 1) {
            selected = 0
            document.querySelector(`#Player1`).classList.add('statNameSelected');
            let timer1 = document.getElementById("timer0");
            timer1.onload = init();
            function init() {
                sec = 0;
                setInterval(tick, 1000);
            }

            function tick() {
                sec++;
                timer1.innerHTML = `${sec} s`;

                letsChoose = true;
                let selectedCards = document.querySelectorAll('.tdSelected')
                let numOfSelectedCards
                if (selectedCards != null) {
                    numOfSelectedCards = selectedCards.length;
                }
                let win = false;
                if (numOfSelectedCards == 3) {
                    win = checkForCorrectChoose(selectedCards)
                    if (win) {
                        for (let i = 0; i < numOfSelectedCards; i++)
                            selectedCards[i].classList.toggle('tdSelected');
                        replaceSetByNewCards(selectedCards)
                        if (added3) {
                            remove3();
                        }
                    } else {
                        for (let i = 0; i < numOfSelectedCards; i++)
                            selectedCards[i].classList.toggle('tdSelected');
                    }
                    addPointsToPlayer(win, players[0])
                }
            }


        }

        let player = {
            id: `${i}`,
            name: `${sets.playersNames[i]}`,
            points: 0,
            timer: false,
            canGo: true,
            selected: false,
        }
        players[i] = player;
    }

    return players;
}
function checkForCorrectChoose(selectedCards) {
    let sameShapes = false
    let sameColours = false
    let sameNumbers = false
    let sameFill = false

    let difShapes = false
    let difColours = false
    let difNumbers = false
    let difFill = false
    if (selectedCards[0].querySelector('img').src.substr(-3) != 'png' ||
        selectedCards[1].querySelector('img').src.substr(-3) != 'png' ||
        selectedCards[2].querySelector('img').src.substr(-3) != 'png') {
        return false;
    }
    let c1 = cards[selectedCards[0].querySelector('img').id];
    let c2 = cards[selectedCards[1].querySelector('img').id];
    let c3 = cards[selectedCards[2].querySelector('img').id];

    if (c1.shape == c2.shape && c2.shape == c3.shape)
        sameShapes = true;
    else if (c1.shape !== c2.shape && c2.shape !== c3.shape && c3.shape !== c1.shape)
        difShapes = true;

    if (c1.color == c2.color && c1.color == c3.color)
        sameColours = true;
    else if (c1.color !== c2.color && c2.color !== c3.color && c3.color !== c1.color)
        difColours = true;

    if (c1.number == c2.number && c1.number == c3.number)
        sameNumbers = true;
    else if (c1.number !== c2.number && c2.number !== c3.number && c3.number !== c1.number)
        difNumbers = true;

    /*console.log(sameShapes)
    console.log(difShapes)
    console.log(sameColours)
    console.log(difColours)
    console.log(sameNumbers)
    console.log(difNumbers)
    console.log('------------------------------------------------------')*/

    return ((sameColours || difColours) && (sameShapes || difShapes) && (sameNumbers || difNumbers))
}
function replaceSetByNewCards(selectedCards) {
    selectedCards[0].querySelector('img').src = "";
    selectedCards[1].querySelector('img').src = "";
    selectedCards[2].querySelector('img').src = "";

    let l0 = true;
    let l1 = true;
    let l2 = true;
    for (let i = 0; i < 27 && l2; i++) {
        if (cards[i].printed == false) {
            if (l0) {
                selectedCards[0].querySelector('img').src = cards[i].url;
                cards[i].printed = true;
                selectedCards[0].querySelector('img').id = i
                l0 = false
            }
            else if (l1) {
                selectedCards[1].querySelector('img').src = cards[i].url;
                cards[i].printed = true;
                selectedCards[1].querySelector('img').id = i
                l1 = false;
            }
            else if (l2) {
                selectedCards[2].querySelector('img').src = cards[i].url;
                cards[i].printed = true;
                selectedCards[2].querySelector('img').id = i
                l2 = false;
            }
        }
    }

    //delete tdSelectedByButton class if exists
    let cardsSelectedByButton = document.querySelectorAll('.tdSelectedByButton')
    for (let i = 0; i < cardsSelectedByButton.length; i++) {
        cardsSelectedByButton[i].classList.remove('tdSelectedByButton')
    }

    //change cards left number
    let howManyLeft = 0;
    for (let i = 0; i < 27; i++) {
        if (cards[i].printed == false) howManyLeft++;
    }
    document.querySelector('.pdeck').innerHTML = `${+howManyLeft} cards left`;
    // }
}
function addPointsToPlayer(l, gamer) {
    let statPoints = document.querySelectorAll('.statPoints')

    if (l) {
        gamer.points += 100;
    } else {
        gamer.points -= 100;
    }

    statPoints[selected].innerHTML = gamer.points
}
function tryToDisplayWinWindow(players) {
    possibleToSelect = false;
    let cardsLeft = +document.querySelector('.pdeck').innerHTML.split(' ')[0]
    let s = findSet().length
    if (cardsLeft == 0 && s == 0 && WinWindowNotShownLeft) {
        possibleToSelect = false;
        //Hide game field
        WinWindowNotShownLeft = false;
        document.querySelector('.field').style.display = 'none';
        document.querySelector('.add3').style.display = 'none';
        document.querySelector('.isHereSet').style.display = 'none';
        document.querySelector('.findSetHere').style.display = 'none';
        document.querySelector('.deck').style.display = 'none';

        document.querySelector('.playersStat').style.position = 'absolute';
        document.querySelector('.playersStat').style.left = '50%';
        document.querySelector('.playersStat').style.transform = 'translateX(-50%)';

        if (players.length == 1) {
            let timePassed = +document.querySelector('.timer').innerHTML.split(' ')[0];
            document.querySelector('.timer').style.display = 'none'

            let timeSummury = document.createElement('div')
            timeSummury.innerHTML = `${timePassed} s`

            document.querySelector('.stats').appendChild(timeSummury)

            document.querySelector('.statName').classList.toggle('statNameSelected')
        } else {
            let points_names = arraySort(players)
            createListOfWinners(points_names)
        }
    } else {
        if (settings.btnAutomatic == true && cardsLeft > 0 && s == 0) {
            add3()
        }
    }
    possibleToSelect = true;
}
function arraySort(players) {
    let points = Array.from(document.querySelectorAll('.statPoints')).map(item => item.innerHTML)
    let names = Array.from(document.querySelectorAll('.statName')).map(item => item.innerHTML)
    for (let i = 0; i < players.length; i++) {
        for (let j = 0; j < players.length - i; j++) {
            if (points[j] > points[j + 1]) {
                temp = points[j];
                points[j] = points[j + 1];
                points[j + 1] = temp;

                temp2 = names[j];
                names[j] = names[j + 1];
                names[j + 1] = temp2;
            }
        }
    }
    return { points: points, names: names };
}
function createListOfWinners(points_names) {
    let newPoints = document.querySelectorAll('.statPoints');
    let newNames = document.querySelectorAll('.statName');
    let timers = document.querySelectorAll('.timer');
    let points1 = points_names['points']
    let names1 = points_names['names']

    for (let i = 0; i < points1.length; i++) {
        newNames[i].innerHTML = i+1
        newPoints[i].innerHTML = names1[points1.length - 1 - i]
        timers[i].innerHTML = points1[points1.length - 1 - i]
        
        newNames[i].classList.add('statNameSelected')
    }
}
function reEnableAllPlayersIfRoundFinishedOrSetWasDiscovered(players, win) {
    if (win || players.filter(item => item.canGo == true).length == 0) {
        for (let i = 0; i < players.length; i++) {
            if (players[i].canGo == false) {
                players[i].canGo = true
                document.getElementById(`${players[i].name}`).classList.remove('statNameCannotBeSelected')
            }
        }
    }
}
function gameOptionsDependingOnSets(settings) {
    if (settings.btnIsSet == false) btnIsHereSet.style.display = 'none'
    if (settings.btnShowSet == false) btnFindSet.style.display = 'none'
    if (settings.btnAutomatic == true) btnAdd3.style.display = 'none'
}

console.log(cards)
