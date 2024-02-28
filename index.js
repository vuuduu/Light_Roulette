const LIGHT_DELAY = 150;
const SCORE_DISPLAY = 'scoreDisplay';
let gameSeq = [];
let userSeq = [];
let userTurn = false;

// Addign listening event to all of the game box
const gameBoxes = document.querySelectorAll(".game-box");
gameBoxes.forEach((gameBox) => {
    gameBox.addEventListener("click", () => {
        if(userTurn) {
            litUp(gameBox);
            
            setTimeout(() => {
                console.log(gameBox.id);
            }, 200);
        }
    });
})


function litUp(gameBox) {
    gameBox.classList.add("lit-up");
    setTimeout(() => {
        gameBox.classList.remove("lit-up");
    }, LIGHT_DELAY);
}

function startGame() {
    userTurn = true;

    // Change the start button to score display
    const bottomDisplay = document.getElementById("bottom-display");
    bottomDisplay.innerHTML = updateBottomDisplay("scoreDisplay");

}

function updateBottomDisplay(style) {
    if (style === SCORE_DISPLAY) {
        style = `
            <h3>Current Score: <div id="score" style="display: inline;">0</div></h3>
        `;
    }else {
        style = `
            <button type="button" class="btn btn-primary" id="start-btn" onclick="startGame()">
                Start Game
            </button>
        `;
    }

    return style;
}