const box = Array.from(document.getElementsByClassName("box"));

const GameBoard = function () {
    let gameboard = [];
    gameboard.length = 9;
    let playerX = [];
    let playerO = [];

    let counter = 2;
    const add = function (index) {
        if (counter % 2 != 0) {
            gameboard[index] = 'O';
            playerO.push(index);
        } else {
            gameboard[index] = 'X';
            playerX.push(index);

        }
        counter++;
    }
    const draw = function (index, value) {
        value.innerText = gameboard[index];
        if (counter % 2 != 0) {
            document.getElementById('Board').innerText = `Player O's Turn`;

        } else {
            document.getElementById('Board').innerText = `Player X's Turn`;
        }

    }

    const winCondition = function () {

        const arr = {
            list: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]],
        };

        const player = function (player) {
            let result;

            arr.list.forEach(element => {
                let counter = 0;

                element.forEach((e) => {
                    if (player.includes(e)) {
                        counter++;
                    }
                });
                if (counter == 3) {
                    result = true;
                }
            });
            return result
        };

        if (player(playerX)) {

            return 1;
        }
        else if (player(playerO)) {
            return 2;
        }

    }
    let endGameCounter = 0;
    const end = function (result) {
        endGameCounter++;
        if (result === 1) {
            document.getElementById('Board').innerText = 'PlayerX win the game!';
        } else if (result === 2) {
            document.getElementById('Board').innerText = 'PlayerO win the game!';
        } else if (endGameCounter === 9) {
            document.getElementById('Board').innerText = 'Draw!';
        }
    }


    return { add, draw, winCondition, end }
}

const game = GameBoard()


box.forEach(element => {
    element.addEventListener('click', (e) => {
        const i = (e.target.id - 1);
        game.add(i);
        game.draw(i, e.target);
        game.end(game.winCondition());

    }, { once: true });

});

