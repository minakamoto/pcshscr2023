# 0. Introduction

This hands-on course is designed for beginners in modern web application development. The goal is not to learn knowledge from this material, but to get you interested in modern web application development and the skills and knowledge required for it through actual hands-on development experience.<br>
For this reason, we will not explain much about the programming language, tools, libraries, or code. Our priority is to give you the experience of developing a working WebApp as described.
Links to websites that can be used as references will be provided as necessary.

## What we make

Build a simple UI that calls an external API and displays that information on the screen.

## Main Technology Stack

- Javascript/Typescript
  - (TODO)TIPS:
    - Why Typescript was chosen for the hands-on for beginners, and why even JavaScript beginners should do Typescript.
- React

# 1. Setup

## Prerequisites

- Node.js 16 or above
- Code Editor (e.g., Visual Studio Code)

**Information**<br>
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
  sprites: {
    front_default: string,
  };
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
      setPokemon(response.data);
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
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          {pokemon.sprites.front_default && <p>{pokemon.name}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
```

- Note:
  - I wrote the explanation of the code in the comments of the code. It's okay if you don't understand the code description well for now.
- TIPS
  - Brief Description of Component
    - TODO:

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

- TIPS
  - Brief explanation of refactoring
    - TODO

## Apply design

TODO: Use the css library(e.g tailwind) to improve the design a bit.

## More SPA like

TODO: Apply Router?