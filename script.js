let board = document.querySelector(".board");

let layer = document.querySelector(".layer");
let sLayer = document.querySelector(".start-layer");
let rLayer = document.querySelector(".restart-layer");

let btn = document.querySelector(".btn");
let Rbtn = document.querySelector(".r-btn");

let score = document.querySelector("#score");
let hs = document.querySelector("#high-score");
let timer = document.querySelector("#timer");

let rows = 0;
let colm = 0;

let seconds = 0;
let minutes = 0;

let blockWidth = 70;
let blockHeight = 70;

let points = 0;

let highScore;
highScore = Number(localStorage.getItem("highScore")) || 0;
hs.textContent = highScore;

let intervalId = null;
let timerId = null;
let gameOver = false;

let food;

let direction = "left";

const blocks = [];



function createBoard() {
  board.innerHTML = "";
  blocks.length = 0;

  colm = Math.floor(board.clientWidth / blockWidth);
  rows = Math.floor(board.clientHeight / blockHeight);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < colm; j++) {
      let block = document.createElement("div");
      block.classList.add("block");
      board.appendChild(block);
      // block.innerText=`${i}-${j}`;
      blocks[`${i}-${j}`] = block;
    }
  }
}

function createFood() {
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * colm),
  };
}

createBoard();
createFood();

const snake = [
  {
    x: 1,
    y: Math.floor(colm / 2),
  },
];

function clearFood() {
  document.querySelectorAll(".food").forEach((block) => {
    block.classList.remove("food");
  });
}

function render() {
  if (gameOver) return;

  let head = null;

  blocks[`${food.x}-${food.y}`].classList.add("food");

  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= colm) {
    layer.style.display = "flex";
    sLayer.style.display = "none";
    rLayer.style.display = "flex";
    clearInterval(intervalId);
    clearInterval(timerId);
    seconds = 0;
    minutes = 0;
    gameOver = true;
    return;
  }

  snake.forEach(function (element) {
    blocks[`${element.x}-${element.y}`].classList.remove("fill");
  });
  snake.unshift(head);

  if (head.x == food.x && head.y == food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    createFood();
    points += 1;
    score.textContent = points;

    if (points > highScore) {
      highScore = points;
      hs.textContent = highScore;
      localStorage.setItem("highScore", highScore);
    }
  } else {
    snake.pop();
  }

  snake.forEach(function (element) {
    blocks[`${element.x}-${element.y}`].classList.add("fill");
  });
}

function restart() {
  snake.forEach(function (element) {
    blocks[`${element.x}-${element.y}`].classList.remove("fill");
  });

  snake.length = 0;

  snake.push({
    x: 1,
    y: Math.floor(colm / 2),
  });

  direction = "left";

  createFood();
  clearFood();

  clearInterval(intervalId);
  intervalId = setInterval(function () {
    render();
  }, 100);
}

window.addEventListener("resize", function () {
  clearInterval(intervalId);
  clearInterval(timerId);

  clearFood();

  layer.style.display = "flex";
  sLayer.style.display = "none";
  rLayer.style.display = "flex";

  gameOver = true;

  seconds = 0;
  minutes = 0;

  timer.textContent = "00-00";

  points = 0;
  score.textContent = "0";

  createBoard();
  restart();
});

window.addEventListener("keydown", function (e) {
  if (gameOver) return;

  if (e.key == "ArrowDown" || e.key == "s") {
    if (direction != "up") {
      direction = "down";
    }
  } else if (e.key == "ArrowUp" || e.key == "w") {
    if (direction != "down") {
      direction = "up";
    }
  } else if (e.key == "ArrowLeft" || e.key == "a") {
    if (direction != "right") {
      direction = "left";
    }
  } else if (e.key == "ArrowRight" || e.key == "d") {
    if (direction != "left") {
      direction = "right";
    }
  }
});

btn.addEventListener("click", function () {
  layer.style.display = "none";
  intervalId = setInterval(function () {
    render();
  }, 100);
  timerId = setInterval(function () {
    seconds++;

    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }

    timer.textContent =
      String(minutes).padStart(2, "0") + "-" + String(seconds).padStart(2, "0");
  }, 1000);
});

Rbtn.addEventListener("click", function () {
  points = 0;
  score.textContent = "0";
  layer.style.display = "none";
  gameOver = false;
  restart();
  seconds = 0;
  minutes = 0;
  timerId = setInterval(function () {
    seconds++;

    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }

    timer.textContent =
      String(minutes).padStart(2, "0") + "-" + String(seconds).padStart(2, "0");
  }, 1000);
});
