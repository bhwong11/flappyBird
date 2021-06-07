//add in post and get request via node to make a easy hard level based on hole distance and number of pipes
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const image = document.getElementById('bird');
let pipeX = canvas.width;
let pipeWidth = 100;
let numOfPipes = 10;
let pipeDistance = 200;
let holeDistance = 200
let pipeVar = 150
let birdX = 50;
let birdY = canvas.height / 2;
let birdStatus = 0;
let upAmount = 0;
let birdUp = 1;
let birdWidth = 50
let birdHeight = 50;
let birdPeak = 30;
let score = 0;


console.log(ctx)
alert('start game?')
let pipes = [];
let pipeY = 100;
for (let i = 0; i < numOfPipes; i++) {
    let pipeY = Math.floor((Math.random() * pipeVar) + 100);
    pipes.push({})
    pipes[i].pipeStartX = i;
    pipes[i].pipeY = pipeY;
    //console.log(pipes[i])
    //console.log(pipes[i].pipeStartX)
}


function drawPipes() {
    for (let pipe of pipes) {
        ctx.beginPath();
        ctx.rect(pipeX + (pipe.pipeStartX * pipeDistance), pipe.pipeY, pipeWidth, -canvas.height);
        ctx.fillStyle = "#9ACD32";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect(pipeX + (pipe.pipeStartX * pipeDistance), pipe.pipeY + holeDistance, pipeWidth, canvas.height);
        ctx.fillStyle = "#9ACD32";
        ctx.fill();
        ctx.closePath();

    }


}

function drawBird() {
    ctx.beginPath();
    ctx.drawImage(image, birdX, birdY, birdWidth, birdHeight)
    //ctx.rect(birdX, birdY, birdWidth, birdHeight);
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    for (let pipe of pipes) {
        if (birdX + birdWidth > (pipeX + (pipe.pipeStartX * pipeDistance))) {
            pipe.score = 1;
        }
    }
    score = pipes.filter(pipe => pipe.score === 1).length;
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: " + score, canvas.width - 65, 20);
}
canvas.addEventListener('click', (e) => {
    //console.log(birdStatus)
    birdStatus = 1;
    //console.log(birdStatus)

})
function collisionDetect() {
    if (birdY + birdHeight > canvas.height) {
        alert("GAME OVER!!");
        document.location.reload();
        clearInterval(internal);

    }
    for (let i = 0; i < numOfPipes; i++) {
        if (birdX + birdWidth > pipeX + (pipes[i].pipeStartX * pipeDistance) && birdX < pipeX + (pipes[i].pipeStartX * pipeDistance) + pipeWidth)
            if (birdY < pipes[i].pipeY || birdY + birdHeight > pipes[i].pipeY + holeDistance) {
                alert("GAME OVER!!");
                document.location.reload();
                clearInterval(internal);
            }
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPipes();
    pipeX -= 1;


    if (birdStatus === 0) {
        birdY += 2;
    } else {
        birdY -= (birdPeak) / (birdUp);
        birdUp += 1;

        if (birdUp > birdPeak) {
            birdStatus = 0;
            birdUp = 1;
        }

    }
    drawBird()
    drawScore()
    collisionDetect();

    if ((pipeX + ((pipes[numOfPipes - 1].pipeStartX * 100) + pipeWidth)) < 0) {
        alert("You Win!!");
        document.location.reload();
        clearInterval(interval);
    }

}



var internal = setInterval(draw, 10)
console.log((pipes[numOfPipes - 1].pipeStartX * 100))

