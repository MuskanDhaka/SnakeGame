const startBtn = document.getElementById("startBtn");
const board = document.getElementById("board");
let scoreLabel = document.getElementById("score");
let snake;
let food;
let speed = 50;
let snakeSize = 50;
let direction = "right";
let isGameStart = false;
let snakePositionArray = [];
let foodX, foodY;
let score = 0;


startBtn.addEventListener("click", () => {
    if (!isGameStart) {
        isGameStart = true;
        startBtn.disabled = true;
        createSnake();
        createFood();
        moveSnake();
    }
});

function createSnake() {
    snakePositionArray = [{ x: 50, y: 50 }];
    makeSnakeBody();
}

function makeSnakeBody() {
    board.innerHTML = '';
    snakePositionArray.forEach((part, index) => {
        console.log("Index : ",index);
        console.log("opacity value : ",index/100);
        
        
        const snakeBody = document.createElement("div");
        snakeBody.style.position = "absolute";
        snakeBody.style.top = `${part.y}px`;
        snakeBody.style.left = `${part.x}px`;
        snakeBody.style.width = `${snakeSize}px`;
        snakeBody.style.height = `${snakeSize}px`;
        snakeBody.style.backgroundColor = `rgb(223, 25, 134)`;
        let opacityValue = Math.max(1-index*0.1,0.4);
        snakeBody.style.opacity =opacityValue.toFixed(2);
        snakeBody.style.borderRadius = "5px";


        if(index === 0) {
         

            let eye1 = document.createElement("div");
            eye1.style.position = "absolute";
            eye1.style.top = "10px";
            eye1.style.left = "10px";
            eye1.style.width = "8px";
            eye1.style.height = "8px";
            eye1.style.backgroundColor = "white";
            eye1.style.borderRadius = "50%";

            let eye2 = document.createElement("div");
            eye2.style.position = "absolute";
            eye2.style.top = "10px";
            eye2.style.right = "10px";
            eye2.style.width = "8px";
            eye2.style.height = "8px";
            eye2.style.backgroundColor = "white";
            eye2.style.borderRadius = "50%";

            let pupil1 = document.createElement("div");
            pupil1.style.position = "absolute";
            pupil1.style.top = "2px";
            pupil1.style.left = "2px";
            pupil1.style.width = "4px";
            pupil1.style.height = "4px";
            pupil1.style.backgroundColor = "black";
            pupil1.style.borderRadius = "50%";

            let pupil2 = document.createElement("div");
            pupil2.style.position = "absolute";
            pupil2.style.top = "2px";
            pupil2.style.left = "2px";
            pupil2.style.width = "4px";
            pupil2.style.height = "4px";
            pupil2.style.backgroundColor = "black";
            pupil2.style.borderRadius = "50%";

            snakeBody.appendChild(eye1);
            snakeBody.appendChild(eye2);
            eye1.appendChild(pupil1);
            eye2.appendChild(pupil2);

        }

        board.appendChild(snakeBody);

    });

    let foodElement = document.createElement("div");
    foodElement.id = "food";
    foodElement.style.position = "absolute";
    foodElement.style.top = `${foodY}px`;
    foodElement.style.left = `${foodX}px`;
    foodElement.style.width = `${snakeSize}px`;
    foodElement.style.height = `${snakeSize}px`;
    foodElement.style.backgroundColor = "red"; 
    foodElement.style.borderRadius = "50%"; 
    foodElement.style.boxShadow = "inset -3px -3px 5px rgba(0, 0, 0, 0.2)"; 


    let stem = document.createElement("div");
    stem.style.width = "6px";
    stem.style.height = "12px";
    stem.style.backgroundColor = "brown";
    stem.style.position = "absolute";
    stem.style.top = "-8px";
    stem.style.left = "50%";
    stem.style.transform = "translateX(-50%)";
    stem.style.borderRadius = "3px";


    let leaf = document.createElement("div");
    leaf.style.width = "10px";
    leaf.style.height = "8px";
    leaf.style.backgroundColor = "green";
    leaf.style.position = "absolute";
    leaf.style.top = "-4px";
    leaf.style.left = "60%";
    leaf.style.borderRadius = "50%";
    leaf.style.transform = "rotate(-20deg)";


    foodElement.appendChild(stem);
    foodElement.appendChild(leaf);
    board.appendChild(foodElement);
}




function createFood() {
    let boardRect = board.getBoundingClientRect();
    console.log("Board : ", boardRect);

    let maxCols = Math.floor(boardRect.width / speed);
    let maxRows = Math.floor(boardRect.height / speed);
    let foodX = Math.floor(Math.random() * maxCols) * speed;
    let foodY = Math.floor(Math.random() * maxRows) * speed;

    while (foodX > boardRect.x || foodY > boardRect.y) {
        foodX = Math.floor(Math.random() * maxCols) * speed;
        foodY = Math.floor(Math.random() * maxRows) * speed;
    }
    food = document.createElement("div");
    food.id = "food";
    food.style.position = "absolute";
    food.style.left = `${foodX}px`;
    food.style.top = `${foodY}px`;
    board.appendChild(food);
}

function moveSnake() {
    if (!isGameStart) return;
    let head = { ...snakePositionArray[0] };
    switch (direction) {
        case "up":
            head.y -= snakeSize;
            break;
        case "down":
            head.y += snakeSize;
            break;
        case "left":
            head.x -= snakeSize;
            break;
        case "right":
            head.x += snakeSize;
            break;
    }
    if (head.x < 0 || head.x >= board.offsetWidth || head.y < 0 || head.y >= board.offsetHeight) {
        gameOver();
        return;
    }
    if (head.x === foodX && head.y === foodY) {
        score++;
        scoreLabel.innerText = `Score : ${score}`;
        snakePositionArray.push({});
        createFood();
    }
    snakePositionArray.unshift(head);
    snakePositionArray.pop();
    makeSnakeBody();
    setTimeout(moveSnake, 200);
}
function createFood() {
    foodX = generateRandomNumber();
    foodY = generateRandomNumber();
    while (isFoodOnSnake(foodX, foodY)) {
        foodX = generateRandomNumber();
        foodY = generateRandomNumber();
    }
}
function generateRandomNumber() {
    return Math.floor(Math.random() * (board.offsetWidth / snakeSize)) * snakeSize;
}
function isFoodOnSnake(x, y) {
    return snakePositionArray.some(part => part.x === x && part.y === y);
}
function gameOver() {
    document.getElementById("popup").style.display = "flex";
    document.getElementById("popup").innerHTML = `<h2>Game Over!</h2><br>
    <h2>Your score is : ${score}</h2><br>
            <p>Thanks for playing 🎉</p><br>
            <button onclick="closePopup()" id = "close">Close</button>
            `
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    isGameStart = false;
    startBtn.disabled = false;
    snakePositionArray = [];
    score = 0;
    direction = "right"; 
    board.innerHTML = ""; 
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (direction !== "down") direction = "up";
            break;
        case "ArrowDown":
            if (direction !== "up") direction = "down";
            break;
        case "ArrowLeft":
            if (direction !== "right") direction = "left";
            break;
        case "ArrowRight":
            if (direction !== "left") direction = "right";
            break;
    }
});































