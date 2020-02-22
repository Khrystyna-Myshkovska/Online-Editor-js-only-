'use strict'

let getSel = selector => document.querySelector(selector);

//спершу ми доступились до селекторів за допомогою arrow function,

// повісили click на кнопку edit, при  якому блок з полем для редагування стає видимим, там ми зможемо редагувати/видаляти Innerhtml з div
// .up-content, передаючи його вміст в textarea.value

getSel('#edit-btn').onclick = function () {
    getSel('.block-style').style.display = 'none';
    getSel('.block-textarea').style.display = 'block';
    getSel('#textarea').value = getSel('.up-content').innerHTML;
}
// при click на кнопку save  ми зберігаємо редаговане чи видалене textarea.value в оновлений .up-content.innerhtml,
//  та робимо невидимий блок з полем для редагування
getSel('#save-btn').onclick = function () {
    getSel('.up-content').innerHTML = getSel('#textarea').value;
    getSel('#textarea').value = '';
    getSel('.block-textarea').style.display = 'none';
}

// повісили click на кнопку style, при  якому блок з полем для редагування .block-style стає видимим,a .block-textarea ховається;
// там ми зможемо редагувати розмір , стиль шрифту;колір фону,тексту.... 
getSel('#style-btn').onclick = function () {
    getSel('.block-textarea').style.display = 'none';
    getSel('.block-style').style.display = 'flex';
}

// доступаємось через forms до input radio, які відповідають за font size у блоці .up-content,при click редагується текст

let radioPX = document.forms['fontsize-buttons'];
for (let i = 0; i < radioPX.length; i++) {
    radioPX.elements[i].addEventListener('click', function () {
        getSel('.up-content').style.fontSize = this.value;
    })
}

// доступаємось через forms до select => options, які відповідають за font family у блоці .up-content,при click редагується текст

let selectfontStyle = document.forms['select-fontfamily'];
selectfontStyle.selectf.onchange = function () {
    for (let i = 0; i < selectfontStyle.selectf.options.length; i++) {
        if (selectfontStyle.selectf.options[i].selected) {
            getSel('.up-content').style.fontFamily = this.value;
        }
    }
}

// доступаємось через forms до input checkbox, один з них відповідає за font-weight,інший за font style, при click ми собі редагуємо,
//  стилізуємо або відміняємо те, що вибрали за допомогою умови if else
let checkFontStyle = document.forms['checkBox'];
checkFontStyle.styleweight.onclick = function () {
    if (this.checked) {
        getSel('.up-content').style.fontWeight = 'bold';
    } else {
        getSel('.up-content').style.fontWeight = '';
    }
}
checkFontStyle.stylefont.onclick = function () {
    if (this.checked) {
        getSel('.up-content').style.fontStyle = 'italic';
    } else {
        getSel('.up-content').style.fontStyle = '';
    }
}

// доступаємось через кнопку Color of text до блоку з кольорами для вибору кольору шрифту в блоці зверху,
//  через цикл перебираємо кольори, за допомогою classlist доступаємось по індексу до так званного самого кольору
getSel('#btn-color-text').onclick = function () {
    getSel('.boxColorText').style.display = 'flex';
    getSel('.boxColorText').style.flexWrap = 'wrap';
    getSel('.boxBackgrColor').style.display = 'none';
    let colorText = document.querySelectorAll('.box.text');
    for (let i = 0; i < colorText.length; i++) {
        colorText[i].onclick = function () {
            getSel('.up-content').style.color = this.classList[2];
            getSel('.boxColorText').style.display = '';
        }
    }
}

// доступаємось через кнопку Background color до блоку з кольорами для вибору кольору фону в блоці зверху,
//  через цикл перебираємо кольори, за допомогою classlist доступаємось по індексу до так званного самого кольору

getSel('#btn-background-color').onclick = function () {
    getSel('.boxBackgrColor').style.display = 'flex';
    getSel('.boxBackgrColor').style.flexWrap = 'wrap';
    getSel('.boxColorText').style.display = 'none';
    let colorBg = document.querySelectorAll('.box.bg');
    for (let i = 0; i < colorBg.length; i++) {
        colorBg[i].onclick = function () {
            getSel('.up-content').style.backgroundColor = this.classList[2];
            getSel('.boxBackgrColor').style.display = '';
        }
    }
}

