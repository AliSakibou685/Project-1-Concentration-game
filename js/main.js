/*----- constants -----*/
const SOURCE_CARDS = [
    { img: 'https://i.imgur.com/mwXZb1A.jpg', matched: false },
    { img: 'https://i.imgur.com/mH4GxOK.jpg', matched: false },
    { img: 'https://i.imgur.com/2gKlohs.jpg', matched: false },
    { img: 'https://i.imgur.com/BmWsFzu.jpg', matched: false },
    { img: 'https://i.imgur.com/rMVWMVC.jpg', matched: false },
    { img: 'https://i.imgur.com/pmdiDex.jpg', matched: false },
    { img: 'https://i.imgur.com/rTyEO8e.jpg', matched: false },
    { img: 'https://i.imgur.com/alwDyvP.jpg', matched: false },
];
const CARD_BACK = 'https://i.imgur.com/ad9732D.jpg';

const MAX_BAD_GUESSES = 10;

/*----- state variables -----*/
let cards;
let firstCard;
let numBad;
let ignoreClicks;
let gameStatus;



/*----- cached elements  -----*/
const msgEl = document.querySelector('h3');
const imgEls = [...document.querySelectorAll('main > img')];
const PlayAgainBtn= document.querySelector('button');
const PlayAgainBtnEl= document.querySelector('h3');
const backgroundmusicaudio=document.getElementById('backgroundMusic')

/*----- event listeners -----*/
imgEls.forEach(imgEl => {
    imgEl.addEventListener('click', handleClick)
})
 PlayAgainBtnEl.addEventListener('click', init)
/*----- functions -----*/
init();

function init() {
    cards = getShuffledCards();
    firstCard = null;
    numBad = 0;
    ignoreClicks = false;
    gameStatus = null;
    render();
}

function render() {
    cards.forEach(function (card, idx) {
        const imgEl = document.getElementById(idx);
        const src = (card.matched || card === firstCard) ? card.img : CARD_BACK;
        imgEl.src = src;
    });
    if (gameStatus === 'W') {
        msgEl.innerHTML = 'You Won!';
       

    } else if (gameStatus === 'L') {
        msgEl.innerHTML = 'You Lose!';
    } else {
        msgEl.innerHTML = `${MAX_BAD_GUESSES - numBad} incorrect guesses remaining`;
    }  
}

function getShuffledCards() {
    let tempCards = [];
    let cards = [];
    for (let card of SOURCE_CARDS) {
        tempCards.push({ ...card }, { ...card });
    }
    while (tempCards.length) {
        let rndIdx = Math.floor(Math.random() * tempCards.length);
        let card = tempCards.splice(rndIdx, 1)[0];
        cards.push(card);
    }
    // console.log(tempCards);
    return cards;
};

function handleClick(evt) {
    if (ignoreClicks || gameStatus) return;
    const cardIdx = parseInt(evt.target.id);
    if (isNaN(cardIdx)) return;
    const card = cards[cardIdx];
    const cardEl = this;
    cardEl.classList.toggle('flip');
    if (firstCard === card) {
        numBad++;
        firstCard = null;
    } else if (firstCard) {
        card.matched = true;
        if (firstCard.img === card.img) {
            firstCard.matched = true;
            firstCard = null;
        } else {
            numBad++;
            ignoreClicks = true;
            setTimeout(function () {
                ignoreClicks = false;
                card.matched = false;
                firstCard = null;
                render();
            }, 1000);
        }
    } else {
        firstCard = card;
    }
    
    gameStatus = getGameStatus();
    render();
}

function getGameStatus() {
    if (cards.every((card) => card.matched)) return 'W';
    if (numBad === MAX_BAD_GUESSES) return 'L';
    return null;
}
