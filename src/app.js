const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/characterSearch', (req, res) => {

    res.sendFile(__dirname + '/characterSearch.html');


});


app.post('/characterSearch', (req, res) => {
    
    const character = req.query.character;
    console.log("we got body as --> "+character);
    
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
            'x-rapidapi-key': '',
            'x-rapidapi-host': 'anilist-graphql.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            query     //so here our query object is already a string in backticks. and data could have taken it directly but nah. ima do my own thing
        }
    }
    
    
    async function fetchData() {
    try {
            const response = await axios.request(options);
            const characterProperties = response.data.data.Character;           //.data.data. ik ugghh its wierd. took me an hour to find what was the error

            const gender = characterProperties.gender;     
            const age = characterProperties.age;

            console.log(gender, age);
            res.json(characterProperties);

        } catch (error) {
            console.error(error);
            res.json(error);
        }
    }

    fetchData();
})


app.listen(PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});





