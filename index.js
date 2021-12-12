const GameBoard = function () {
    let gameboard = [];
    gameboard.length = 9;

    const add = function (index, value) {
        gameboard[index] = value;
    }
    let print = function () {
        return gameboard;
    }
    return { add, print }
}

const game = GameBoard()

Array.from(document.getElementsByClassName("box")).forEach(element => {
    element.addEventListener('click', (e) => {
        game.add((e.target.innerText - 1), 'x');
    });
});

