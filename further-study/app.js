let pokeball=document.querySelector('#pokeball');
let namesAndImages=[];

async function getPokemons(){

    document.querySelector('#pokemon-area').innerHTML=''
    let res=await axios.get('https://pokeapi.co/api/v2/pokemon/')
    let count=res.data.count
    let res2=await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${count}`)
    let pokemonList=res2
    
    let pokemonArr=[];

    for (let i=0;i<3;i++){
        let randNumber=Math.floor(Math.random()*count)
        let pokemonURL=pokemonList.data.results[randNumber].url
        namesAndImages.push({name:pokemonList.data.results[randNumber].name})
        pokemonArr.push(pokemonURL)
    }

    let pokemonSpeciesURL=[]

    for (let i=0;i<pokemonArr.length;i++){

        let result=await axios.get(pokemonArr[i])
        namesAndImages[i].img=result.data.sprites.back_default
        pokemonSpeciesURL.push(result.data.species.url)

    }

    for (let i=0;i<pokemonSpeciesURL.length;i++){

        let result=await axios.get(pokemonSpeciesURL[i])

        let text;
        console.log(result)
        for (let j of result.data.flavor_text_entries ){
            if (j.language.name==='en'){
                text=j.flavor_text
                break;
            }
        }

        namesAndImages[i].description=text
        makeCard(namesAndImages[i].name,namesAndImages[i].img,namesAndImages[i].description)

    }

}

function makeCard(name,image,text){
    let div=document.createElement('div')
    div.classList.add("col-md-auto")
    div.innerHTML=`<div class="card" style="width: 18rem;">
    <img src=${image} class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${name}</h5>
    <p class="card-text">${text}</p>
    </div>
</div>`
    document.querySelector('#pokemon-area').appendChild(div)

}

pokeball.addEventListener('click',getPokemons)