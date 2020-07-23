class Game {
  constructor(){
    this.score = 0;
    this.lives = 0;
    this.isRunning = false;
    this.isMouse = false;
    this.levelSpeed = 0;
    this.speed = 1850;
    this.currentEmoji = null;
    this.currentPipe = null;
    this.gameInterval = null;

    this.animals = ['🐭', '🐼', '🐻', '🦊', '🐱', '🐮', '🦁', '🐽', '🐨', '🐰', '🐯'];

    this.startButt = document.getElementById('gameButt');
    this.selectPipe = document.querySelectorAll('.game-zone__pipe_animal');
    this.heartElem = document.querySelectorAll('.lives-wrapp__heart');
    this.livesInStock = document.querySelectorAll('.lives-wrapp__heart_active');
    this.speedValueNum = document.querySelector('.speed__value_num');

    this.finalModalScore = document.querySelector('.end-game__value');
    this.endGameModal = document.querySelector('.end-game');
    this.closeEndModal = document.querySelector('.submit-ok');

    this.clickOnEmoji = this.clickOnEmoji.bind(this);
  }

  mouseChance() {
    for (var i = 0; i < 11; i++) {
      this.animals.push('🐭');
    }
  }

  fillLives() {
    this.heartElem.forEach((live) => live.classList.add('lives-wrapp__heart_active'));
    this.lives = this.heartElem.length;
  }

  deleteHeart() {
    this.livesInStock = document.querySelectorAll('.lives-wrapp__heart_active');
    this.lives = this.livesInStock.length;
    this.livesInStock[this.livesInStock.length - 1].classList.remove('lives-wrapp__heart_active');
    this.lives = this.lives - 1;
  }

  fillInitScore() {
    this.score = 0
    this.scoreElement = document.querySelector('.score__value');
  }

  fillMainScore(num) {
    this.score = this.score + num;
    this.scoreElement.innerHTML = this.score;
  }

  starAnimation() {
    this.speedValueNum.parentNode.classList.remove('star-animation');
    this.speedValueNum.parentNode.classList.add('star-animation');
    setTimeout(()=> this.speedValueNum.parentNode.classList.remove('star-animation'), 900);
  }

  fillInitLevel() {
    clearTimeout(this.animationTimeOut);
    this.levelSpeed += 1;
    this.speedValueNum.innerHTML = '';
    setTimeout(()=> this.speedValueNum.innerHTML = this.levelSpeed, 800);
    this.starAnimation()
  }

  setMoreSpeed(num) {
    this.speed = this.speed - num;
    clearInterval(this.gameInterval);
    this.gameInterval = setInterval(() => this.creatingAnimals(), this.speed);
    this.fillInitLevel();
  }

  randomPipe() {
    const indexPipe = Math.floor(Math.random() * this.selectPipe.length);
    const pipe = this.selectPipe[indexPipe];
    this.currentPipe = pipe;
    return pipe;
  }

  randomAnimals() {
    const indexEmoje = Math.floor(Math.random() * this.animals.length);
    const animals = this.animals[indexEmoje];
    return animals;
  }

  creatingAnimals() {
    let currentPipe = this.randomPipe();
    this.currentEmoji = this.randomAnimals();
    currentPipe.innerHTML = this.currentEmoji;

    if (this.lives > 0) {
      currentPipe.classList.add('emoji_animation');
      setTimeout(()=> {
        currentPipe.classList.remove('emoji_animation');
        currentPipe.innerHTML = '';
      }, this.speed);
    } else {
      this.gameOver();
    }
  }

  gameOver() {
    this.finalModalScore.innerHTML = this.score;
    this.endGameModal.classList.add('end-game_show');
    clearInterval(this.gameInterval);
    document.removeEventListener('click', this.clickOnEmoji);
    this.closeEndModal.addEventListener('click', () => {
      this.endGameModal.classList.remove('end-game_show');
      this.scoreElement.innerHTML = '0';
      this.speedValueNum.innerHTML = '1';
      buttonStart.addEventListener('click', buttonClick);
    })
  }

  startGame() {
    this.mouseChance();
    this.fillLives();
    this.fillInitScore();
    this.fillInitLevel();
    this.gameInterval = setInterval(() => this.creatingAnimals(), this.speed);
    document.addEventListener('click', this.clickOnEmoji);
  }

 clickOnEmoji(evt) {
    if (evt.target === this.startButt) {
      return
    }
    if (evt.target === this.currentPipe) {
      console.log('emoji = ' + this.currentEmoji);
    }
    if (evt.target.innerHTML === '🐭') {
      this.fillMainScore(10);
      if (this.score % 50 === 0) {
        this.setMoreSpeed(250);
        console.log('setMoreSpeed');
      }
    } else if (evt.target.closest('.game-zone')) {
      this.deleteHeart();
    }
    this.currentPipe.innerHTML = '';
    clearInterval( this.gameInterval);
    this.gameInterval = setInterval(() => this.creatingAnimals(), this.speed);
  } 
}


let buttonStart = document.querySelector('.button_start'); // Select game butt

let modalBlock = document.querySelector('.rules'); // select modal guide  
let openModal = document.querySelector('.button_guide'); // select '?' butt  
let closeModal = modalBlock.querySelector('.modal__submit_ok-butt'); // select 'OK' inside the modal rule

openModal.addEventListener('click', () => {
  modalBlock.classList.add('show-rules');
})

closeModal.addEventListener('click', () => {
  modalBlock.classList.remove('show-rules');
})


function buttonClick() {
  buttonStart.removeEventListener('click', buttonClick, false);
  let game = new Game;
  game.startGame();
}
  
buttonStart.addEventListener('click', buttonClick);



  