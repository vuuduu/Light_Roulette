const GAME_LIGHT_DELAY = 300;
const USER_LIGHT_DELAY = 150;
const DELAY_BUFFER = 50;
const SCORE_DISPLAY = 'scoreDisplay';
const GAME_BOXES = document.querySelectorAll(".game-box");

let gameSeq = [];
let userSeq = [];

let userTurn = false;
let gameOver = false;

// Adding listening event to all of the game box
GAME_BOXES.forEach((gameBox) => {
    gameBox.addEventListener("click", () => {
        if(userTurn) {
            litUp(gameBox, USER_LIGHT_DELAY);
            
            setTimeout(() => {
                console.log(gameBox.id);
            }, USER_LIGHT_DELAY + DELAY_BUFFER);
        }
    });
})

function startGame() {
    // Change the start button to score display
    const bottomDisplay = document.getElementById("bottom-display");
    bottomDisplay.innerHTML = updateBottomDisplay(SCORE_DISPLAY);

    /* begin the lighting sequence
    while (!gameOver) {
        let lightDelay = 0;

        light a seq
            if there's color in gameSeq
                light the color 1 by 1
                increase lightDelay depending on the len of gameSeq
            
            Light random box then add color to the gameSeq
        
        turn userTurn to true when all the gameSeq light up.
    }
    */

}

function lightASequence() {
    // 
    if (gameSeq.length !== 0) {

    }
}

function litUp(gameBox, lightDelay) {
    gameBox.classList.add("lit-up");
    setTimeout(() => {
        gameBox.classList.remove("lit-up");
    }, lightDelay);
}

function updateBottomDisplay(htmlDisplay='') {
    if (htmlDisplay === SCORE_DISPLAY) {
        htmlDisplay = `
            <h3>Current Score: 
                <div id="score"">0</div>
            </h3>`;
    }else {
        htmlDisplay = `
            <button type="button" class="btn btn-primary" id="start-btn" onclick="startGame()">
                Start Game
            </button>`;
    }

    return htmlDisplay;
}