
const resultDiv = document.getElementById('result');

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
            'x-rapidapi-key': '2b7dad3861msh3c855ef1275cf78p1df61ajsn281baa842d1b',
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

        resultDiv.innerHTML = JSON.stringify(characterProperties);

    } catch (error) {
        console.error(error);
        // res.json(error);
    }

}


