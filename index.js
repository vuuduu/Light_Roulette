const GAME_LIGHT_DELAY = 1000;
const USER_LIGHT_DELAY = 150;
const DELAY_BUFFER = 50;
const SCORE_DISPLAY = "scoreDisplay";
const GAME_OVER = "GAME OVER";
const GAME_BOXES = document.querySelectorAll(".game-box");

let gameSeq = [];

let userTurn = false;
let userCurrColorPos = 0; // keep track of the index position of the box user click

// Adding listening event to all of the game box
GAME_BOXES.forEach((gameBox) => {
    gameBox.addEventListener("click", () => {
        if(userTurn) {
            litUp(gameBox, USER_LIGHT_DELAY);
            
            checkGameBoxColor(gameBox.id);
        }
    });
})

function startGame() {
    // Change the start button to score display
    updateBottomDisplay(SCORE_DISPLAY);

    // initialize the sequence
    lightASequence();
}

// return the delay time to light up all the sequence
function lightASequence() {
    updateTitle(SCORE_DISPLAY);
    let lightDelay = 0;

    // light all the sequence in the gameSeq
    if (gameSeq.length !== 0) {
        gameSeq.forEach((boxColor) => {
            const gameBox = document.getElementById(boxColor);
            
            setTimeout(() => {
                litUp(gameBox, GAME_LIGHT_DELAY);
            }, lightDelay);
            // setting the delay time for the NEXT box to lit up
            lightDelay += GAME_LIGHT_DELAY + DELAY_BUFFER;
        })
    }

    // light a random box and add to gameSeq
    const randomNum = Math.floor(Math.random() * GAME_BOXES.length);
    const boxColor = GAME_BOXES[randomNum];
    gameSeq.push(boxColor.id);

    setTimeout(() => {
        litUp(boxColor, GAME_LIGHT_DELAY);
    }, lightDelay);

    // change to user turn once all the light sequence has gone off
    setTimeout(() => {
        userTurn = true;
    }, lightDelay + GAME_LIGHT_DELAY + DELAY_BUFFER);
}

// handle all the color checking
function checkGameBoxColor(gameBoxColor) {
    // check if the color match
    if (gameBoxColor === gameSeq[userCurrColorPos]) {
        // check if it's the last box
        if (userCurrColorPos === gameSeq.length - 1) {
            userCurrColorPos = 0;
            userTurn = false;
            // increase score by 1
            const score = document.getElementById("score");
            score.innerHTML = gameSeq.length;

            setTimeout(() => { // start new sequence
                lightASequence();
            }, GAME_LIGHT_DELAY);
        }else { // not a last box
            userCurrColorPos++;
        }
    }else {
        gameSeq = [];
        userCurrColorPos = 0;
        userTurn = false;
        updateTitle(GAME_OVER);
        updateBottomDisplay();
    }
}

// take the gameBox and the time delay to change the css class.
function litUp(gameBox, lightDelay) {
    gameBox.classList.add("lit-up");
    setTimeout(() => {
        gameBox.classList.remove("lit-up");
    }, lightDelay);
}

function updateTitle(htmlDisplay='') {
    const gameTitle = document.getElementById("game-title");

    // check if the game still happening
    if (htmlDisplay === SCORE_DISPLAY) {
        htmlDisplay =  `Round: ${gameSeq.length + 1}`;
    }

    gameTitle.innerHTML = htmlDisplay;
}

function updateBottomDisplay(htmlDisplay='') {
    const bottomDisplay = document.getElementById("bottom-display");

    if (htmlDisplay === SCORE_DISPLAY) {
        htmlDisplay = `
            <h3>Current Score: 
                <div id="score">0</div>
            </h3>`;
    }else {
        htmlDisplay = `
            <button type="button" class="btn btn-primary" id="start-btn" onclick="startGame()">
                Start Game
            </button>`;
    }

    bottomDisplay.innerHTML = htmlDisplay;
}