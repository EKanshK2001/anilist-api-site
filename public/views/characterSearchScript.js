
// const name = document.getElementById('name');
// const description = document.getElementById('description');
// const age = document.getElementById('age');
// const bloodType = document.getElementById('bloodType');
// const siteUrl = document.getElementById('siteUrl');
// const favourites = document.getElementById('favourites');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


document.addEventListener('DOMContentLoaded', function () {
    const getInfoBtn = document.getElementById('getInfoBtn');

    getInfoBtn.addEventListener('click', async function (event) {
        event.preventDefault(); // Prevent the default form submission
        const main = document.getElementById('main');
        main.innerHTML = '';
        fetchData();
        // Your form submission logic...
    });
});

// function removeQuotes(string) {
//     string = string.substring(1, string.length-1);
//     // string = string.replace(/\n/g, '<br>');
//     return string;
// }

// function isSpoiler(string) {
//     const regex = /~!(.*?)!~/g;
//     let matches = [];
//     let match;

//     while ((match = regex.exec(string)) !== null) {
//         matches.push(match[1]);
//     }

//     if (matches.length > 0) {
//         console.log("Spoiler Content: ", matches);
//     } else {
//         console.log("No spoiler content found");
//     }
//     return string;
// }





//helper functions
function createDiv(data, id) {
    const div = document.createElement('div');
    div.setAttribute('id', id);
    div.classList.add('text-box');

    div.innerText = data;

    return div;
}
function createUrlDiv(url, id) {
    const a = document.createElement('a');
    a.setAttribute('id', id);
    a.setAttribute('href', url);
    a.classList.add('text-box');

    a.innerText = url;

    return a;
}

function createImg(link, id) {
    const characterImage = document.createElement('img');
    characterImage.setAttribute('src', link);
    characterImage.setAttribute('alt', 'character image');
    characterImage.setAttribute('id', id);
    characterImage.classList.add('text-box', 'character-image');

    return characterImage;
}

function createDob(year, month, day, id){
    const dob = document.createElement('div');
    dob.setAttribute('id', id);
    dob.classList.add('text-box');

    let string = '';
    // for (date in dateOfBirth) {
    //     if (dateOfBirth[date] !== null) {
    //         string = dateOfBirth[date] + ' ' + string;
    //     }
    // }
    if (year !== null) {
        string = year + ' ' + string;
    }
    if (month !== null) {
        const monthString = months[month - 1];
        string = monthString + ' ' + string;
    }
    if (day !== null) {
        string = day + ' ' + string;
    }

    dob.innerText = string;
    return dob;
}

function createAlternativeDiv(arr, id) {
    const div = document.createElement('div');
    div.setAttribute('id', id);
    div.classList.add('text-box');

    let string = '';

    for (let i = 0; i < arr.length; i++) {
        if (i === arr.length - 1) {
            string += arr[i];
        } else {
            string += arr[i] + ', ';
        }
    }

    div.innerText = string;

    return div;
}

function wrapDiv(wrapArr, id) {
    const div = document.createElement('div');
    div.setAttribute('id', id);
    div.classList.add('text-box', 'properties');

    wrapArr.forEach(element => {
        div.appendChild(element);
    });

    return div;
}






async function fetchData() {

    const character = document.getElementById('character').value;

    console.log("we got body as --> " + character);
    // console.log("we got body as --> " + character + " type of character : " + typeof(character));

    if (character) {
        try {
            const response = await fetch('/characterSearch', {
                method: 'POST',
                // body: JSON.stringify({character : character}), //here character is made/treated a json object
                body: character,    //here character is plain string.
                headers: {
                    // 'Content-Type': 'application/json' // Specify content type as JSON app.use(bodyParser.json())
                    // 'Content-Type': 'application/x-www-form-urlencoded' // Specify content type as url form type. app.use(bodyParser.urlencoded({ extended: true }))
                    'Content-Type': 'text/plain' // Specify content type as plain text. catch is that we need to use app.use(bodyParser.text()) in server.js
                }
            });

            const characterProperties = await response.json();
            console.log(characterProperties);

            // name.innerText = 'name : ' + characterProperties.name.full;
            // description.innerText = 'description : ' + characterProperties.description;
            // age.innerText = 'age : ' + characterProperties.age;
            // // bloodType.innerText = 'blood type : ' + characterProperties.bloodType;
            // siteUrl.innerText = 'site URL : ' + characterProperties.siteUrl;
            // favourites.innerText = 'favorites : ' + characterProperties.favourites;

            const {
                id,
                description,
                gender,
                age,
                siteUrl,
                favourites,
                image: {
                    large,
                    medium,
                },
                dateOfBirth: {
                    year,
                    month,
                    day,
                },
                name: {
                    first,
                    middle,
                    last,
                    full,
                    native,
                    alternative,
                    userPreferred,
                },
            } = characterProperties;

            
            // if (large || medium) {
            //     //append image above
            // }
            
            // // if (full){
                
            //     // }


            //NEED FLOW CONTROL OVER HERE TO CHECK FOR NULL VALUES FIRST


            const characterImg = createImg(large || medium, '_img');
            const fullNameDiv = createDiv(full, '_name');
            const nativeDiv = createDiv(native, '_native');
            const alternativeDiv = createAlternativeDiv(alternative, '_alternative');
            //append all 3 divs above


            const dobDiv = createDob(year, month, day, '_dob');
            //append dob above


            const ageDiv = createDiv(age, '_age');
            const genderDiv = createDiv(gender, '_gender');
            const favouritesDiv = createDiv(favourites, '_favourites');
            const siteUrlDiv = createUrlDiv(siteUrl, '_siteUrl');
            const descriptionDiv = createDiv(description, '_description');

            const wrapArr = [ageDiv, genderDiv, favouritesDiv, siteUrlDiv, descriptionDiv];
            const properties = wrapDiv(wrapArr, '_properties');
            //append properties above


            const mainElementsArray = [characterImg, fullNameDiv, nativeDiv, alternativeDiv, dobDiv, properties];
            //main contents to be added

            const mainDiv = document.getElementById('main');
            mainDiv.classList.add('text-box', 'container');

            mainElementsArray.forEach(element => {
                mainDiv.appendChild(element);
            });

        } catch (error) {
            console.error(error);
            // res.json(error);
        }
    }
    else {

    }
}


