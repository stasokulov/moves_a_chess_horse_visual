//Запускаем построение доски.
(function crateBoard() {
    const board = document.createElement('div');
    board.classList.add('board');
    const cell = document.createElement('div');
    cell.classList.add('cell');
    //Каждой клетке присваиваем id  в соответствии с ее координатами.
    for(let i = 1; i < 9; i++) {
        for(let j = 1; j < 9; j++) {
            const newCell = cell.cloneNode(true);
            newCell.id = String(i) + String(j);
            //Красим в черный цвет нужные клетки.
            if(i%2 !== 0 && j%2 !== 0) {
                newCell.classList.add('black');
            };
            if(i%2 === 0 && j%2 === 0) {
                newCell.classList.add('black');
            };
            //Закидываем клетки на доску.
            board.appendChild(newCell);
        };
    };
    document.body.insertBefore(board, document.body.firstChild);

    //Вешаем слушатель клика на доску.
    board.addEventListener('click', showMoveHorse);
})();

function showMoveHorse(event) {
    //Получаем координаты кликнутой клетки.
    const clickedCell = event.toElement;
    const startCoord = clickedCell.id;
    const startCoordArray = [...startCoord];

    //Полученные координаты превращаем в цифры с типом number.
    const x0 = +startCoordArray[0];
        y0 = +startCoordArray[1];

    //Вычисляем координаты 8 вариантов хода коня.
        x1 = x0-1;
        y1 = y0+2;

        x2 = x0+1;
        y2 = y0+2;

        x3 = x0+2;
        y3 = y0+1;

        x4 = x0+2;
        y4 = y0-1;

        x5 = x0+1;
        y5 = y0-2;

        x6 = x0-1;
        y6 = y0-2;

        x7 = x0-2;
        y7 = y0-1;

        x8 = x0-2;
        y8 = y0+1;

    const finishcoordArray = [[x1, y1], [x2, y2], [x3, y3], [x4, y4], [x5, y5], [x6, y6], [x7, y7], [x8, y8]];

    //Создаем новый массив - это массив id целевых клеток.
    const resultArray = finishcoordArray.map(couple => {
        //Берем только те координаты, где обе части больше 0 и меньше 9, т.е. находятся в пределах доски.
        if (
            couple.every(coord => {
                return coord > 0 && coord < 9;
            })
        ) {
            //Конкатинируем пары координат "цифра, цифра" в строку и получаем id целевой клетки.
            const finishID = String(couple[0]) + String(couple[1]);
            return finishID;
        };
    });

    //Избавляемся от пустых значений.
    const clearResultArray = resultArray.filter(element => {
        return element != undefined;
    });

    //Снимаем выделение клеток, подсвеченых ранее.
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('active');
    });

    //Подсвечиваем клетки с вычисленными кординатами
    clearResultArray.forEach(element => {
        const finishCell = document.getElementById([element]);
        finishCell.classList.add('active');
    });
};