// доступились до кнопки add, при кліку якої ховається головний контейнер і появляється блок з вибором table or list
getSel('#add-btn').onclick = function () {
    getSel('.main-container').style.display = 'none';
    getSel('.second-container').style.display = 'block';
}


// через forms доступились до radio button,при кліку на які з'являються нові блоки для створення або таблиці або списку
let formChoose = document.forms['chooseForm'];
let table = formChoose.chooseTableOrList[0];
let list = formChoose.chooseTableOrList[1];


//  при виборі створення таблиці , блок для створення списку ховається , а для таблиці стає видимим 
table.onclick = function () {
    getSel('.table').style.display = 'block';
    getSel('.list').style.display = '';
}

// Доступ до полів таблиці по їх селекторах, за допомогою яких ми можемо сформувати та стилізувати таблицю

let countTr = getSel('.countTr');
let countTd = getSel('.countTd');
let widthTd = getSel('.widthTd');
let heightTd = getSel('.heightTd');
let borderWidth = getSel('.borderWidth');
let borderType = getSel('.borderType');
let colorBorder = getSel('.colorBorder');
let createTablebtn = getSel('#createTable');



//  функція, яка викликається при кліку на кнопку create Table, тут обробляються дані, які ввів користувач раніше у полі для створення таблиці,
// за допомогою циклу ми перебираємо к-сть введенних tr та створюємо їх, передаючи оновлене textarea.value, 
// блок із створенням таблиці ставимо none, а .main-container = block, при кліці на кнопку save , зберігаємо нове textarea.value, 
// оновлюється innerHTML уже з готовою таблицею
// данні полів таблиці зачищуються
createTablebtn.onclick = function () {

    let tr = countTr.value;
    let td = countTd.value;
    let tdW = widthTd.value;
    let tdH = heightTd.value;
    let brdW = borderWidth.value;
    let brdT = borderType.value;
    let brdC = colorBorder.value;
    getSel('#textarea').value += `<table>`;
    for (let i = 1; i <= td; i++) {
        getSel('#textarea').value += `<tr>`;
        for (let j = 1; j <= tr; j++) {
            getSel('#textarea').value += `<td style= "width:${tdW}px; height:${tdH}px; border:${brdW}px ${brdT} ${brdC}; border-collapse:collapse; border-spacing: 0"> TD </td>`;
        }
        getSel('#textarea').value += `</tr>`;
    }
    getSel('#textarea').value += `</table>`;
    getSel('.second-container ').style.display = 'none';
    getSel('.main-container').style.display = 'block';
    getSel('.up-content').style.display = 'block';
    getSel('.table').style.display = 'none';
    table.checked = false;
    countTr.value = '';
    countTd.value = '';
    widthTd.value = '';
    heightTd.value = '';
    borderWidth.value = '';
    borderType.value = '';
    colorBorder.value = '';
}

//  при виборі створення списку , блок для створення таблиці ховається , а для списку  стає видимим 

list.onclick = function () {
    getSel('.list').style.display = 'block';
    getSel('.table').style.display = '';
}

// Доступ до полів формування списку , за допомогою якого ми можемо сформувати та стилізувати 

let countLi = getSel('.countLi');
let selectType = getSel('.editcolsel');
let createListbtn = getSel('#createList');


//  функція, яка викликається при кліку на кнопку create list, тут обробляються дані, які ввів користувач раніше у полі для створення списку,
// за допомогою циклу ми перебираємо к-сть введенних li та створюємо їх, передаючи оновлене textarea.value, 
// блок із створенням списку ставимо none, а .main-container = block, при кліці на кнопку save , зберігаємо нове textarea.value, 
// оновлюється innerHTML уже з готовим списком
// данні полів списку зачищуються

createListbtn.onclick = function () {
    let count = countLi.value;
    let typeLi = selectType.value;
    getSel('#textarea').value += `<ul type = ${typeLi}>`;
    for (let i = 1; i <= count; i++) {
        getSel('#textarea').value += `<li> item ${i} </li>`
    }
    getSel('#textarea').value += `</ul>`;
    getSel('.second-container ').style.display = 'none';
    getSel('.main-container').style.display = 'block';
    getSel('.up-content').style.display = 'block';
    getSel('.list').style.display = 'none';

    list.checked = false;
    countLi.value = '';
}