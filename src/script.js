const putt = document.getElementById("putt");
const canvas = document.getElementById("canvas");
const course = canvas.getContext("2d");

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  impulse(x, y) {
    this.impX = x;
    this.impY = y;
  }

  tick() {
    let mag = (this.impX ** 2 + this.impY ** 2) ** (1 / 2);

    if (mag > 0) {
      this.move(this.impX / mag, this.impY / mag);

      if (mag <= 1) {
        this.impX = 0;
        this.impY = 0;
      } else {
        this.impX = this.impX - this.impX / mag;
        this.impY = this.impY - this.impY / mag;
      }
    }
  }

  move(x, y) {
    this.x = this.x + x;
    this.y = this.y + y;

    if (this.x > 100) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = 100;
    }
    if (this.y > 100) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = 100;
    }
  }
}

let ball = new Ball(20, 20);
let dirX = 0;
let dirY = 0;
let puttPower = 0;
let frameCount = 0;

init();
function init() {
  course.clearRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(draw);
}

function draw() {
  course.clearRect(0, 0, canvas.width, canvas.height);

  ball.tick();
  drawBall();
  drawDirection();

  frameCount += 1;
  dirX = Math.cos(frameCount / 100);
  dirY = Math.sin(frameCount / 100);
  puttPower = Math.abs(Math.sin(frameCount / 200));

  window.requestAnimationFrame(draw);
}

function drawDirection() {
  let powerLength = Math.abs(puttPower) * 30;

  course.beginPath();
  course.arc(
    (50 / 100) * canvas.width,
    (90 / 100) * canvas.height,
    (5 / 100) * canvas.height,
    0,
    2 * Math.PI
  );
  course.moveTo((50 / 100) * canvas.width, (90 / 100) * canvas.height);
  course.lineTo(
    ((50 + dirX * puttPower * 5) / 100) * canvas.width,
    ((90 + dirY * puttPower * 5) / 100) * canvas.height
  );

  course.stroke();
}

function drawBall() {
  course.beginPath();
  course.arc(
    (ball.x / 100) * canvas.width,
    (ball.y / 100) * canvas.height,
    20,
    0,
    2 * Math.PI
  );
  course.fillStyle = "red";
  course.fill();
}

putt.addEventListener("click", () => {
  console.log(dirX);
  ball.impulse(dirX * puttPower * 100, dirY * puttPower * 100);
});
