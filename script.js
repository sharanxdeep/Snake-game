let board = document.querySelector(".board");
const blockWidth =70;
const blockHeight = 70;
const colm = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let intervalId = null;
let gameOver = false;

let food = {x: Math.floor(Math.random()*rows), y: Math.floor(Math.random()*colm)}

const blocks = [];

let direction = "left";

window.addEventListener("keydown",function(e){
    if(gameOver) return;

    if(e.key=="ArrowDown" || e.key=="s"){
        direction = "down";
    }
    else if(e.key=="ArrowUp" || e.key=="w"){
        direction = "up";
    }
    else if(e.key=="ArrowLeft" || e.key=="a"){
        direction = "left";
    }
    else if(e.key=="ArrowRight" || e.key=="d"){
        direction = "right";
    }
    
})

for(let i=0;i<rows;i++){
    for(let j=0;j<colm;j++){
        let block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        // block.innerText=`${i}-${j}`;
        blocks[`${i}-${j}`] = block;
    }
}

const snake = [{
    x:1,
    y:6
}];

function render(){
    if(gameOver) return ;

    let head = null;

    blocks[`${food.x}-${food.y}`].classList.add("food");

    if(direction==="left"){
        head = {x:snake[0].x, y:snake[0].y-1};
    }
    else if(direction==="right"){
        head = {x:snake[0].x, y:snake[0].y+1};
    }
    else if(direction==="down"){
        head = {x:snake[0].x+1, y:snake[0].y};
    }
    else if(direction==="up"){
        head = {x:snake[0].x-1, y:snake[0].y};
    }

    if(head.x<0 || head.x>=rows || head.y<0 || head.y>=colm){
        alert("Game over!!");
        clearInterval(intervalId);
        gameOver = true;
        return;
    }
    
    if(head.x == food.x && head.y == food.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        food = {x: Math.floor(Math.random()*rows), y: Math.floor(Math.random()*colm)}
        snake.unshift(head);
    }
    
    snake.forEach(function(element){
        blocks[`${element.x}-${element.y}`].classList.remove("fill");
    })
    snake.unshift(head);
    snake.pop();
    
    snake.forEach(function(element){
        blocks[`${element.x}-${element.y}`].classList.add("fill");
    })

    
    
    
}

intervalId = setInterval(function(){
    render();
}
,100);