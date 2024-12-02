/*----- constants -----*/
const SOURCE_CARDS = [
    {img: 'https://i.imgur.com/mwXZb1A.jpg' , matched: false},
    {img: 'https://i.imgur.com/mH4GxOK.jpg' , matched: false},
    {img: 'https://i.imgur.com/2gKlohs.jpg' , matched: false},
    {img: 'https://i.imgur.com/BmWsFzu.jpg' , matched: false},
    {img: 'https://i.imgur.com/rMVWMVC.jpg' , matched: false},
    {img: 'https://i.imgur.com/pmdiDex.jpg' , matched: false},
    {img: 'https://i.imgur.com/rTyEO8e.jpg' , matched: false},
    {img: 'https://i.imgur.com/alwDyvP.jpg' , matched: false},
];
const CARD_BACK = 'https://i.imgur.com/TCsubGF.jpg';



/*----- state variables -----*/
let cards;
let firstCard;



/*----- cached elements  -----*/


/*----- event listeners -----*/
document.querySelector('main').addEventListener('click', handlePick)

/*----- functions -----*/
init();

function init () {
    cards= getShuffledCards();
    firstCard = null;
    render();
 }

 function render () {
    cards.forEach(function(card, idx)  {
        const imgEl=document.getElementById(idx);
        const src = (card.matched || card === firstCard) ? card.img : CARD_BACK;
        imgEl.src = src;
    });
 }

 function getShuffledCards() {
    let tempCards = [];
    let cards =  [];
    for (let card of SOURCE_CARDS ){
        tempCards.push({...card}, {...card});
    }
    while (tempCards.length) {
        let rndIdx = Math.floor(Math.random() * tempCards.length);
        let card = tempCards.splice(rndIdx, 1)[0];
        cards.push(card);
    }
    // console.log(tempCards);
    return cards;
};

function handlePick(evt) {
    const cardIdx = parseInt(evt.target.id);

    console.log(cardIdx)
}
