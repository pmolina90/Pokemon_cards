// services/api.js
const fetchPokemonData = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const uniquePokemon = new Map();

        data.results.forEach(pokemon => {
            const id = pokemon.url.split('/').filter(Boolean).pop(); // Extract the unique ID from the URL
            if (!uniquePokemon.has(id)) {
                uniquePokemon.set(id, pokemon);
            }
        });

        return Array.from(uniquePokemon.values());
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        throw error; // Re-throw the error to be caught in the calling function
    }
};

export default fetchPokemonData;