const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();
const router = Router();
const path = require('path');


router.get('/', (req, res) => {

    const htmlFilePath = path.join(__dirname, '../../public/static', 'characterSearch.html');
    res.sendFile(htmlFilePath);
});


router.post('/', (req, res) => {
    
    // const character = req.body.character;
    const character = req.body;
    console.log("we got body as --> "+ character);
    
    async function fetchData() {

    // const query = `query Character {
    //     Character(search: "${character}") {
    //         id
    //         description
    //         gender
    //         age
    //         bloodType
    //         isFavourite
    //         isFavouriteBlocked
    //         siteUrl
    //         updatedAt
    //         favourites
    //         modNotes
    //     }
    // }`;
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
            image {
                large
                medium
            }
            dateOfBirth {
                year
                month
                day
            }
            name {
                first
                middle
                last
                full
                native
                alternative
                alternativeSpoiler
                userPreferred
            }
        }
    }
    
    `;
    
    
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

            const gender = characterProperties.gender;     
            const age = characterProperties.age;

            console.log(gender, age);
            res.json(characterProperties);
            // return characterProperties;

        } catch (error) {
            console.error(error);
            res.json(error);
        }
    }

    fetchData();
})

module.exports = router;




