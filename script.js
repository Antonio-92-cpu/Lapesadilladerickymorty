const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const characterList = document.getElementById('character-list');

searchButton.addEventListener('click', searchCharacters);

function searchCharacters() {
  // Obtener el valor del input de búsqueda
  const characterName = searchInput.value;

  if (characterName.trim() !== '') {
    // Realizar una solicitud a la API de Rick and Morty utilizando el nombre del personaje como parámetro de búsqueda
    fetch(`https://rickandmortyapi.com/api/character/?name=${characterName}`)
      .then(response => response.json()) // Convertir la respuesta en formato JSON
      .then(data => displayCharacters(data.results)) // Pasar los resultados a la función displayCharacters
      .catch(error => console.log(error)); // Manejar cualquier error que ocurra durante la solicitud
  }
}

function displayCharacters(characters) {
  // Limpiar el contenido previo de la lista de personajes
  characterList.innerHTML = '';

  characters.forEach(character => {
    // Crear un elemento div para representar la tarjeta del personaje
    const characterCard = document.createElement('div');
    characterCard.classList.add('character-card');

    // Crear un elemento img para mostrar la imagen del personaje
    const characterImage = document.createElement('img');
    characterImage.src = character.image;

    // Crear un elemento h2 para mostrar el nombre del personaje
    const characterName = document.createElement('h2');
    characterName.textContent = character.name;

    // Crear un elemento p para mostrar el estado del personaje
    const characterStatus = document.createElement('p');
    characterStatus.textContent = `Status: ${character.status}`;

    // Crear un elemento p para mostrar la especie del personaje
    const characterSpecies = document.createElement('p');
    characterSpecies.textContent = `Species: ${character.species}`;

    // Agregar los elementos creados a la tarjeta del personaje
    characterCard.appendChild(characterImage);
    characterCard.appendChild(characterName);
    characterCard.appendChild(characterStatus);
    characterCard.appendChild(characterSpecies);

    // Agregar la tarjeta del personaje a la lista de personajes
    characterList.appendChild(characterCard);
  });
}
