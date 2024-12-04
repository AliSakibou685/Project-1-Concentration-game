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



/*----- state variables -----*/
let cards;
let firstCard;
let numBad;
let ignoreClicks;
let Match;
let totalPairs;
let matchedPairs


/*----- cached elements  -----*/
const msgEl = document.querySelector('h3');
const imgEls = [...document.querySelectorAll('main > img')];
/*----- event listeners -----*/
imgEls.forEach(imgEl => {
    imgEl.addEventListener('click', handleClick)
})

/*----- functions -----*/
init();

function init() {
    cards = getShuffledCards();
    firstCard = null;
    numBad = 0;
    ignoreClicks = false;
    totalPairs = 8;
    matchedPairs = 0;
    render();
}

function render() {
    cards.forEach(function (card, idx) {
        const imgEl = document.getElementById(idx);
        const src = (card.matched || card === firstCard) ? card.img : CARD_BACK;
        imgEl.src = src;
    });
    msgEl.innerHTML = `Bad Count ${numBad}`;
    if (matchedPairs === totalPairs) {
        msgEl.innerText = 'you won!'
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
    if (ignoreClicks) return;
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
            matchedPairs++;


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

    render();
}

