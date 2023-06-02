import { useState } from "react";
import axios from "axios";

// define the Pokemon interface, which describes the shape of the Pokemon object returned by the API. 
interface Pokemon {
  name: string;
  imageUrl: string;
}

function App() {
  // define the pokemon state variable using the useState hook.
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  
  // define the handleClick function that is called when the "Generate Image" button is clicked.
  const handleClick = async () => {
    try {
      // generate a random Pokemon ID from 1~1000, since there seem to be about 1000 Pokémon now.
      const randomId = Math.floor(Math.random() * 1000) + 1;
      // uses the axios library to make a GET request to the external API that returns the Pokemon data for that ID.
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      // the response data is stored in the pokemon state variable using the setPokemon function.
      setPokemon({
        name: response.data.name,
        imageUrl: response.data.sprites.front_default,
      });
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  // The UI of the app consists of a heading, a "Generate Image" button, and a Pokemon image and name (if available) that are displayed when the button is clicked.
  // The pokemon state variable is used to conditionally render the Pokemon image and name using the && operator.If pokemon is not null, the image and name are displayed using the img and p elements.
  return (
    <div>
      <h1>Random Pokemon Image Generator</h1>
      <button onClick={handleClick}>Generate Image</button>
      {pokemon && (
        <div>
          <img src={pokemon.imageUrl} alt={pokemon.name} />
          {pokemon.imageUrl && <p>{pokemon.name}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
