const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const characterList = document.getElementById('character-list');

searchButton.addEventListener('click', searchCharacters);

function searchCharacters() {
  const characterName = searchInput.value.trim();

  if (characterName !== '') {
    fetch(`https://rickandmortyapi.com/api/character/?name=${characterName}`)
      .then(response => response.json())
      .then(data => {
     if (data.error) {
          alert('No se han encontraron personajes con ese nombre.');
        } else {
          displayCharacters(data.results);
        }
      })
      .catch(error => alert);
  }
}


function displayCharacters(characters) {
  characterList.innerHTML = '';

  characters.forEach(character => {
    const characterCard = document.createElement('div');
    characterCard.classList.add('character-card');

    const characterImage = document.createElement('img');
    characterImage.src = character.image;

    const characterName = document.createElement('h2');
    characterName.textContent = character.name;

    const characterStatus = document.createElement('p');
    characterStatus.textContent = `Estado: ${character.status}`;

    const characterSpecies = document.createElement('p');
    characterSpecies.textContent = `Especie: ${character.species}`;

    characterCard.appendChild(characterImage);
    characterCard.appendChild(characterName);
    characterCard.appendChild(characterStatus);
    characterCard.appendChild(characterSpecies);

    characterList.appendChild(characterCard);
  });
}

function fetchCharacters() {
  fetch("https://rickandmortyapi.com/api/character")
    .then(response => response.json())
    .then(data => {
      const characters = data.results.slice(0, 20);
      displayCharacters(characters);
    })
    .catch(error => {
      console.log("Error al obtener los datos: " + error);
    });
}

fetchCharacters();

document.getElementById("reset-button").addEventListener('click', fetchCharacters); 


