# Hands-on to develop simple & easy UI

## 0. Introduction

This hands-on course is designed for beginners in modern web application development. The goal is not to learn knowledge from this material, but to get you interested in modern web application development and the skills and knowledge required for it through actual hands-on development experience.  
For this reason, we will not explain much about the programming language, tools, libraries, or code. Our priority is to give you the experience of developing a working WebApp as described.
Links to websites that can be used as references will be provided as necessary.

### What we make

Build a simple UI that calls an external API and displays that information on the screen.

**Note**:  
The external API for this hands-on is [PokéAPI](https://pokeapi.co/). It is available at the time of this writing, but cannot compensate for its availability when doing hands-on sessions. In this case, please replace it with another API and implement it.

### Main Technology Stack

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)/[Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)

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
  - Why use Vite
    - Vite is a build tool that facilitates fast and efficient frontend development.
    - Vite provides a highly efficient and enjoyable developer experience by offering fast startup times, instant hot module replacement, and streamlined bundling and reloading, resulting in a smooth and productive development workflow.
      - (Initially, this hands-on was created using only React, but to make it more comfortable and fun, Vite was added.)

## 1. Setup

### Prerequisites

- Node.js 18+ or 20+
- Code Editor (Visual Studio Code)

**Note**:  
The required software installation instructions listed here are intended for Windows users who do not also use Powershell or WSL.
This is because the first target users of this hands-on are Windows users who do not use Powershell or WSL. Please follow the installation procedure for your environment when actually installing the software.

### Detailed procedure for windows users

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

## 2. Main Part(Create UI)

### Initialize a new React project

#### 1. Create a new React project using the create-vite command

First, start VSCode.  
From the `File` menu, select `Open Folder` and choose a directory (e.g. `Documents`) in you want to work.

If, after selecting a directory in which to work in, you get a dialog with the message `Do you trust the authors of the files in this folder?`, click `Yes, I trust the authors`.

Run `New Terminal` from the `Terminal` menu to start the terminal.  
Then run the following command to initialize a new React project using the Create Vite tool.  
**From now on, use the terminal on VSCode to execute the commands.**

```sh
npm create vite@latest first-app -- --template react-ts
```

When the message `OK to proceed? (y)` appears, enter `y`.

#### 2. Once the installation is finished, your project will be set up with the basic React+Vite template

run the following command start it up and check it out.

```sh
cd first-app
npm install
npm run dev
```

This command will start up the Node.js server and launch a new browser window displaying your app.

![React+Vite template](../../static/img/1th/vite_default.png)

You can use Ctrl + c to stop running the React+Vite app in your command line.

#### 3. Install the axios library for making HTTP requests

```sh
npm install axios
```

You can also open another terminal to run the above command without stopping running the React app.

### Create a component to display a random Pokemon

#### 1. Open the src/App.tsx file and replace its contents with the following code

```jsx
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
```

- **Note**:
  - I wrote the explanation of the code in the comments of the code. It's okay if you don't understand the code description well for now.
- TIPS:
  - About Component
    - A straightforward description of a React component is a reusable UI element.
    - The concept of components is a common concept in other modern UI frameworks and libraries such as Vue.js, Svelte, Angular, and so on.

#### 2. Open your browser and go to <http://localhost:5173> to see the application. Click the "Get Random Pokémon" button to fetch a random Pokémon from the PokeAPI and display its name and image

If you have stopped the app, you can run the following command.  
Make sure the current directory is directly under the React project you created.

```sh
npm run dev
```

![Random Pokemon initial display](../../static/img/1th/random_pokemon_initial_display.png)

- **Note**:
  - The template CSS is applied. We will apply a bit of design in a later step, so we leave it as is.

### Refactoring

When writing code, it's important to keep it organized and easy to read. Refactoring is the process of improving the structure of existing code without changing its behavior. This can make the code easier to understand, maintain, and extend in the future.

In our case, we started by writing the Pokémon image process and content directly into App.tsx. However, as the app becomes more complex, it is a good idea to extract it into its own file as a separate component to keep the code organized and modular.

- TIPS:
  - About refactoring of component
    - Componentizing individual parts of the code promotes reusability, separation of concerns, and maintainability. However, it comes with increased complexity and potential overhead. Deciding on the level of componentization depends on the size, complexity, and specific requirements of your application.

#### 1. Define everything related to the random image display process in App.tsx as a separate function in App.tsx

**Note**:  
Refactoring is performed once in the same file to make the code easier to follow.  
This step can be skipped for the next step.

