const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();
const router = Router();
const path = require('path');





// const bodyParser = require('body-parser');
// const cors = require('cors');


// router.use(bodyParser.json());
// router.use(cors());

router.get('/', (req, res) => {

    const htmlFilePath = path.join(__dirname, '../characterSearch.html');
    res.sendFile(htmlFilePath);
});


router.post('/', (req, res) => {
    
    const character = req.body.characterName;
    console.log("we got body as --> "+ character);
    
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

module.exports = router;




