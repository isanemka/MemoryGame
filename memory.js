const cards = document.querySelectorAll('.card');

function gameStart() {
    cards.forEach(card => {
        let setRandom = Math.floor(Math.random() * 12 + 1);
        card.style.order = setRandom;
    })
}

function flipCard() {
    this.classList.toggle('flip')  
}

cards.forEach(card => card.addEventListener('click', flipCard))

gameStart();