##### Open the src/App.tsx file and replace its contents with the following code

```jsx
// App.tsx

import { useState } from "react";
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

##### Open your browser and check the application for any changes in behavior

#### 2. Separate PokemonContainer component from App.tsx

##### Create the src/PokemonContainer.tsx file and replace its contents with the following code

```jsx
// PokemonContainer.tsx

// Move all the parts of App.tsx related to the PokemonContainer component to this file.
import { useState } from "react";
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

##### Open the src/App.tsx file and replace its contents with the following code

```jsx
// App.tsx

// Removed import statements that are no longer needed
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

##### Open your browser and check the application for any changes in behavior

#### 3. Separate the processes related to the display of the image and the name from the PokemonContainer.tsx as a separate component

- **Note**:
  - This Refactoring is also performed once in the same file to make the code easier to follow.This step can be skipped for the next step.
  - Whether or not to refactor to this extent in an actual application should be determined by the size of the application, the complexity of the code, and whether or not components are reused.

##### Open the src/PokemonContainer.tsx file and replace its contents with the following code

```jsx
// PokemonContainer.tsx
import { useState } from "react";
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

##### Open your browser and check the application for any changes in behavior

#### 4. Separate PokemonDisplay component from PokemonContainer.tsx

##### Create the src/PokemonDisplay.tsx file and replace its contents with the following code

```jsx
// PokemonDisplay.tsx

// Move all the parts of PokemonContainer.tsx related to the PokemonDisplay component to this file.

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

##### Open the src/PokemonContainer.tsx file and replace its contents with the following code

```jsx
// PokemonContainer.tsx
import { useState } from "react";
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

##### Open your browser and check the application for any changes in behavior

#### 5. Rename the PokemonDisplay component to a generic name

The PokemonDisplay component can be used by other characters except for Pokémon, so we will make the name more generic.

##### Rename the file src/PokemonDisplay.tsx to src/ItemDisplay.tsx and change its contents to the following code

**Note:** After renaming the file, you will be asked if you want to change the import from VS Code. In this case, select No.

```jsx
// ItemDisplay.tsx

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

##### Open the src/PokemonContainer.tsx file and replace its contents with the following code

```jsx
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
    <div>
      <h1>Random Pokemon Image Generator</h1>
      <button onClick={handleClick}>Generate Image</button>
      <ItemDisplay item={pokemon} />
    </div>
  );
}

export default PokemonContainer;
```

##### Open your browser and check the application for any changes in behavior

### (Option)Apply design

We'll install a CSS library to make it look a little better.

- TIPS:
  - About CSS/Component library
    - In general, CSS libraries and component libraries serve different purposes in frontend development.
    - CSS libraries, like Tailwind CSS, provide pre-built styles and classes that can be used to style HTML elements.
    - Component libraries, like Bootstrap, provide pre-built UI components that can be used to create a consistent and professional-looking user interface.
    - The choice between the two depends on the project requirements, personal preferences, and the level of customization needed.

#### 1. Set up Tailwind CSS

##### Stop app

You can use Ctrl + c to stop running the React+Vite app in your command line.

If you get the message `Terminate batch job (Y/N)?` , type`Y` and press `Enter`.

##### Install Tailwind CSS

Make sure the current directory is directly under the React project you created, and run the following command:

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

##### Add the paths to all of your template files in your tailwind.config.js file

Open the src/tailwind.config.js file and replace its contents with the following code:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

##### Add the Tailwind directives to your CSS

Open src/index.css file and replace its contents with the following code:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 2. Apply CSS

##### Open the src/PokemonContainer.tsx file and replace its contents with the following code

```jsx
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
```

Below are the differences before and after setting CSS. For reference only.  
**Do not copy and paste the code.**  
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

##### Open the src/ItemDisplay.tsx file and replace its contents with the following code

```jsx
// ItemDisplay.tsx

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

Below are the differences before and after setting CSS. For reference only.  
**Do not copy and paste the code.**  
"-" means before, "+" means after

```jsx
-        <div>
-          <img src={item.imageUrl} alt={item.name} />
-          {item.imageUrl && <p>{item.name}</p>}
+        <div className="mt-4">
+          <img className="w-32 h-32 rounded-full mx-auto mb-2" src={item.imageUrl} alt={item.name} />
+          <p className="text-sm text-gray-500 text-center mt-2">{item.name}</p>
```

##### Run your build process with npm run dev

Make sure the current directory is directly under the React project you created, and run the following command:

