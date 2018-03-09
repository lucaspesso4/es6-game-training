// Criar canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Imagem canvas background
let bgReady = false;
const bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = 'images/background.png';

//Criando bomba
let bombReady = false;
const bombImage = new Image();
bombImage.onload = function() {
  bombReady = true
};
bombImage.src = 'images/bomb.png';

// Vilão IE
let ieReady = false;
const ieImage = new Image();
ieImage.onload = function () {
  ieReady = true;
};
ieImage.src = 'images/ie.png';

//Obj Jogo
const bomb = {
  speed: 256 //pixel por segundo
};
const ie = {};
let ieDestroyed = 0;

//Controle
const keysDown = {};

window.addEventListener('keydown', function (e){
  keysDown[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function (e){
  delete keysDown[e.keyCode];
}, false);

// Reset game em colisão
const reset = function () {
  bomb.x = canvas.width / 2;
  bomb.y = canvas.height / 2;

  // IE random na tela
  ie.x = 32 + (Math.random() * (canvas.width - 64));
  ie.y = 32 + (Math.random() * (canvas.width - 64));
};

// Att jogo
const update = function (modifier) {
  if (38 in keysDown) { //cima
    bomb.y -= bomb.speed * modifier; 
  }
  if (40 in keysDown) {//baixo
    bomb.y += bomb.speed * modifier; 
  }
  if (37 in keysDown) {//esquerda
    bomb.x -= bomb.speed * modifier;
  }
  if (39 in keysDown) {//direita
    bomb.x += bomb.speed * modifier;
  }

  // Teste de colisão
  if(
    bomb.x <= (ie.x + 32)
    && ie.x <= (bomb.x + 32)
    && bomb.y <= (ie.y + 32)
    && ie.y <= (bomb.y + 32)
  ) {
    ++ieDestroyed;
    reset();
  }
};

// Render
const render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (bombReady) {
    ctx.drawImage(bombImage, bomb.x, bomb.y);
  }
  if (ieReady) {
    ctx.drawImage(ieImage, ie.x, ie.y);
  }
  // Pontos
  ctx.fillStyle = 'rgb(250, 250, 250)';
  ctx.font = '24px Helvetica';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Pessoas salvas: ' + ieDestroyed, 32, 32);
};

// Loop do jogo
const main = function () {
  const now = Date.now();
  const delta = now - then;

  update(delta / 1000);
  render();
  then = now;

  requestAnimationFrame(main);
};
// Cross-browser requestAnimationFrame
const w = window;
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Começa o jogo
let then = Date.now();
reset();
main();