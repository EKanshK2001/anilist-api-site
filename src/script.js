require('dotenv').config();
// const resultDiv = document.getElementById('result');
const name = document.getElementById('name');
const description = document.getElementById('description');
const age = document.getElementById('age');
const bloodType = document.getElementById('bloodType');
const siteUrl = document.getElementById('siteUrl');
const favourites = document.getElementById('favourites');

// async function getInfo() {

//     const characterName = document.getElementById('character').value;
//     console.log(characterName, typeof(characterName));

//     const response = await fetch('http://localhost:8080/characterSearch/?character=' + characterName, {method: 'POST'});

//     const characterProperties = await response.text();

//     resultDiv.innerHTML = characterProperties;
// }

async function fetchData() {

    const character = document.getElementById('character').value;
    console.log("we got body as --> " + character);

    const query = `query Character {
    Character(search: "${character}") {
        id
        description
        gender
        age
        bloodType
        isFavourite
        isFavouriteBlocked
        siteUrl
        updatedAt
        favourites
        modNotes
    }
}`;


    const options = {
        method: 'POST',
        url: 'https://anilist-graphql.p.rapidapi.com/',
        headers: {
            'x-rapidapi-key': process.env.KEY,
            'x-rapidapi-host': 'anilist-graphql.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            query     //so here our query object is already a string in backticks. and data could have taken it directly but nah. ima do my own thing
        }
    }


    try {
        const response = await axios.request(options);
        const characterProperties = response.data.data.Character;           //.data.data. ik ugghh its wierd. took me an hour to find what was the error

        // const gender = characterProperties.gender;
        // const age = characterProperties.age;

        // console.log(gender, age);
        // res.json(characterProperties);
        // const characterName = document.getElementById('character').value;
        // console.log(characterName, typeof (characterName));

        // const response = await fetch('http://localhost:8080/characterSearch/?character=' + characterName, {method: 'POST'});

        // const myCharacterProperties = await response.json();

        name.innerText = 'name : ' + character;
        description.innerText = 'description : ' + (JSON.stringify(characterProperties.description));
        age.innerText = 'age : ' + JSON.stringify(characterProperties.age);
        bloodType.innerText = 'blood type : ' + JSON.stringify(characterProperties.bloodType);
        siteUrl.innerText = 'site URL : ' + JSON.stringify(characterProperties.siteUrl);
        favourites.innerText = 'favorites : ' + JSON.stringify(characterProperties.favourites);

    } catch (error) {
        console.error(error);
        // res.json(error);
    }

}


