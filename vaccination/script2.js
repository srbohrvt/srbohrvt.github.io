let now_date = new Date()
let cur_month = now_date.getMonth();
let cur_year = now_date.getFullYear();
setCal(cur_month)
function getTime() {
  // initialize time-related variables with current time settings
  let now = new Date()
  let hour = now.getHours()
  let minute = now.getMinutes()
  now = null
  let ampm = ""

  // validate hour values and set value of ampm
  if (hour >= 12) {
    hour -= 12
    ampm = "PM"
  } else
    ampm = "AM"
  hour = (hour == 0) ? 12 : hour

  // add zero digit to a one digit minute
  if (minute < 10)
    minute = "0" + minute // do not parse this number!

  // return time string
  return hour + ":" + minute + " " + ampm
}

function leapYear(year) {
  if (year % 4 == 0) // basic rule
    return true // is leap year
  return false // is not leap year
}

function getDays(month, year) {
  // create array to hold number of days in each month
  let ar = new Array(12)
  ar[0] = 31 // January
  ar[1] = (leapYear(year)) ? 29 : 28 // February
  ar[2] = 31 // March
  ar[3] = 30 // April
  ar[4] = 31 // May
  ar[5] = 30 // June
  ar[6] = 31 // July
  ar[7] = 31 // August
  ar[8] = 30 // September
  ar[9] = 31 // October
  ar[10] = 30 // November
  ar[11] = 31 // December

  // return number of days in the specified month (parameter)
  return ar[month]
}

function getMonthName(month) {
  // create array to hold name of each month
  let ar = new Array(12)
  ar[0] = "January"
  ar[1] = "February"
  ar[2] = "March"
  ar[3] = "April"
  ar[4] = "May"
  ar[5] = "June"
  ar[6] = "July"
  ar[7] = "August"
  ar[8] = "September"
  ar[9] = "October"
  ar[10] = "November"
  ar[11] = "December"

  // return name of specified month (parameter)
  return ar[month]
}

function setCal(c_month) {
  // standard time attributes
  let now = new Date()
  let year = now.getYear()
  if (year < 1000)
    year += 1900
  //let month = now.getMonth()
  //cur_month = month;
  let monthName = getMonthName(c_month)
  let date = now.getDate()
  now = null

  // create instance of first day of month, and extract the day on which it occurs
  let firstDayInstance = new Date(year, c_month, 1)
  let firstDay = firstDayInstance.getDay()
  firstDayInstance = null

  // number of days in current month
  let days = getDays(c_month, year)

  // call function to draw calendar
  drawCal(firstDay + 1, days, date, monthName, year)
}

function createSlots(d, aps, lastDate) {
  month_for_id = ""
  day_for_id = ""
  if (cur_month < 10) {
    month_for_id += '0' + cur_month;
  } else {
    month_for_id += cur_month;
  }
  if (d < 10) {
    day_for_id += '0' + d;
  } else {
    day_for_id += d;
  }
  let id = 'appid' + month_for_id + day_for_id + "-";
  //let id = 'appid' + cur_month + d;
  let list_of_valid_id = [];
  //loop where we are took all id of appointments of sertain day d
  for (let i = 0; i < Object.keys(aps).length; i++) {
    temp_id = id + i;
    check = aps[temp_id];
    if (i == 0 && check === undefined)
        return "";
    else if (i > 0 && check === undefined)
    {
      break;
    }
    list_of_valid_id.push(temp_id);
  }

  text='<div class="slots">'
  //loop for every our valid id
  for (let j = 0; j < list_of_valid_id.length; j++) {
    let test_arr = [];
    let slots = aps[list_of_valid_id[j]]["slots"];
    let booked_dates = aps[list_of_valid_id[j]]["users"].length;
    let time = aps[list_of_valid_id[j]]["time"].substr(-5)
    for (let i = 0; i < slots; i++) {
        test_arr.push(time);
    }
    /*let test_arr = [];
    check = aps[id];
    if (check === undefined)
        return "";
    slots = aps[id]["slots"];
    booked_dates = aps[id]["users"].length;
    //needed_month = 
    time = aps[id]["time"].substr(-5)
    for (let i = 0; i < slots; i++) {
        test_arr.push(time);
    }*/

    counter = 0;

    if (slots == booked_dates) {
      for (let i = 0; i <  test_arr.length; i++) {
        text+='<div class="slot slot_Unavailable">'
        text+=test_arr[i]
        text+='</div>'
      }
    } else if (booked_dates == 0) {
      for (let i = 0; i <  test_arr.length; i++) {
        text+='<div class="slot slot_available">'
        text+=test_arr[i]
        text+='</div>'
      }
    } else {
      for (let i = 0; i < booked_dates; i++) {
        text+='<div class="slot slot_Unavailable">'
        text+=test_arr[i]
        text+='</div>'    
      }
      for (let i = booked_dates; i < slots; i++) {
        text+='<div class="slot slot_available">'
        text+=test_arr[i]
        text+='</div>'
      }
    }
  }
  text+='</div>'
  return text;
}