```sh
npm run dev
```

##### Open a browser and see the application with the CSS applied

**Note**: The display changes to look like below

![Random Pokemon with CSS applied](../../static/img/1th/random_pokemon_with_css.png)

### (Option)More SPA like

Let's introduce the navbar and add a dog menu as well as Pokemon to make it a little more SPA-like.

#### 1. Set up react-router

##### Install react-router

Make sure the current directory is directly under the React project you created, and run the following command:

```sh
npm install react-router-dom
```

- TIPS:
  - About react-router, routing
    - React Router is a popular routing library for React applications.
      - Other libraries and frameworks have their own routing solutions. For example, Angular has Angular Router, Vue has Vue Router, and so on
    - Routing is a concept that applies to various libraries and frameworks beyond React.
      - In the context of web development, routing involves handling different URLs or paths and mapping them to specific components or actions within your application. It allows you to navigate between different views or pages and maintain the state of the application based on the current URL.

**NOTE:**
At the time of writing, the React route version is v6. If you install as described above, you should be able to use v6. If you install by specifying the version, note that the settings are different between v5 and v6.

#### 2. implementation of a navbar

The menu only has Pokémon for now, but we will introduce a navbar.

##### Open the src/App.tsx file and replace its contents with the following code

```jsx
// App.tsx
import PokemonContainer from "./PokemonContainer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-gray-200 p-4">
          <ul className="flex">
            <li className="mr-4">
              <Link to="/pokemon">Pokemon</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/pokemon" element={<PokemonContainer />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
```

##### Save the file, and open your browser and go to <http://localhost:5173> to see the application. Click "Pokemon" in the top navbar and make sure the "Get Random Pokemon" screen appears

![Implementation of a navbar](../../static/img/1th/implementation_navbar.png)

#### 3. Add dog menu

Add a menu that displays a random image of a dog as well as Pokémon.

##### Create the src/DogContainer.tsx file and replace its contents with the following code

In DogContainer.tsx, the dog image is retrieved randomly, similar to PokemonContainer.tsx.
The design is also the same.  
The refactored and componentized ItemDisplay.tsx is used in both DogContainer.tsx and PokemonContainer.tsx.

```jsx
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
```

##### Open the src/App.tsx file and replace its contents with the following code

```jsx
// App.tsx
import PokemonContainer from "./PokemonContainer";
import DogContainer from "./DogContainer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-gray-200 p-4">
          <ul className="flex">
            <li className="mr-4">
              <Link to="/pokemon">Pokemon</Link>
            </li>
            <li className="mr-4">
              <Link to="/dog">Dog</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/pokemon" element={<PokemonContainer />} />
          <Route path="/dog" element={<DogContainer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

##### Save the files, and open your browser and go to <http://localhost:5173> to see the application

"Dog" menu has been added to the navbar next to "Pokemon". Press the "Dog" menu to check that the screen can be displayed and processed in the same way as in "Pokemon".

## 3. Wrap up

This concludes the hands-on. Thank you for your hard work.The complete code is available [here](https://github.com/minakamoto/pcshscr2023/tree/main/src/webapp/handson-for-catchup/src/1th/first-app).  
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/minakamoto/pcshscr2023/tree/main/src/webapp/handson-for-catchup/src/1th/first-app)

There are many things that need to be fixed, such as the lack of a TOP screen and extremely poor design (The too-simple design is intentional!). Please try to improve this UI or add features with your ideas.

### Advice for those interested in frontend development

In my opinion, to improve your frontend technical skills on your own,

1. learn the basics of Javascript/Typescript, HTML, CSS
1. think of an application you want to make and try to develop it yourself
1. (If you can't think of an application you want to make) find a UI or application that you want to learn hands-on or copy from the web, imitate it, and implement it(Of course, copying is only for the purpose of studying.)
1. figure out what knowledge and skills you lack in 2. and/or 3. and dig deeper.

## 4. Links

- see [0th's Links](0th.md#3-links)
- Other well-known general sites
  - [freeCodeCamp](https://www.freecodecamp.org/)
  - [w3schools](https://www.w3schools.com/)
  - [scrimba](https://scrimba.com/)
- UI frameworks/libraries
  - If you want to study UI frameworks and libraries, try the tutorials on the official website of each framework or library first.
    - e.g.
      - [React tutorial](https://react.dev/learn/tutorial-tic-tac-toe)
      - [Svelte tutorial](https://svelte.dev/tutorial/basics)
