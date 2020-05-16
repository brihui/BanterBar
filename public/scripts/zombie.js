const zombieMoveInterval = 2000;
const buttonViewHeight = 3;

let zombie = document.getElementById("zombie");
let zombie2 = document.getElementById("zombie2");
let audio = document.getElementById("audio");
let endButton = document.getElementById("end");
let startButton = document.getElementById("start");
let isExploding1 = false;
let isExploding2 = false;
let gameStarted = false;
let score = 0;
let randomMoveTimer;
let randomMoveTimer2;

centerZombie();

function startGame() {
    if(gameStarted){
        return;
    }
    
    gameStarted = true;
    randomMoveZombie();
    randomMoveTimer = setInterval(randomMoveZombie, zombieMoveInterval);
}

function randomMoveZombie() {
    let zombieHeight = zombie.clientHeight;
    let zombieWidth = zombie.clientWidth;
    let width = window.innerWidth - zombieWidth;
    let height = window.innerHeight - zombieHeight;
    let randWidth = Math.random() * width;
    let randHeight = Math.random() * height;
    zombie.style.left = randWidth + "px";
    zombie.style.top = randHeight + "px";
    refreshButtonSize();
}

function explodeZombie() {
    if (isExploding1) {
        return
    }

    gameStarted = true;
    let explodingTime = 300;

    increaseScore();
    isExploding1 = true;
    zombie.src = "../images/explode.gif";
    audio.play();
    clearInterval(randomMoveTimer);
    setTimeout(moveZombie, explodingTime);
}

function moveZombie() {
    let zombieHeight = zombie.clientHeight;
    let zombieWidth = zombie.clientWidth;
    let width = window.innerWidth - zombieWidth;
    let height = window.innerHeight - zombieHeight;
    let randWidth = Math.random() * width;
    let randHeight = Math.random() * height;
    zombie.style.left = randWidth + "px";
    zombie.style.top = randHeight + "px";
    zombie.src = "../images/zombie.gif";
    randomMoveTimer = setInterval(randomMoveZombie, zombieMoveInterval);
    isExploding1 = false;
    refreshButtonSize();
}

function increaseScore() {
    score += 1;
    document.getElementById("score").innerHTML = "Score: " + score;

    if(score == 2){
        revealZombie2();
    }
}

function addHighScore() {
    let user = firebase.auth().currentUser;

    if(user){   
        db.collection("leaderboard").add({
            name: user.displayName,
            score: score
        })
    } else {
        window.alert("You are not signed in");
    }
}

function endGame() {
    addHighScore();
    centerZombie();
    clearInterval(randomMoveTimer);
    score = 0;
    document.getElementById("score").innerHTML = "Score: " + score;
    gameStarted = false;
    zombie2.style.visibility = "hidden";
}

function refreshButtonSize() {
    endButton.style.fontSize = buttonViewHeight + "vh";
    startButton.style.fontSize = buttonViewHeight + "vh";
}

function createNewZombie() {
    zombie2 = new Image();
    zombie2.src = "../images/zombie.gif";
    zombie2.id = "newZombie";
    
    let zombieWidth = zombie2.clientWidth;
    let zombieHeight = zombie2.clientHeight;
    let width = window.innerWidth - zombieWidth;
    let height = window.innerHeight - zombieHeight;
    let randWidth = Math.random() * width;
    let randHeight = Math.random() * height;
    zombie2.style.left = randWidth + "px";
    zombie2.style.top = randHeight + "px";

    document.body.append(zombie2);

    randomMoveTimer2 = setInterval(randomMoveZombie2, zombieMoveInterval);
}

function revealZombie2() {
    zombie2.style.visibility = "visible";
}

function randomMoveZombie2() {
    let zombieHeight = zombie2.clientHeight;
    let zombieWidth = zombie2.clientWidth;
    let width = window.innerWidth - zombieWidth;
    let height = window.innerHeight - zombieHeight;
    let randWidth = Math.random() * width;
    let randHeight = Math.random() * height;
    zombie2.style.left = randWidth + "px";
    zombie2.style.top = randHeight + "px";
}

function explodeZombie2() {
    if (isExploding2) {
        return
    }

    let explodingTime = 1000;

    increaseScore();
    isExploding2 = true;
    zombie2.src = "../images/explode.gif";
    audio.play();
    clearInterval(randomMoveTimer2);
    setTimeout(moveZombie2, explodingTime);
}

function moveZombie2() {
    let zombieHeight = zombie2.clientHeight;
    let zombieWidth = zombie2.clientWidth;
    let width = window.innerWidth - zombieWidth;
    let height = window.innerHeight - zombieHeight;
    let randWidth = Math.random() * width;
    let randHeight = Math.random() * height;
    zombie2.style.left = randWidth + "px";
    zombie2.style.top = randHeight + "px";
    zombie2.src = "../images/zombie.gif";
    randomMoveTimer2 = setInterval(randomMoveZombie2, zombieMoveInterval);
    isExploding2 = false;
}

function centerZombie() {
    let pageWidth = window.innerWidth;
    let pageHeight = window.innerHeight;
    let zombieWidth = zombie.clientWidth;
    let zombieHeight = zombie.clientHeight;

    zombie.style.left = (pageWidth / 2) - (zombieWidth / 2) + "px";
    zombie.style.top = (pageHeight / 2) - (zombieHeight / 2) + "px";
    zombie.style.visibility = "visible";
}

zombie.onclick = explodeZombie;
zombie2.onclick = explodeZombie2;
startButton.onclick = startGame;
endButton.onclick = endGame;