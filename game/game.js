let game, snake, blockSize = 10, canvas, ctx, nowApple;

function random(max) {
    return Math.floor(Math.random() * max);
}

window.onkeydown = function (e) {
    switch (e.key) {
        case 'ArrowUp':
            if (snake.headth != 'down') {
                snake.headth = 'up';
            }
            break;
        case 'ArrowDown':
            if (snake.headth != 'up') {
                snake.headth = 'down';
            }
            break;
        case 'ArrowLeft':
            if (snake.headth != 'right') {
                snake.headth = 'left';
            }
            break;
        case 'ArrowRight':
            if (snake.headth != 'left') {
                snake.headth = 'right';
            }
            break;
        default:
            break;
    }
}

function Snake() {
    this.headth = 'right';
    this.body = [new SnakeBlock(0, 2), new SnakeBlock(0, 1), new SnakeBlock(0, 0)];
    this.head = this.body[0];
    this.end = this.body[this.body.length - 1];
    this.draw = function () {
        for (let i = 0; i < this.body.length; i++) {
            if (i == 0) {
                this.head.color = '#ff0000';
            } else {
                this.body[i].color = '#0000ff';
            }
            this.body[i].draw();
        }
    };
    this.move = function () {
        this.body.pop();
        switch (this.headth) {
            case 'up':
                if (this.head.y == 0) {
                    gameOver();
                }
                this.body.unshift(new SnakeBlock(this.head.row - 1, this.head.col));
                break;
            case 'down':
                if (this.head.y >= 530 - blockSize) {
                    gameOver();
                }
                this.body.unshift(new SnakeBlock(this.head.row + 1, this.head.col));
                break;
            case 'left':
                if (this.head.x == 0) {
                    gameOver();
                }
                this.body.unshift(new SnakeBlock(this.head.row, this.head.col - 1));
                break;
            case 'right':
                if (this.head.x >= 730 - blockSize) {
                    gameOver();
                }
                this.body.unshift(new SnakeBlock(this.head.row, this.head.col + 1));
                break;
                
            default:
                break;
        }
        this.head = this.body[0];
        this.end = this.body[this.body.length - 1];
    };
    this.collection = function () {
        if (this.head.x < 0 ||
            this.head.x > canvas.width - blockSize ||
            this.head.y < 0 ||
            this.head.y > canvas.height - blockSize) {
            gameOver();
        }
        if (this.head.x == nowApple.x && this.head.y == nowApple.y) {
            nowApple.randomPos();
            
            switch (this.headth) {
                case 'up':
                    this.body.push(new SnakeBlock(this.end.row + 1, this.end.col));
                    break;
                case 'down':
                    this.body.push(new SnakeBlock(this.end.row - 1, this.end.col));
                    break;
                case 'left':
                    this.body.push(new SnakeBlock(this.end.row, this.end.col - 1));
                    break;
                case 'right':
                    this.body.push(new SnakeBlock(this.end.row, this.end.col + 1));
                break;
            
                default:
                    break;
            }
        }
        for (let i = 1; i < snake.body.length; i++) {
            if (snake.body[i].x == snake.head.x && snake.body[i].y == snake.head.y) {
                gameOver();
            }
        }
    }
    this.main = function () {
        this.draw();
        this.move();
        this.collection();
    };
}

function SnakeBlock(row, col) {
    this.row = row;
    this.col = col;
    this.x = col * blockSize;
    this.y = row * blockSize;
    this.color = '#0000ff';
    this.draw = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, blockSize, blockSize);
    };
}

function Apple(row, col) {
    this.row = row;
    this.col = col;
    this.x = col * blockSize;
    this.y = row * blockSize;
    this.color = '#00ff00';
    this.randomPos = function () {
        this.col = random(canvas.width / blockSize - 1);
        this.row = random(canvas.height / blockSize - 1);
        this.x = this.col * blockSize;
        this.y = this.row * blockSize;
    };
    this.draw = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, blockSize, blockSize);
    };
}

function init() {
    canvas = document.querySelector('#game');
    ctx = canvas.getContext('2d');
    snake = new Snake();
    nowApple = new Apple(random(canvas.height / blockSize - 2), random(canvas.width / blockSize - 2));
}

function gameMain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.main();
    nowApple.draw();
}

function gameOver() {
    console.log('You lose!');
    clearInterval(game);
}

window.onload = init;
game = setInterval(gameMain, 120);