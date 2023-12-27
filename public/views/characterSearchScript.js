
const name = document.getElementById('name');
const description = document.getElementById('description');
const age = document.getElementById('age');
const bloodType = document.getElementById('bloodType');
const siteUrl = document.getElementById('siteUrl');
const favourites = document.getElementById('favourites');


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('myForm');

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission
        fetchData();
        // Your form submission logic...
    });
});

// function removeQuotes(string) {
//     string = string.substring(1, string.length-1);
//     // string = string.replace(/\n/g, '<br>');
//     return string;
// }

function createPara(string) {
    
}

async function fetchData() {

    const character = document.getElementById('character').value;
    
    console.log("we got body as --> " + character);
    // console.log("we got body as --> " + character + " type of character : " + typeof(character));
    
    if (character){
        try {
            const response = await fetch('/characterSearch', {
                method: 'POST',
                // body: JSON.stringify({character : character}),
                body: character,
                headers: {
                    // 'Content-Type': 'application/json' // Specify content type as JSON
                    'Content-Type': 'text/plain' // Specify content type as JSON
                    // 'Content-Type': 'application/x-www-form-urlencoded' // Specify content type as JSON
                }
            });
    
            const characterProperties = await response.json();
            console.log(characterProperties);
    
            // name.innerHTML = 'name : ' + character;
            // description.innerHTML = 'description : ' + removeQuotes(JSON.stringify(characterProperties.description));
            // age.innerHTML = 'age : ' + removeQuotes(JSON.stringify(characterProperties.age));
            // // bloodType.innerHTML = 'blood type : ' + JSON.stringify(characterProperties.bloodType);
            // siteUrl.innerHTML = 'site URL : ' + removeQuotes(JSON.stringify(characterProperties.siteUrl));
            // favourites.innerHTML = 'favorites : ' + removeQuotes(JSON.stringify(characterProperties.favourites));

            name.innerText = 'name : ' + character;
            description.innerText = 'description : ' + characterProperties.description;
            age.innerText = 'age : ' + characterProperties.age;
            // bloodType.innerText = 'blood type : ' + characterProperties.bloodType;
            siteUrl.innerText = 'site URL : ' + characterProperties.siteUrl;
            favourites.innerText = 'favorites : ' + characterProperties.favourites;
    
        } catch (error) {
            console.error(error);
            // res.json(error);
        }
    }
    else {

    }
}


