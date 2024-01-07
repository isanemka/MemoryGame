import { loadImages } from "./images.js";

const cards = document.querySelectorAll('.card');
let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let count = 0;
const restart = document.getElementById('restart');
const frontImg = document.getElementsByClassName('img-front');
const backImg = document.getElementsByClassName('img-back');
let imagesArray;

async function showImages() {

    const frontImageUrl = imagesArray[0].url;

    Array.from(frontImg).forEach(frontImg => {
        frontImg.src = frontImageUrl;
    });

    imagesArray.forEach((image) => {
        const correspondingImg = Array.from(backImg).filter(img => img.parentElement.parentElement.dataset.img === image['data-img']);
        
        correspondingImg.forEach(imgElement => {
            imgElement.src = image.url;
        });
    });
}

async function gameStart() {
    imagesArray = await loadImages();
    showImages();
    count = 0;
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
    count++;
    counter();
}

function counter() {
    document.querySelector('.flips span b').innerText = count;
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
            alert('Grattis! Du har klarat spelet! Det krävdes ' + count + ' drag.');
            gameStart();
            count = 0;
            counter();
        }, 500);
    }
}

function restartGame() {
    gameStart();
    counter();
    count = 0;
}

cards.forEach(card => card.addEventListener('click', flipCard))
restart.addEventListener('click', restartGame);

gameStart();