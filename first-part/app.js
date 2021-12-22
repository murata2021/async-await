//1

async function factAboutFavNumber(favNumber){
    let res=await axios.get(`http://numbersapi.com/${favNumber}?json`)
    console.log(res.data.text)
}

factAboutFavNumber(12)

//2

let ol=document.querySelector('ol')

async function factsAboutMultipleNumbers(numbers){
    let res=await axios.get(`http://numbersapi.com/${numbers}?json`)
    for (let i in res.data){
        let li=document.createElement('li')
        li.innerText=res.data[i]
        ol.appendChild(li)
    }
}

factsAboutMultipleNumbers([1,9,45,54])


//3

let ul=document.querySelector('ul')


async function multipleFacts(favNumber){

    let res1=axios.get(`http://numbersapi.com/${favNumber}?json`)
    let res2=axios.get(`http://numbersapi.com/${favNumber}?json`)
    let res3=axios.get(`http://numbersapi.com/${favNumber}?json`)
    let res4=axios.get(`http://numbersapi.com/${favNumber}?json`)

    let response1=await res1
    let response2=await res2
    let response3=await res3
    let response4=await res4

    for (let i of [response1,response2,response3,response4]){
        let li=document.createElement('li')
        li.innerText=i.data.text
        ul.appendChild(li)
    }
}

multipleFacts(23)