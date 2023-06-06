// DogContainer
import { useState } from "react";
import axios from "axios";
import ItemDisplay, { Item } from "./ItemDisplay";

function DogContainer() {
  const [dog, setDog] = useState<Item | null>(null);

  const handleClick = async () => {
    try {
      const response = await axios.get(
        "https://dog.ceo/api/breeds/image/random"
      );
      setDog({
        name: "dog image",
        imageUrl: response.data.message,
      });
    } catch (error) {
      console.error("Error fetching dog:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-start h-screen bg-gray-100 my-2">
        <h1 className="text-4xl font-bold mb-4">Random Dog Image Generator</h1>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={handleClick}
        >
          Generate Image
        </button>
        {dog && <ItemDisplay item={dog} />}
      </div>
    </div>
  );
}

export default DogContainer;
