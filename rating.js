"use strict";

let table = document.getElementsByClassName("namesTable")[0].lastElementChild;

function load() {
    let students = [];

    for (let i = 0; i < table.children.length; i++) {
        students.push(table.children[i]);
    }

    return students;
}

let students = load();

function clean() {
    while (table.childElementCount > 0) {
        table.firstChild.remove();
    }
}

function cleanAndAppend(predicate) {
    clean();

    let newNum = 1;
    for (const student of students) {
        if (predicate(student)) {
            student.getElementsByClassName("num")[0].textContent = String(newNum++);
            table.appendChild(student);
        }
    }
}

function printAll() {
    cleanAndAppend(student => true);
    console.log('all');
}

function printNotToAnother() {
    cleanAndAppend(student => student.getElementsByClassName("status")[0].textContent != "Согласие на др. конкурсе");
    console.log('notToAnother');
}

function printAccepted() {
    cleanAndAppend(student => student.getElementsByClassName("accepted")[0].textContent == "да");
    console.log('accepted');
}

function init() {
    let buttons = {
        all: document.createElement("button"),
        notToAnother: document.createElement("button"),
        accepted: document.createElement("button"),
    };

    buttons.all.textContent = "Все";
    buttons.all.setAttribute('onclick', 'printAll();');

    buttons.notToAnother.textContent = "Сюда и не определевшиеся";
    buttons.notToAnother.setAttribute('onclick', 'printNotToAnother();');

    buttons.accepted.textContent = "С согласием на зачисление";
    buttons.accepted.setAttribute('onclick', 'printAccepted();');

    document.getElementById('filter').appendChild(document.createElement('br'));

    for (const button in buttons) {
        document.getElementById('filter').appendChild(buttons[button]);
    }
    console.log('init complite');
    alert('init complite');
}

init();
