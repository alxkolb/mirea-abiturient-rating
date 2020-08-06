// todo: добавить кнопки и автодобавление меня во все списки

// let rating = new function () { // нужен this или (  func(){}  )()
let table = document.getElementsByClassName("namesTable")[0].lastElementChild;//.children;

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

function append(predicate) {
    clean();

    newNum = 1;
    for (const student of students) {
        if (predicate(student)) {
            student.getElementsByClassName("num")[0].textContent = String(newNum++);
            table.appendChild(student);
        }
    }
}

function all() {
    append(student => true);
}

function notToAnother() {
    append(student => student.getElementsByClassName("status")[0].textContent != "Согласие на др. конкурсе");
}

function accepted() {
    append(student => student.getElementsByClassName("accepted")[0].textContent == "да");
}
// };
