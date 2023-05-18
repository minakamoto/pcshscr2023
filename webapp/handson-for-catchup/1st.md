# 0. Introduction

This hands-on course is designed for beginners in modern web application development. The goal is not to learn knowledge from this material, but to get you interested in modern web application development and the skills and knowledge required for it through actual hands-on development experience.

# 1. Setup

## Prerequisites
- Node.js 16+
- Code Editor (e.g., Visual Studio Code)

<p class="warn">**Warning** The required software installation instructions listed here are intended for Windows users who do not also use Powershell or WSL.
This is because the first target users of this hands-on are Windows users who do not use Powershell or WSL. Please follow the installation procedure for your environment when actually installing the software.</p>

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


# 2. Create UI


<p class="info">**Note** I originally intended to build the UI using only React, but I decided to introduce Vite to make it more fun.</p>