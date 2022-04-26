const fundo = document.querySelector('#main-jogo');
const dino = document.querySelector('#dino');

var posicaoDino = parseInt(getComputedStyle(dino).getPropertyValue('bottom'));
var isJumping = false;

function startJogo(){
  fundo.style.animation = 'slideright 600s infinite linear';
  window.addEventListener('keydown', pulo);
  gerarCacto();
}

function pulo(event){
  if((event.key === ' ' || event.key === 'ArrowUp') && !isJumping){
    event.preventDefault();
    isJumping = true;

    let upInterval = setInterval(() => {
      if(posicaoDino >= 120){
        clearInterval(upInterval);
        let downInterval = setInterval(() => {
          if(posicaoDino >= 20){
            posicaoDino -= 20;
            dino.style.bottom = `${posicaoDino}px`;
          }else{
            clearInterval(downInterval);
            isJumping = false;
          }
        }, 30)
      }else{
        posicaoDino += 20;
        dino.style.bottom = `${posicaoDino}px`;
      }
    }, 30)
  }
}

function gerarCacto(){
  let cacto = document.createElement('div');
  let cactoLeft = 1000;
  let random = Math.random() * 6000;

  cacto.classList.add('cacto');
  fundo.appendChild(cacto);
  cacto.style.left = `${cactoLeft}px`;

  let leftInterval = setInterval(() => {
    if(cactoLeft <= -60){
      clearInterval(leftInterval);
      fundo.removeChild(cacto);
    }else if(cactoLeft > 0 && cactoLeft <= 60 && posicaoDino <= 60){
      clearInterval(leftInterval);
      fundo.style.animation = '';
      document.body.innerHTML = '<h1> FIM DE JOGO </h1>';
    }else{
      cactoLeft -= 10;
      cacto.style.left = `${cactoLeft}px`
    }
  }, 20);

  setTimeout(gerarCacto, random);
}

window.addEventListener('keydown', startJogo);