/*function createSlots(d, aps, lastDate) {
let id = 'appid' + cur_month + d;
let test_arr = [];
check = aps[id];
if (check === undefined)
    return "";
slots = aps[id]["slots"];
booked_dates = aps[id]["users"].length;
//needed_month = 
time = aps[id]["time"].substr(-5)
for (let i = 0; i < slots; i++) {
    test_arr.push(time);
}

text='<div class="slots">'
counter = 0;

if (slots == booked_dates) {
  for (let i = 0; i <  test_arr.length; i++) {
    text+='<div class="slot slot_Unavailable">'
    text+=test_arr[i]
    text+='</div>'
  }
} else if (booked_dates == 0) {
  for (let i = 0; i <  test_arr.length; i++) {
    text+='<div class="slot slot_available">'
    text+=test_arr[i]
    text+='</div>'
  }
} else {
  for (let i = 0; i < booked_dates; i++) {
    text+='<div class="slot slot_Unavailable">'
    text+=test_arr[i]
    text+='</div>'    
  }
  for (let i = booked_dates; i < slots; i++) {
    text+='<div class="slot slot_available">'
    text+=test_arr[i]
    text+='</div>'
  }
}
text+='</div>'
return text;
}*/
function drawCal(firstDay, lastDate, date, monthName, year) {
    // constant table settings
    let headerHeight = 50 // height of the table's header cell
    let border = 2 // 3D height of table's border
    let cellspacing = 4 // width of table's border
    let headerColor = "midnightblue" // color of table's header
    let headerSize = "+3" // size of tables header font
    let colWidth = 120 // width of columns in table
    let dayCellHeight = 25 // height of cells containing days of the week
    let dayColor = "darkblue" // color of font representing week days
    let cellHeight = 70 // height of cells representing dates in the calendar
    let todayColor = "red" // color specifying today's date in the calendar
    let timeColor = "purple" // color of font representing current time
  
    // create basic table structure
    let text = "" // initialize accumulative variable to empty string
    text += '<CENTER>'
    text += '<TABLE BORDER=' + border + ' CELLSPACING=' + cellspacing + '>' // table settings
    text += '<TH COLSPAN=7 HEIGHT=' + headerHeight + '>' // create table header cell
    text += '<FONT COLOR="' + headerColor + '" SIZE=' + headerSize + '>' // set font for table header
    text += monthName + ' ' + year
    text += '</FONT>' // close table header's font settings
    text += '</TH>' // close header cell
  
    // letiables to hold constant settings
    let openCol = '<TD WIDTH=' + colWidth + ' HEIGHT=' + dayCellHeight + '>'
    openCol += '<FONT COLOR="' + dayColor + '">'
    let closeCol = '</FONT></TD>'
  
    // create array of abbreviated day names
    let weekDay = new Array(7)
    weekDay[0] = "Sun"
    weekDay[1] = "Mon"
    weekDay[2] = "Tues"
    weekDay[3] = "Wed"
    weekDay[4] = "Thu"
    weekDay[5] = "Fri"
    weekDay[6] = "Sat"
  
    // create first row of table to set column width and specify week day
    text += '<TR ALIGN="center" VALIGN="center">'
    for (let dayNum = 0; dayNum < 7; ++dayNum) {
      text += openCol + weekDay[dayNum] + closeCol
    }
    text += '</TR>'
  
    // declaration and initialization of two variables to help with tables
    let digit = 1
    let curCell = 1
  
    fetchData(lastDate, firstDay, text, digit, curCell, date, cellHeight, todayColor, timeColor);
    
}
async function fetchData(lastDate, firstDay, text, digit, curCell, date, cellHeight, todayColor, timeColor) {
    let response = await fetch("add.php")
    let text1 = await response.text()
    let appointmets = JSON.parse(text1);
    for (let row = 1; row <= Math.ceil((lastDate + firstDay - 1) / 7); ++row) {
        text += '<TR ALIGN="right" VALIGN="top">'
        for (let col = 1; col <= 7; ++col) {
          if (digit > lastDate)
            break
          if (curCell < firstDay) {
            text += '<TD></TD>';
            curCell++
          } else {
            if (digit == date) { // current cell represent today's date
              text += '<TD style="padding-bottom: 10px;" HEIGHT=' + cellHeight + '>'
              text += '<FONT COLOR="' + todayColor + '">'
              text += digit + '.'
              text += '</FONT><BR>'
              text += '<FONT COLOR="' + timeColor + '" SIZE=2>'
              text += createSlots(digit, appointmets, lastDate)
              //text += '<CENTER>' + getTime() + '</CENTER>'
              text += '</FONT>'
              text += '</TD>'
            } else {
              text += '<TD class="td-calendar" HEIGHT=' + cellHeight + '>' + digit + '.'
              text += createSlots(digit, appointmets, lastDate)
              text += '</TD>'
            } 
            digit++
          }
        }
        text += '</TR>'
      }
    
      // close all basic table tags
      text += '</TABLE>'
      text += '</CENTER>'
    
      // print accumulative HTML string
      nd = document.querySelector('#newDiv')
      nd.innerHTML = text

      
      programme_work_after_data_loading();

}
function programme_work_after_data_loading() {

    //для всплывающего окна о том что у нас уже есть аппоинтмент 
    let time_slots = document.querySelectorAll('.slot')
    /*let modal = document.getElementById('myModal');
    let span = document.getElementsByClassName('close')[0];*/
  
    for (let i = 0; i < time_slots.length; i++) {
      time_slots[i].onclick = function() {
        if (document.querySelector('.applied-header') !== null) {
          alert("You has already applied!")
        } else if (time_slots[i].classList.contains('slot_Unavailable')) {
          isAdmin = document.getElementById('isAdmin').innerText;
          if (isAdmin === "no") {
            alert("This appointment has already been booked! Select another one.")
          } else {
            let slots_for_this_day = time_slots[i].offsetParent.querySelectorAll('.slot');
            let temp_array = []
            for (let j = 0; j < slots_for_this_day.length; j++) {
              temp_array.push(slots_for_this_day[j].innerText);
            }
            temp_array = unique(temp_array);
            let counter = 0;
            for (let k = 0; k < temp_array.length; k++) {
              if (temp_array[k] == time_slots[i].innerText) {
                break;
              }
              counter++;
            }
            let day = time_slots[i].offsetParent.innerText.split('.')[0];
            //let day = time_slots[i].offsetParent.innerText[0]
            let time = time_slots[i].offsetParent.innerText.substr(-5);
            window.location.href = `booking.php?year=${cur_year}&month=${cur_month}&day=${day}&time=${time}&id=${counter}`;
          }
        } else {
            let slots_for_this_day = time_slots[i].offsetParent.querySelectorAll('.slot');
            let temp_array = []
            for (let j = 0; j < slots_for_this_day.length; j++) {
              temp_array.push(slots_for_this_day[j].innerText);
            }
            temp_array = unique(temp_array);
            let counter = 0;
            for (let k = 0; k < temp_array.length; k++) {
              if (temp_array[k] == time_slots[i].innerText) {
                break;
              }
              counter++;
            }
            let day = time_slots[i].offsetParent.innerText.split('.')[0];
            //let day = time_slots[i].offsetParent.innerText[0]
            let time = time_slots[i].offsetParent.innerText.substr(-5);
            window.location.href = `booking.php?year=${cur_year}&month=${cur_month}&day=${day}&time=${time}&id=${counter}`;
        }
        // Объявить переменную модального окна в текущей области видимости
        // Переменная кнопки, открывающей модальное окно
        // Получение элемента <span>, который закрывает модальное окно
        // Когда пользователь нажимает кнопку, открывается pop-up форма 
        // Когда пользователь нажимает кнопку (x) <span>, закрывается окно формы
        // Когда пользователь нажимает в любое место вне формы, закрыть окно формы 
      }  
    }
    /*span.onclick = function() {
      modal.style.display = 'none';
      log.style.display = "inline";
      reg.style.display = "inline";
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
        log.style.display = "inline";
        reg.style.display = "inline";
      }
    }*/
}
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}
let next_month = document.querySelector('#toNextMonth');
next_month.addEventListener('click', handleNextMonth);
function handleNextMonth() {
  cur_month = cur_month + 1
  setCal(cur_month)
}
let prev_month = document.querySelector('#toPrevMonth');
prev_month.addEventListener('click', handlePrevMonth);
function handlePrevMonth() {
  if (cur_month == 0)
    return;
  cur_month = cur_month - 1
  setCal(cur_month)
}





