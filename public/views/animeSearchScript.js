
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

        // Your form submission logic...
    });
});


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
    else {

    }
}


