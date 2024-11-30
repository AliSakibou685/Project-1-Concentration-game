/*----- constants -----*/
const SOURCE_CARDS = [
    {img: 'https://imgur.com/alwDyvP' , matched: false},
    {img: 'https://imgur.com/rTyEO8e' , matched: false},
    {img: 'https://imgur.com/pmdiDex' , matched: false},
    {img: 'https://imgur.com/rMVWMVC' , matched: false},
    {img: 'https://imgur.com/BmWsFzu' , matched: false},
    {img: 'https://imgur.com/2gKlohs' , matched: false},
    {img: 'https://imgur.com/mH4GxOK' , matched: false},
    {img: 'https://imgur.com/mwXZb1A' , matched: false},
];
const CARD_BACK = 'https://imgur.com/ad9732D';



/*----- state variables -----*/
let cards;
let firstCard;


/*----- cached elements  -----*/


/*----- event listeners -----*/


/*----- functions -----*/
init();

function init () {
    cards= getShuffledCards();
    firstCard = null;
    render();
 }

 function render () {
    cards.forEach(function(card, idx) {
        const imgEl=document.getElementById(idx);
        imgEl.src = card.img;
    });
 }

 function getShuffledCards() {
    let tempCards = [];
    let cards =  [];
    for (let card of SOURCE_CARDS ){
        tempCards.push(card, card);
    }
    while (tempCards.length) {
        let rndIdx = math.floor(Math.random() * tempCards.length);
        let card = tempCards.splice(rndIdx, 1)[0];
        cards.push(card);
    }
    // console.log(tempCards);
    return cards;

 }