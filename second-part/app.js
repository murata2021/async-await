//1
// async function drawCard(){
//     let res=await axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
//     console.log(res.data.cards)
//     let {suit,value}=res.data.cards[0]
//     console.log(`Card: ${value} of ${suit}`)
// }

//2
// async function drawTwoCards(){
//     let res=await axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
//     let deck_id=res.data.deck_id
//     let res1=await axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    
//     let {suit,value}=res.data.cards[0]
//     console.log(`Card: ${value} of ${suit}`)

//     let {suit:suit1,value:value1}=res1.data.cards[0]
//     console.log(`Card: ${value1} of ${suit1}`)
// }
// drawTwoCards()

//3

let button=document.querySelector('#gimme-card')
let restart=document.querySelector('#restart')


let div=document.querySelector('#cards')

let deck_id;

async function init(){
    let res=await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/')
    deck_id=res.data.deck_id
}

init()

async function gimmeCard(){

    let res=await axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)

    if (res.data.remaining===0){
        button.style='display:None;'
        restart.style='display:block;'
    }
    else{
        let image=document.createElement('img')
        image.src=res.data.cards[0].image
        image.style=`transform: rotate(${Math.floor(Math.random() * 60)+30}deg);`
        div.appendChild(image)

    }

}

button.addEventListener('click',gimmeCard)
restart.addEventListener('click',function (){
    location.reload()
})