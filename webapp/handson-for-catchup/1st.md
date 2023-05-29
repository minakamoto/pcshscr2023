# 0. Introduction

This hands-on course is designed for beginners in modern web application development. The goal is not to learn knowledge from this material, but to get you interested in modern web application development and the skills and knowledge required for it through actual hands-on development experience.<br>
For this reason, we will not explain much about the programming language, tools, libraries, or code. Our priority is to give you the experience of developing a working WebApp as described.
Links to websites that can be used as references will be provided as necessary.

## What we make

Build a simple UI that calls an external API and displays that information on the screen.

**Note**:<br>
The external API for this hands-on is [PokéAPI](https://pokeapi.co/). It is available at the time of this writing, but cannot compensate for its availability when doing hands-on sessions. In this case, please replace it with another API and implement it.

## Main Technology Stack

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)/[Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)

---
- TIPS:
  - Why Typescript was chosen for the hands-on for beginners, and why even JavaScript beginners should do Typescript.
    - There are several reasons why JavaScript beginners should learn TypeScript along with JavaScript.
      - TypeScript is a superset of JavaScript, so if you have knowledge of JavaScript, you can quickly learn TypeScript.
      - TypeScript is a statically typed language, so it is easier to detect errors than JavaScript. This can improve development efficiency and prevent bugs.
      - TypeScript can make code reuse easier by using type definition files. This can improve code maintainability.
    - In this way, TypeScript is a great language that has a low learning cost, improves development efficiency and maintainability, and is suitable for JavaScript beginners. Additionally, TypeScript is now the de facto standard in the development world.
    - If you are learning JavaScript, please also learn TypeScript.
  - UI frameworks/libraries
    - React is one of the UI frameworks/libraries. There are also [Vue.js](https://vuejs.org/), [Svelte](https://svelte.dev/), and [Angular](https://angular.io/).
    - Next.js, Nuxt.js, and SvelteKit are also UI frameworks/libraries. These are based on React, Vue, and Svelte, respectively, and package additional features such as SSR and convenient tools.

# 1. Setup

## Prerequisites

- Node.js 16 or above
- Code Editor (e.g., Visual Studio Code)

**Note**:<br>
The required software installation instructions listed here are intended for Windows users who do not also use Powershell or WSL.
This is because the first target users of this hands-on are Windows users who do not use Powershell or WSL. Please follow the installation procedure for your environment when actually installing the software.

## Detailed procedure for windows users

- Install Node.js
  - Go to [the Node.js website](https://nodejs.org/en/) and download the latest LTS(Long-Term Support) version of Node.js for Windows. Run the installer and follow the prompts to install Node.js on your system.
  - Open a command prompt and verify that Node.js and npm (Node Package Manager) are correctly installed by running the following commands:
  ```sh
  node --version
  npm --version
  ```
  - Both commands should display the respective versions installed on your system.
- Install Visual Studio Code(VS Code)
  - Go to [the Visual Studio Code website](https://code.visualstudio.com/) and download the latest version of Visual Studio Code for Windows. Run the installer and follow the prompts to install Visual Studio Code on your system.
- Install VS Code Extensions
  - Once you have installed Visual Studio Code, you'd better to install the following extensions to enhance your web app development experience:
  - Launch Visual Studio Code.
  - Open the Extensions sidebar by clicking on the square icon on the left sidebar or pressing Ctrl+Shift+X.
  - Search for the following extensions and click the "Install" button next to each extension:
    - ESLint
    - Prettier
    - ES7 React/Redux/GraphQL
    - JavaScript (ES6) code snippets
    - **Please note that technology is constantly evolving and this information may become outdated at any time.**
- (Option)Enable auto-formatting in VSCode
  - **Note**: You can use Prettier to automatically format files when saving to VSCode. It does the annoying formatting automatically.
  - Change the "Default Formatter"("defaultFormatter") setting
    - Open the VSCode settings (File > Preferences > Settings) or use the shortcut (Ctrl+,).
    - In the settings, search for "Default Formatter" or "defaultformatter" and select "Prettier - Code formatter" as the default formatter.
  - Change the "Editor: Format On Save" setting
    - Open the VSCode settings (File > Preferences > Settings) or use the shortcut (Ctrl+,).
    - In the settings, search for "Editor: Format On Save" or "save" and enable "Editor: Format On Save" option. This option automatically formats the code when you save the file.
  - You can configure Prettier to format your code according to your own preferences. [Please click here for more information.](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

# 2. Main Part(Create UI)

## Initialize a new React project

### 1. Create a new React project using the create-react-app command

run the following command to initialize a new React project using the Create React App tool:

```sh
npx create-react-app first-app --template typescript
```

### 2. Wait for the installation to complete. This may take a few minutes.

### 3. Once the installation is finished, your project will be set up with the basic React template.

run the following command start it up and check it out.

```sh
cd first-app
npm start
```

This command will start up the Node.js server and launch a new browser window displaying your app.

You can use Ctrl + c to stop running the React app in your command line.

### 4. Install the axios library for making HTTP requests:

```sh
npm install axios
```

## Create a component to display a random Pokemon

### 1. Open the src/App.tsx file and replace its contents with the following code:

```jsx
import React, { useState } from "react";
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
```
- **Note**:
  - I wrote the explanation of the code in the comments of the code. It's okay if you don't understand the code description well for now.
- TIPS:
  - About Component
    - A straightforward description of a React component is a reusable UI element.
    - The concept of components is a common concept in other modern UI frameworks and libraries such as Vue.js, Svelte, Angular, and so on.

### 2. Save the file, and start the development server by running the command npm start in your terminal.

Make sure the current directory is directly under the React project you created, and run the following command
```sh
npm start
```

### 3. Open your browser and go to http://localhost:3000 to see the application. Click the "Get Random Pokémon" button to fetch a random Pokémon from the PokeAPI and display its name and image.

You can use Ctrl + c to stop running the React app in your command line.

## Refactoring

When writing code, it's important to keep it organized and easy to read. Refactoring is the process of improving the structure of existing code without changing its behavior. This can make the code easier to understand, maintain, and extend in the future.

In our case, we started by writing the Pokémon image process and content directly into App.tsx. However, as the app becomes more complex, it is a good idea to extract it into its own file as a separate component to keep the code organized and modular.

- TIPS:
  - About refactoring of component
    - Componentizing individual parts of the code promotes reusability, separation of concerns, and maintainability. However, it comes with increased complexity and potential overhead. Deciding on the level of componentization depends on the size, complexity, and specific requirements of your application.

### 1. Define everything related to the random image display process in App.tsx as a separate function in App.tsx.

**Note**:<br>
Refactoring is performed once in the same file to make the code easier to follow.<br>
This step can be skipped for the next step.

#### Open the src/App.tsx file and replace its contents with the following code:

```jsx
// App.tsx

import React, { useState } from "react";
import axios from "axios";

// Define PokemonContainer component
// Everything that is related to the processing of the random image display in App.tsx is defined in this component.
function PokemonContainer() {
  interface Pokemon {
    name: string;
    imageUrl: string;
  }

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  
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

// use the PokemonContainer component
function App() {
  return (
    <div>
      <PokemonContainer />
    </div>
  );
}

export default App;
```

#### Open your browser and check the application for any changes in behavior.

### 2. Separate PokemonContainer component from App.tsx

#### Create the src/PokemonContainer.tsx file and replace its contents with the following code:

```jsx
// PokemonContainer.tsx

// Move all the parts of App.tsx related to the PokemonContainer component to this file.
import React, { useState } from "react";
import axios from "axios";

function PokemonContainer() {
  interface Pokemon {
    name: string;
    imageUrl: string;
  }
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  
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

// It can be called from other components.
export default PokemonContainer;
```

#### Open the src/App.tsx file and replace its contents with the following code:

```jsx
// App.tsx

// Removed import statements that are no longer needed
import React from "react";
// PokemonContainer component is imported for use in App.tsx
import PokemonContainer from "./PokemonContainer";

function App() {
  return (
    <div>
      <PokemonContainer />
    </div>
  );
}

export default App;
```

#### Open your browser and check the application for any changes in behavior.

### 3. Separate the processes related to the display of the image and the name from the PokemonContainer.tsx as a separate component.

- **Note**:
  - This Refactoring is also performed once in the same file to make the code easier to follow.This step can be skipped for the next step.
  - Whether or not to refactor to this extent in an actual application should be determined by the size of the application, the complexity of the code, and whether or not components are reused.

#### Open the src/PokemonContainer.tsx file and replace its contents with the following code:

```jsx
// PokemonContainer.tsx
import React, { useState } from "react";
import axios from "axios";

interface Pokemon {
    name: string;
    imageUrl: string;
}

// Define the PokemonDisplayProps interface. These are the props to pass to the PokemonDisplay component.
interface PokemonDisplayProps {
    pokemon: Pokemon | null;
}

// Define PokemonDisplay component.
// Extract the processing related to displaying the Pokemon image and name from the PokemonContainer component and define it in this component.
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

function PokemonContainer() {
  
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  
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

  // use the PokemonDisplay component
  return (
    <div>
      <h1>Random Pokemon Image Generator</h1>
      <button onClick={handleClick}>Generate Image</button>
      <PokemonDisplay pokemon={pokemon} />
    </div>
  );
}

export default PokemonContainer;
```

#### Open your browser and check the application for any changes in behavior.

### 4. Separate PokemonDisplay component from PokemonContainer.tsx

#### Create the src/PokemonDisplay.tsx file and replace its contents with the following code:

```jsx
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
```

#### Open the src/PokemonContainer.tsx file and replace its contents with the following code:

```jsx
// PokemonContainer.tsx
import React, { useState } from "react";
import axios from "axios";
import PokemonDisplay, { Pokemon } from "./PokemonDisplay";

function PokemonContainer() {
  
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  
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
    <div>
      <h1>Random Pokemon Image Generator</h1>
      <button onClick={handleClick}>Generate Image</button>
      <PokemonDisplay pokemon={pokemon} />
    </div>
  );
}

export default PokemonContainer;
```

#### Open your browser and check the application for any changes in behavior.

### 5. Rename the PokemonDisplay component to a generic name


The PokemonDisplay component can be used by other characters except for Pokémon, so we will make the name more generic.

#### Rename the file src/PokemonDisplay.tx to src/ItemDisplay.tx and change its contents to the following code:

```jsx
// ItemDisplay.tsx

import React from "react";

export interface Item {
    name: string;
    imageUrl: string;
}

interface ItemDisplayProps {
    item: Item | null;
}

function ItemDisplay({ item }: ItemDisplayProps) {
  return (
    <div>
      {item && (
        <div>
          <img src={item.imageUrl} alt={item.name} />
          {item.imageUrl && <p>{item.name}</p>}
        </div>
      )}
    </div>
  );
}


export default ItemDisplay;
```

#### Open the src/PokemonContainer.tsx file and replace its contents with the following code:

```jsx
// PokemonContainer.tsx
import React, { useState } from "react";
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
    <div>
      <h1>Random Pokemon Image Generator</h1>
      <button onClick={handleClick}>Generate Image</button>
      <ItemDisplay item={pokemon} />
    </div>
  );
}

export default PokemonContainer;
```

#### Open your browser and check the application for any changes in behavior.

## Apply design

We'll install a CSS library to make it look a little better.

- TIPS:
  - About CSS/Component library
    - In general, CSS libraries and component libraries serve different purposes in frontend development.
    - CSS libraries, like Tailwind CSS, provide pre-built styles and classes that can be used to style HTML elements.
    - Component libraries, like Bootstrap, provide pre-built UI components that can be used to create a consistent and professional-looking user interface. 
    - The choice between the two depends on the project requirements, personal preferences, and the level of customization needed.

### 1. Set up Tailwind CSS

#### Install Tailwind CSS

Make sure the current directory is directly under the React project you created, and run the following command:

```sh
npm install -D tailwindcss
npx tailwindcss init
```

#### Add the paths to all of your template files in your tailwind.config.js file.

Open the src/tailwind.config.js file and replace its contents with the following code:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### Add the Tailwind directives to your CSS

Open src/index.css file and Add the following code to the top of the file:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Run your build process with npm run start.

Make sure the current directory is directly under the React project you created, and run the following command:

```sh
npm start
```

**Note:** If you haven't stopped the process, use Ctrl + c to stop running

### 2. Apply CSS

#### Open the src/PokemonContainer.tsx file and replace its contents with the following code:

```jsx
// PokemonContainer.tsx
import React, { useState } from "react";
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
```

Below are the differences before and after setting CSS. For reference only.<br>
Do not copy and paste the code.<br>
"-" means before, "+" means after

```jsx
-    <div>
-      <h1>Random Pokemon Image Generator</h1>
-      <button onClick={handleClick}>Generate Image</button
-      <ItemDisplay item={pokemon} />
+    <div className="flex flex-col items-center justify-start h-screen bg-gray-100 my-2">
+      <h1 className="text-4xl font-bold mb-4">Random Pokemon Image Generator</h1>
+      <button
+        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
+        onClick={handleClick}
+      >
+        Generate Image
+      </button>
+      {pokemon && <ItemDisplay item={pokemon} />}
```

#### Open the src/ItemDisplay.tsx file and replace its contents with the following code:

```jsx
// ItemDisplay.tsx

import React from "react";

export interface Item {
    name: string;
    imageUrl: string;
}

interface ItemDisplayProps {
    item: Item | null;
}

function ItemDisplay({ item }: ItemDisplayProps) {
  return (
    <div>
      {item && (
        <div className="mt-4">
          <img className="w-32 h-32 rounded-full mx-auto mb-2" src={item.imageUrl} alt={item.name} />
          <p className="text-sm text-gray-500 text-center mt-2">{item.name}</p>
        </div>
      )}
    </div>
  );
}

export default ItemDisplay;
```

Below are the differences before and after setting CSS. For reference only.<br>
Do not copy and paste the code.<br>
"-" means before, "+" means after

```jsx
-        <div>
-          <img src={item.imageUrl} alt={item.name} />
-          {item.imageUrl && <p>{item.name}</p>}
+        <div className="mt-4">
+          <img className="w-32 h-32 rounded-full mx-auto mb-2" src={item.imageUrl} alt={item.name} />
+          <p className="text-sm text-gray-500 text-center mt-2">{item.name}</p>
```

## More SPA like

TODO: Apply Router?