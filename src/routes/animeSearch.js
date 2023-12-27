const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();
const router = Router();
const path = require('path');


router.get('/', (req, res) => {

    const htmlFilePath = path.join(__dirname, '../../public/static', 'animeSearch.html');
    res.sendFile(htmlFilePath);
});


router.post('/', (req, res) => {
    
    // const character = req.body.character;
    const anime = req.body;
    console.log("we got body as --> "+ anime);
    
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
    const query = `query Media {
        Media(search: "${anime}", type: ANIME) {
            id
            idMal
            type
            format
            status
            description
            season
            seasonYear
            seasonInt
            episodes
            duration
            chapters
            volumes
            countryOfOrigin
            isLicensed
            source
            hashtag
            updatedAt
            bannerImage
            genres
            synonyms
            averageScore
            meanScore
            popularity
            isLocked
            trending
            favourites
            isFavourite
            isFavouriteBlocked
            isAdult
            siteUrl
            autoCreateForumThread
            isRecommendationBlocked
            isReviewBlocked
            modNotes
            title {
                english
                native
                userPreferred
                romaji
            }
            startDate {
                year
                month
                day
            }
            endDate {
                year
                month
                day
            }
            coverImage {
                extraLarge
                large
                medium
                color
            }
            rankings {
                id
                rank
                type
                format
                year
                season
                allTime
                context
            }
        }
    }  `;
    
    
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




