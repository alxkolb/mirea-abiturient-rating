/*
 * Copyright © 2020 Александр Колбасов
 */

'use strict';

const rating = (
    () => {

        const table = document.getElementsByClassName('namesTable')[0].lastElementChild;  /* <tbody> */

        const abiturients = [];
        /* Преобразуем NodeList в массив */
        for (let child of table.children) {
            abiturients.push(child);
        }

        function clean() {
            while (table.childElementCount > 0) {
                table.firstChild.remove();
            }
        }

        function append(filterFunction) {
            let newNum = 1;
            for (let abiturient of abiturients) {
                if (filterFunction(abiturient)) {
                    abiturient.getElementsByClassName('num')[0].textContent = String(newNum++);
                    table.appendChild(abiturient);
                }
            }
        }

        function filter(filterFunction, name) {
            clean();
            append(filterFunction);
            console.info(name);
        }

        function createButton(buttonName, filterFunction) {
            let button = document.createElement('button');
            button.textContent = buttonName;
            button.onclick = (event) => filter(filterFunction, buttonName);

            document.getElementById('filter').appendChild(button);
        }

        /* Отступ перед кнопками */
        for (let i = 0; i < 3; i++) {
            document.getElementById('filter').appendChild(document.createElement('br'));
        }

        return { createButton, filter };
    }
)();

{
    rating.createButton(
        'Все',
        abiturient => true
    );
    rating.createButton(
        'Сюда и неопределевшиеся',
        abiturient => abiturient.getElementsByClassName('status')[0].textContent != 'Согласие на др. конкурсе'
    );
    rating.createButton(
        'С согласием на зачисление',
        abiturient => abiturient.getElementsByClassName('accepted')[0].textContent == 'да'
    );
    rating.createButton(
        'Рассматриваются к зачислению',
        abiturient => {
            let status = abiturient.getElementsByClassName('status')[0].textContent;
            return status == 'Рассматривается к зачислению' || status == 'В приказе';
        }
    );
};
