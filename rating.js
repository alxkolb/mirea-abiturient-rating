/*
 * Copyright © 2020 Александр Колбасов
 */

"use strict";

const table = document.getElementsByClassName("namesTable")[0].lastElementChild;

function load() {
    const abiturients = [];

    for (let i = 0; i < table.children.length; i++) {
        abiturients.push(table.children[i]);
    }

    return abiturients;
}

const abiturients = load();

function clean() {
    while (table.childElementCount > 0) {
        table.firstChild.remove();
    }
}

function cleanAndAppend(predicate) {
    clean();

    let newNum = 1;
    for (const abiturient of abiturients) {
        if (predicate(abiturient)) {
            abiturient.getElementsByClassName("num")[0].textContent = String(newNum++);
            table.appendChild(abiturient);
        }
    }
}

function printAll() {
    cleanAndAppend(abiturient => true);
    console.log('all');
}

function printNotToAnother() {
    cleanAndAppend(abiturient => abiturient.getElementsByClassName("status")[0].textContent != "Согласие на др. конкурсе");
    console.log('notToAnother');
}

function printAccepted() {
    cleanAndAppend(abiturient => abiturient.getElementsByClassName("accepted")[0].textContent == "да");
    console.log('accepted');
}

function enrolled() {
    cleanAndAppend(abiturient => {
        const status = abiturient.getElementsByClassName("status")[0].textContent;
        return status == "Рассматривается к зачислению" || status == "В приказе";
    });
    console.log('enrolled');
}

function init() {
    const buttons = {
        all: document.createElement("button"),
        notToAnother: document.createElement("button"),
        accepted: document.createElement("button"),
        enrolled: document.createElement("button"),
    };

    buttons.all.textContent = "Все";
    buttons.all.setAttribute('onclick', 'printAll();');

    buttons.notToAnother.textContent = "Сюда и неопределевшиеся";
    buttons.notToAnother.setAttribute('onclick', 'printNotToAnother();');

    buttons.accepted.textContent = "С согласием на зачисление";
    buttons.accepted.setAttribute('onclick', 'printAccepted();');

    buttons.enrolled.textContent = "Рассматриваются к зачислению";
    buttons.enrolled.setAttribute('onclick', 'enrolled();');

    for (let i = 0; i < 3; i++) {
        document.getElementById('filter').appendChild(document.createElement('br'));
    }

    for (const button in buttons) {
        document.getElementById('filter').appendChild(buttons[button]);
    }
    console.log('init complite');
}

init();
