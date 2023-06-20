// PokemonContainer.tsx
import { useState } from "react";
import axios from "axios";
import ItemDisplay, { Item } from "./ItemDisplay";

function PokemonContainer() {
  
  const [pokemon, setPokemon] = useState<Item | null>(null);
  
  const handleClick = async () => {
    try {
      const randomId = Math.floor(Math.random() * 1000) + 1;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      setPokemon({
        name: response.data.name,
        imageUrl: response.data.sprites.front_default,
      });
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-100 my-2">
      <h1 className="text-4xl font-bold mb-4">Random Pokemon Image Generator</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={handleClick}
      >
        Generate Image
      </button>
      {pokemon && <ItemDisplay item={pokemon} />}
    </div>
  );
}

export default PokemonContainer;
