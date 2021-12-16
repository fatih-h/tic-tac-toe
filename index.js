const box = Array.from(document.getElementsByClassName("box"));


/**all game designs here */
const GameBoard = function () {

    let gameboard = [];
    gameboard.length = 9;
    let playerX = [];
    let playerO = [];

    /**controlling X starts first */
    let counter = 2;

    /**adding for gameboard and player array*/
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

    /**drawing array function to the webpage*/
    const draw = function (index, value) {
        // value.innerText = gameboard[index];

        if (counter % 2 != 0) {

            document.getElementById('Board').innerText = `Player O's Turn`; imageX(index);

        } else {

            document.getElementById('Board').innerText = `Player X's Turn`; imageO(index);
        }

    }

    const winCondition = function () {
        /**win posibilities */
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

        /**controlling player array and win possibilities */
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
        /**calling function for X */
        if (player(playerX)) {

            return 1;
        }
        /**calling function for O */
        else if (player(playerO)) {

            return 2;
        }

    }

    /**Show the result after finish the game */
    let endGameCounter = 0;
    const end = function (result) {
        endGameCounter++;
        if (result === 1) {
            document.getElementById('Board').innerText = 'PlayerX win the game!';
            document.getElementById('Board').style.color = "#dd5e89";
        } else if (result === 2) {
            document.getElementById('Board').innerText = 'PlayerO win the game!';
            document.getElementById('Board').style.color = "#dd5e89";
        } else if (endGameCounter === 9) {
            document.getElementById('Board').innerText = 'Draw!';
            document.getElementById('Board').style.color = "#dd5e89";
        }
    }

    /**image for X */
    const imageX = function (location) {
        let x = document.createElement("IMG");
        x.setAttribute("src", "media/x.png");
        x.setAttribute("alt", "X");
        document.getElementById('main').children[location].appendChild(x);
    }
    /**image for O */
    const imageO = function (location) {
        let o = document.createElement("IMG");
        o.setAttribute("src", "media/o.png");
        o.setAttribute("alt", "O");
        document.getElementById('main').children[location].appendChild(o);
    }


    /**returning functions to the public */
    return { add, draw, winCondition, end }
}

/**board object for calling function */
const game = GameBoard()


/**adding elements to boxes and function*/
box.forEach(element => {
    element.addEventListener('click', (e) => {
        /**accesing box array manually using their id */
        const i = (e.target.id - 1);

        /**adding then drawing that target and if conditions true then ending */
        game.add(i);
        game.draw(i, e.target);
        game.end(game.winCondition());

    }, { once: true });

});

