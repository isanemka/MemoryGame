const cards = document.querySelectorAll('.card');
let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
const restart = document.getElementById('restart');


function gameStart() {
    cards.forEach(card => {
        let setRandom = Math.floor(Math.random() * 12 + 1);
        card.style.order = setRandom;
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    })
    lockBoard = false;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.img === secondCard.dataset.img;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [flippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

    if (document.querySelectorAll('.card:not(.flip)').length === 0) {
        setTimeout(() => {
            alert('Grattis! Du har klarat spelet!');
            gameStart();
        }, 500);
    }
}

function restartGame() {
    gameStart();
}

cards.forEach(card => card.addEventListener('click', flipCard))
restart.addEventListener('click', restartGame);

gameStart();