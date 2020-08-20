{
    'use strict';
    let url = 'https://raw.githubusercontent.com/alxkolb/mirea-abiturient-rating/master/rating.js';
    let ajax = new XMLHttpRequest();

    function onError(event) {
        console.group();
        console.error('Ошибка загрузки скрипта');
        console.error(event);
        console.groupEnd();
    }

    ajax.onerror = onError;
    ajax.ontimeout = onError;

    ajax.onloadend = (event) => {
        if (ajax.status != 200) {
            console.error(`status: ${ajax.status}`);
            return;
        }
        let script = document.createElement('script');
        script.textContent = ajax.responseText;
        document.body.appendChild(script);
    };

    ajax.open('GET', url);
    ajax.send();
}
