'use strict';

// Criar canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Imagem canvas background
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = 'images/background.png';

//Criando bomba
var bombReady = false;
var bombImage = new Image();
bombImage.onload = function () {
  bombReady = true;
};
bombImage.src = 'images/bomb.png';

// Vilão IE
var ieReady = false;
var ieImage = new Image();
ieImage.onload = function () {
  ieReady = true;
};
ieImage.src = 'images/ie.png';

//Obj Jogo
var bomb = {
  speed: 256 //pixel por segundo
};
var ie = {};
var ieDestroyed = 0;

//Controle
var keysDown = {};

window.addEventListener('keydown', function (e) {
  keysDown[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function (e) {
  delete keysDown[e.keyCode];
}, false);

// Reset game em colisão
var reset = function reset() {
  bomb.x = canvas.width / 2;
  bomb.y = canvas.height / 2;

  // IE random na tela
  ie.x = 32 + Math.random() * (canvas.width - 64);
  ie.y = 32 + Math.random() * (canvas.width - 64);
};

// Att jogo
var update = function update(modifier) {
  if (38 in keysDown) {
    //cima
    bomb.y -= bomb.speed * modifier;
  }
  if (40 in keysDown) {
    //baixo
    bomb.y += bomb.speed * modifier;
  }
  if (37 in keysDown) {
    //esquerda
    bomb.x -= bomb.speed * modifier;
  }
  if (39 in keysDown) {
    //direita
    bomb.x += bomb.speed * modifier;
  }

  // Teste de colisão
  if (bomb.x <= ie.x + 32 && ie.x <= bomb.x + 32 && bomb.y <= ie.y + 32 && ie.y <= bomb.y + 32) {
    ++ieDestroyed;
    reset();
  }
};

// Render
var render = function render() {
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
  ctx.fillText('Saved People: ' + ieDestroyed, 32, 32);
};

// Loop do jogo
var main = function main() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();
  then = now;

  requestAnimationFrame(main);
};
// Cross-browser requestAnimationFrame
var w = window;
var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Começa o jogo
var then = Date.now();
reset();
main();
