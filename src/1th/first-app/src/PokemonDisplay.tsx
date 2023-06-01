// PokemonDisplay.tsx

// Move all the parts of PokemonContainer.tsx related to the PokemonDisplay component to this file.
import React from "react";

// It can be called from other components by adding "export".
// This is because the Pokemon interface is also used in PokemonContainer.
export interface Pokemon {
    name: string;
    imageUrl: string;
}

interface PokemonDisplayProps {
    pokemon: Pokemon | null;
}

function PokemonDisplay({pokemon}: PokemonDisplayProps ) {
    return (
        <div>
            {pokemon && (
        <div>
          <img src={pokemon.imageUrl} alt={pokemon.name} />
          {pokemon.imageUrl && <p>{pokemon.name}</p>}
        </div>
      )}
        </div>
    )
}

// It can be called from other components.
export default PokemonDisplay;