// Объявить переменную модального окна в текущей области видимости
/*let modal = document.getElementById('myModal');
// Переменная кнопки, открывающей модальное окно
let btn = document.getElementById('toLog');
// Получение элемента <span>, который закрывает модальное окно
var span = document.getElementsByClassName('close')[0];
// Когда пользователь нажимает кнопку, открывается pop-up форма 
btn.onclick = function() {
  modal.style.display = 'block';
}
// Когда пользователь нажимает кнопку (x) <span>, закрывается окно формы
span.onclick = function() {
  modal.style.display = 'none';
}
// Когда пользователь нажимает в любое место вне формы, закрыть окно формы
window.onclick = function(event) {
  if (event.target == modal) {
  modal.style.display = 'none';
  }
}*/

// Объявить переменную модального окна в текущей области видимости
/*let modal1 = document.getElementById('myModal1');
// Переменная кнопки, открывающей модальное окно
let btn1 = document.getElementById('toReg');
// Получение элемента <span>, который закрывает модальное окно
let span1 = document.getElementsByClassName('close1')[0];
// Когда пользователь нажимает кнопку, открывается pop-up форма 
btn1.onclick = function() {
  modal1.style.display = 'block';
}
// Когда пользователь нажимает кнопку (x) <span>, закрывается окно формы
span1.onclick = function() {
  modal1.style.display = 'none';
}
// Когда пользователь нажимает в любое место вне формы, закрыть окно формы
window.onclick = function(event) {
  if (event.target == modal) {
    modal1.style.display = 'none';
  }
}*/
