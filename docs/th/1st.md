# ภาคปฏิบัติ(hands-on)เพื่อพัฒนา UI ที่ง่ายและสะดวก

## 0. บทนำ

คอร์ส hands-on นี้ถูกออกแบบมาสำหรับผู้เริ่มต้นในการพัฒนาเว็บแอปพลิเคชันสมัยใหม่ จุดมุ่งหมายไม่ใช่เพื่อเรียนรู้ความรู้จากเนื้อหานี้ แต่เพื่อให้คุณสนใจในการพัฒนาเว็บแอปพลิเคชันสมัยใหม่และทักษะและความรู้ที่จำเป็นสำหรับการพัฒนาด้วยประสบการณ์การพัฒนา
ดังนั้น เราจะไม่อธิบายมากเกี่ยวกับภาษาโปรแกรม tools libraries หรือ โค้ด ลำดับความสำคัญของเราคือการให้คุณได้สัมผัสประสบการณ์ในการพัฒนาเว็บแอปพลิเคชันใช้งานได้ตามที่อธิบายไว้
ลิงค์ไปยังเว็บไซต์ที่สามารถใช้เป็นข้อมูลอ้างอิงจะมีให้ตามความจำเป็น

### สิ่งที่เราจะสร้าง

สร้าง UI อย่างง่ายที่เรียกใช้ API ภายนอกและแสดงข้อมูลนั้นบนหน้าจอ

**หมายเหตุ**:
API ภายนอกสำหรับ hands-on นี้ คือ [PokéAPI](https://pokeapi.co/)  API นี้สามารถใช้งานได้ในขณะที่เขียนข้อความนี้ แต่ไม่สามารถรับประกันความพร้อมใช้งานของ API เมื่อทำ hands-on ในกรณีนี้ กรุณาแทนที่ด้วย API อื่นและนำไปใช้

### สแต็คเทคโนโลยีหลัก

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)/[Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)

---
- คำแนะนำ:
  - เหตุผลที่ Typescript ถูกเลือกสำหรับ hands-on และเหตุผลที่ผู้เริ่มต้น JavaScript ควรเรียนรู้ Typescript
    - มีหลายเหตุผลที่ผู้เริ่มต้น JavaScript ควรเรียนรู้ Typescript พร้อมกับ JavaScript
      - Typescript เป็น superset ของ JavaScript ดังนั้นหากคุณมีความรู้เกี่ยวกับ JavaScript คุณสามารถเรียนรู้ Typescript ได้โดยรวดเร็ว
      - Typescript เป็นภาษาที่มีการกำหนดชนิดแบบ statically ทำให้ง่ายต่อการตรวจสอบข้อผิดพลาดเมื่อเทียบกับ JavaScript ซึ่งสามารถเพิ่มประสิทธิภาพในการพัฒนาและป้องกันข้อบกพร่องได้
      - Typescript สามารถทำให้โค้ดใช้ซ้ำง่ายขึ้นด้วยการใช้ไฟล์นิยามชนิด (type definition) ซึ่งสามารถเพิ่มประสิทธิภาพในการบำรุงรักษาโค้ดได้
    - ดังนั้น Typescript เป็นภาษาที่ดีที่มีต้นทุนการเรียนรู้ต่ำ ช่วยเพิ่มประสิทธิภาพในการพัฒนาและการบำรุงรักษาโค้ด และเหมาะสำหรับผู้เริ่มต้น JavaScript อีกทั้งในปัจจุบัน TypeScript ยังเป็นมาตรฐานโดยพฤตินัยในโลกของการพัฒนา
    - หากคุณกำลังเรียนรู้ JavaScript โปรดเรียนรู้ Typescript ด้วย
  - frameworks/libraries สำหรับ UI
    - React เป็นหนึ่งใน frameworks/libraries สำหรับสร้าง UI ยังมี [Vue.js](https://vuejs.org/), [Svelte](https://svelte.dev/), และ [Angular](https://angular.io/) อีกด้วย
    - นอกจากนี้ยังมี Next.js, Nuxt.js, และ SvelteKit เป็น frameworks/libraries สำหรับสร้าง UI โดย frameworks เหล่านี้สร้างบน React, Vue, และ Svelte ตามลำดับและให้คุณสามารถใช้คุณสมบัติเพิ่มเติม เช่น SSR และ tools ที่สะดวก
  - เหตุผลในการใช้ Vite
    - Vite เป็น build tool ที่ให้ความสะดวกในการพัฒนา frontend รวดเร็วและมีประสิทธิภาพ
    - Vite มอบประสบการณ์นักพัฒนาที่มีประสิทธิภาพสูงและสนุกสนานโดยให้เวลาเริ่มต้นที่รวดเร็ว การเปลี่ยน module ด่วนทันที และการรวมและการโหลดซ้ำที่คล่องตัว ส่งผลให้ workflow การพัฒนาราบรื่นและมีประสิทธิภาพ
      - (ในตอนแรก hands-on นี้สร้างขึ้นโดยใช้ React เท่านั้น แต่เพิ่ม Vite เพื่อให้สะดวกและสนุกยิ่งขึ้น)

## 1. การตั้งค่า

### ข้อกำหนดเบื้องต้น

- Node.js 16 หรือสูงกว่า
- Code Editor (เช่น Visual Studio Code)

**หมายเหตุ**:  
คำแนะนำในการติดตั้งซอฟต์แวร์ที่จำเป็นซึ่งระบุไว้ที่นี่มีไว้สำหรับผู้ใช้ Windows ที่ไม่ได้ใช้ Powershell หรือ WSL  
เนื่องจากผู้ใช้เป้าหมายรายแรกของ hands-on นี้คือผู้ใช้ Windows ที่ไม่ได้ใช้ Powershell หรือ WSL  
โปรดทำตามขั้นตอนการติดตั้งซอฟต์แวร์สำหรับสภาพแวดล้อมของคุณเมื่อติดตั้งซอฟต์แวร์จริง


### ขั้นตอนโดยละเอียดสำหรับผู้ใช้ windows

- ติดตั้ง Node.js
  - ไปที่[เว็บไซต์ Node.js](https://nodejs.org/en/) และดาวน์โหลด LTS (Long-Term Support) ล่าสุดของ Node.js สำหรับ Windows เรียกใช้ตัวติดตั้งและปฏิบัติตามคำแนะนำในการติดตั้ง Node.js ในระบบของคุณ
  - เปิด command prompt และยืนยันว่า Node.js และ npm (Node Package Manager) ติดตั้งถูกต้องโดยเรียกใช้คำสั่งต่อไปนี้:
  ```sh
  node --version
  npm --version
  ```
  - ทั้งสองคำสั่งควรแสดง version ที่ติดตั้งบนระบบของคุณ
- ติดตั้ง Visual Studio Code (VS Code)
  - ไปที่ [เว็บไซต์ Visual Studio Code](https://code.visualstudio.com/) และดาวน์โหลดเวอร์ชันล่าสุดของ Visual Studio Code สำหรับ Windows เรียกใช้ตัวติดตั้งและปฏิบัติตามคำแนะนำในการติดตั้ง Visual Studio Code ในระบบของคุณ
- ติดตั้งส่วนขยาย VS Code
  - เมื่อคุณได้ติดตั้ง Visual Studio Code เสร็จแล้ว คุณควรติดตั้งส่วนขยายต่อไปนี้เพื่อเพิ่มประสบการณ์ในการพัฒนาเว็บแอปของคุณ:
  - เปิด Visual Studio Code
  - เปิดแถบส่วนขยายโดยคลิกที่ไอคอนสี่เหลี่ยมด้านซ้ายหรือกดปุ่ม Ctrl+Shift+X
  - ค้นหาส่วนขยายต่อไปนี้และคลิกปุ่ม "Install" ถัดจากแต่ละส่วนขยาย:
    - ESLint
    - Prettier
    - ES7 React/Redux/GraphQL
    - JavaScript (ES6) code snippets
    - **โปรดทราบว่าเทคโนโลยีมีการพัฒนาอย่างต่อเนื่อง และข้อมูลเหล่านี้อาจล้าสมัยได้ทุกเมื่อ**
- (ตัวเลือก) เปิดใช้งาน auto-formatting ใน VSCode
  - **หมายเหตุ**: คุณสามารถใช้ Prettier เพื่อจัดรูปแบบไฟล์โดยอัตโนมัติเมื่อบันทึกใน VSCode มันจะทำการจัดรูปแบบที่น่ารำคาญโดยอัตโนมัติ
  - เปลี่ยนการตั้งค่า "Default Formatter"("defaultFormatter")
    - เปิดการตั้งค่า VSCode (File > Preferences > Settings) หรือใช้ทางลัด (Ctrl+,)
    - ในการตั้งค่า ค้นหา "Default Formatter" หรือ "defaultformatter" และเลือก "Prettier - Code formatter" เป็นตัวจัดรูปแบบเริ่มต้น
  - เปลี่ยนการตั้งค่า "Editor: Format On Save"
    - เปิดการตั้งค่า VSCode (File > Preferences > Settings) หรือใช้ทางลัด (Ctrl+,)
    - ในการตั้งค่า ค้นหา "Editor: Format On Save" หรือ "save" และเปิดใช้งาน "Editor: Format On Save" ตัวเลือกนี้จะจัดรูปแบบโค้ดโดยอัตโนมัติเมื่อคุณบันทึกไฟล์
  - คุณสามารถกำหนดค่า Prettier เพื่อจัดรูปแบบโค้ดตามความต้องการของคุณเอง [โปรดคลิกที่นี่เพื่อดูข้อมูลเพิ่มเติม](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## 2. ส่วนหลัก (สร้าง UI)

### เริ่มต้นโปรเจกต์ React ใหม่

#### 1. สร้างโปรเจกต์ React ใหม่โดยใช้คำสั่ง create-vite

เรียกใช้คำสั่งต่อไปนี้เพื่อเริ่มต้นโครงการ React ใหม่โดยใช้ Create Vite tool:

``` sh
npm create vite@latest first-app -- --template react-ts
```

#### 2. เมื่อการติดตั้งเสร็จสิ้น โปรเจกต์ของคุณจะถูกตั้งค่าด้วยพื้นฐาน React+Vite template

ปฏิบัติคำสั่งต่อไปนี้เพื่อเริ่มต้นและตรวจสอบออก

``` sh
cd first-app
npm install
npm run dev
```

คำสั่งนี้จะเริ่มต้นเซิร์ฟเวอร์ Node.js และเปิดหน้าต่างเบราว์เซอร์ใหม่เพื่อแสดงแอปของคุณ

![React+Vite template](../public/img/1th/vite_default.png)

คุณสามารถใช้ Ctrl + c เพื่อหยุดการทำงานของแอป React+Vite ใน command line ของคุณ

#### 3. ติดตั้ง axios library เพื่อทำ HTTP requests:

```sh
npm install axios
```

คุณยังสามารถเปิด terminal อื่นเพื่อปฏิบัติคำสั่งด้านบนโดยไม่ต้องหยุดแอป React

### สร้าง component เพื่อแสดง Pokemon แบบสุ่ม

#### 1. เปิดไฟล์ src/App.tsx และแทนที่เนื้อหาด้วยโค้ดต่อไปนี้:

```jsx
import { useState } from "react";
import axios from "axios";

// กำหนดของ Pokemon Interface ซึ่งอธิบายโครงสร้างของ Pokemon object ที่ได้รับจาก API
interface Pokemon {
  name: string;
  imageUrl: string;
}

function App() {
  // กำหนดตัวแปรสถานะ pokemon โดยใช้ useState hook
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  
  // กำหนดฟังก์ชัน handleClick ที่เรียกใช้เมื่อคลิกปุ่ม "Generate Image"
  const handleClick = async () => {
    try {
      // สร้าง Pokemon ID แบบสุ่มจาก 1~1000 เนื่องจากในปัจจุบันมี Pokémon ประมาณ 1000 ตัว
      const randomId = Math.floor(Math.random() * 1000) + 1;
      // ใช้ axios library เพื่อทำ GET request ไปยัง API ภายนอกที่ส่งคืนข้อมูล Pokemon สำหรับ ID นั้น
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      // ข้อมูลตอบกลับจะถูกเก็บไว้ในตัวแปรสถานะ pokemon โดยใช้ฟังก์ชัน setPokemon
      setPokemon({
        name: response.data.name,
        imageUrl: response.data.sprites.front_default,
      });
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  // UI ของแอปประกอบด้วยส่วนหัว ปุ่ม "Generate Image" และรูปภาพและชื่อ Pokemon (ถ้ามี) ที่แสดงเมื่อคลิกปุ่ม
  // ตัวแปรสถานะ pokemon ถูกใช้เพื่อแสดงภาพและชื่อ pokemon แบบมีเงื่อนไขโดยใช้ตัวดำเนินการ && หาก pokemon ไม่เป็น null ภาพและชื่อจะแสดงโดยใช้องค์ประกอบ img และ p
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

- **หมายเหตุ**:
  - ฉันได้เขียนคำอธิบายของโค้ดในคอมเมนต์ในโค้ดไม่เป็นไรถ้าคุณยังไม่เข้าใจคำอธิบายของโค้ดได้ดีในขณะนี้
- คำแนะนำ:
  - เกี่ยวกับ Component
    - คำอธิบายอย่างตรงไปตรงมาของ React Component คือองค์ประกอบ UI ที่นำมาใช้ซ้ำได้
    - แนวคิดของ component เป็นแนวคิดทั่วไปใน frameworks และ libraries UI สมัยใหม่อื่นๆ เช่น Vue.js, Svelte, Angular เป็นต้น

#### 2. เปิดเบราว์เซอร์และไปที่ http://localhost:5173 เพื่อดูแอปพลิเคชัน คลิกที่ปุ่ม "Get Random Pokémon" เพื่อดึงข้อมูล Pokemon สุ่มจาก PokeAPI และแสดงชื่อและรูปภาพของ  Pokemon

หากคุณหยุดแอปไปแล้ว คุณสามารถเรียกใช้คำสั่งต่อไปนี้ได้  
ตรวจสอบให้แน่ใจว่าไดเร็กทอรีปัจจุบันอยู่ภายใต้โปรเจ็กต์ React ที่คุณสร้างขึ้นโดยตรง

```sh
npm run dev
```

![Random Pokemon initial display](../public/img/1th/random_pokemon_initial_display.png)

- **หมายเหตุ**:
  - ได้ปรับใช้ CSS ของเทมเพลตแล้ว เราจะปรับใช้การออกแบบเล็กน้อยในขั้นตอนต่อไป ดังนั้นเราจะปล่อยไว้ตามที่เป็นอยู่

### การ Refactoring

เมื่อเขียนโค้ด สิ่งสำคัญคือต้องจัดระเบียบและอ่านง่าย การ Refactoring คือกระบวนการปรับปรุงโครงสร้างของโค้ดที่มีอยู่โดยไม่เปลี่ยนลักษณะการทำงาน ซึ่งจะทำให้โค้ดง่ายต่อการเข้าใจ บำรุงรักษา และต่อยอดในอนาคต

ในกรณีของเรา เราเริ่มต้นด้วยการเขียนกระบวนการแสดงรูปภาพและเนื้อหาของ Pokemon โดยตรงในไฟล์ App.tsx อย่างไรก็ตาม เมื่อแอปพลิเคชันเริ่มซับซ้อนมากขึ้น เป็นความคิดที่ดีที่จะแยกมันออกเป็นไฟล์ของตัวเองในรูปแบบของ component เพื่อให้โค้ดเป็นระเบียบและเป็นโมดูล

- คำแนะนำ:
    - เกี่ยวกับการ Refactoring ของ component
      - การแยกส่วนรายละเอียดของโค้ดเป็นคอมโพเนนต์สนับสนุนการใช้ซ้ำ การแยกงาน และการบำรุงรักษา อย่างไรก็ตาม การแยกส่วนนี้อาจมีความซับซ้อนและภาระการทำงานเพิ่มขึ้น การตัดสินใจว่าจะแยกส่วนอย่างไรขึ้นอยู่กับขนาด ความซับซ้อน และความต้องการเฉพาะของแอปพลิเคชันของคุณ

#### 1. นิยามทุกอย่างที่เกี่ยวข้องกับกระบวนการแสดงรูปภาพแบบสุ่มในไฟล์ App.tsx เป็นฟังก์ชันแยกต่างหากในไฟล์ App.tsx

- **หมายเหตุ**:  
การ Refactoring ถูกทำครั้งเดียวในไฟล์เดียวเพื่อทำให้โค้ดง่ายต่อการติดตาม  
ขั้นตอนนี้สามารถข้ามไปยังขั้นตอนถัดไปได้

#### เปิดไฟล์ src/App.tsx และแทนที่เนื้อหาด้วยโค้ดต่อไปนี้:

```jsx
// App.tsx

import { useState } from "react";
import axios from "axios";

// นิยาม PokemonContainer component
// ทุกสิ่งที่เกี่ยวข้องกับกระบวนการแสดงรูปภาพแบบสุ่มในไฟล์ App.tsx ถูกนิยามใน component นี้
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

// ใช้ PokemonContainer component
function App() {
  return (
    <div>
      <PokemonContainer />
    </div>
  );
}

export default App;
```

##### เปิดเบราว์เซอร์ของคุณและตรวจสอบแอปพลิเคชันว่ามีการเปลี่ยนแปลงในพฤติกรรมหรือไม่

#### 2. แยก PokemonContainer component จาก App.tsx

##### สร้างไฟล์ src/PokemonContainer.tsx และแทนที่เนื้อหาด้วยโค้ดต่อไปนี้:

```jsx
// PokemonContainer.tsx

// ย้ายทุกส่วนที่เกี่ยวข้องกับ PokemonContainer  component ใน App.tsx ไปยังไฟล์นี้
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

// สามารถเรียกใช้จาก component อื่นได้
export default PokemonContainer;
```

#### เปิดไฟล์ src/App.tsx และแทนที่เนื้อหาด้วยโค้ดต่อไปนี้:

```jsx
// App.tsx

// ลบคำสั่ง import ที่ไม่จำเป็นอีกต่อไป
// PokemonContainer component ถูกนำเข้าเพื่อใช้ใน App.tsx
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

##### เปิดเบราว์เซอร์ของคุณและตรวจสอบแอปพลิเคชันว่ามีการเปลี่ยนแปลงในพฤติกรรมหรือไม่

#### 3. แยกกระบวนการที่เกี่ยวข้องกับการแสดงภาพและชื่อออกจาก PokemonContainer.tsx เป็น component ที่แยกต่างหาก

- **หมายเหตุ**:
  - การ Refactoring นี้ยังดำเนินการครั้งเดียวในไฟล์เดียวกันเพื่อให้โค้ดติดตามได้ง่ายขึ้น ขั้นตอนนี้สามารถข้ามไปยังขั้นตอนถัดไปได้
  - ว่าจะ Refactoring ถึงขั้นนี้ในแอปพลิเคชันจริงควรพิจารณาจากขนาดของแอปพลิเคชัน ความซับซ้อนของโค้ด และว่าคอมโพเนนต์มีการใช้ซ้ำหรือไม่

##### เปิดไฟล์ src/PokemonContainer.tsx และแทนที่เนื้อหาด้วยโค้ดต่อไปนี้:

```jsx
// PokemonContainer.tsx
import { useState } from "react";
import axios from "axios";

interface Pokemon {
    name: string;
    imageUrl: string;
}

// กำหนด interface ของ PokemonDisplayProps ซึ่งเป็น props ที่จะส่งให้กับคอมโพเนนต์ PokemonDisplay
interface PokemonDisplayProps {
    pokemon: Pokemon | null;
}

// กำหนดคอมโพเนนต์ PokemonDisplay
// แยกการประมวลผลที่เกี่ยวข้องกับการแสดงรูปภาพและชื่อของ Pokemon จากคอมโพเนนต์ PokemonContainer และนิยามในคอมโพเนนต์นี้
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

  // ใช้คอมโพเนนต์ PokemonDisplay
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

##### เปิดเบราว์เซอร์ของคุณและตรวจสอบแอปพลิเคชันว่ามีการเปลี่ยนแปลงในพฤติกรรมหรือไม่

#### 4. แยกคอมโพเนนต์ PokemonDisplay จาก PokemonContainer.tsx

##### สร้างไฟล์ src/PokemonDisplay.tsx และแทนที่เนื้อหาด้วยรหัสต่อไปนี้:

```jsx
// PokemonDisplay.tsx

// ย้ายทุกส่วนของ PokemonContainer.tsx ที่เกี่ยวข้องกับคอมโพเนนต์ PokemonDisplay ไปยังไฟล์นี้

// สามารถเรียกใช้จากคอมโพเนนต์อื่นได้โดยเพิ่ม "export"
// นี่เป็นเพราะว่า interface ของ Pokemon ใช้ใน PokemonContainer ด้วย
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

// สามารถเรียกใช้จาก component อื่นได้
export default PokemonDisplay;
```

##### เปิดไฟล์ src/PokemonContainer.tsx และแทนที่เนื้อหาด้วยโค้ดต่อไปนี้:

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

##### เปิดเบราว์เซอร์ของคุณและตรวจสอบแอปพลิเคชันว่ามีการเปลี่ยนแปลงในพฤติกรรมหรือไม่

#### 5. เปลี่ยนชื่อคอมโพเนนต์ PokemonDisplay เป็นชื่อทั่วไป

คอมโพเนนต์ PokemonDisplay สามารถใช้ได้กับตัวละครอื่นๆนอกเหนือจาก Pokémon ดังนั้นเราจะเปลี่ยนชื่อให้เป็นชื่อทั่วไปมากขึ้น

##### เปลี่ยนชื่อไฟล์ src/PokemonDisplay.tsx เป็น src/ItemDisplay.tsx และเปลี่ยนเนื้อหาในไฟล์เป็นโค้ดต่อไปนี้:

**หมายเหตุ:** หลังจากเปลี่ยนชื่อไฟล์แล้ว คุณจะถูกถามว่าต้องการเปลี่ยนการนำเข้า (import) จาก VS Code หรือไม่ ในกรณีนี้ เลือก ไม่

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

##### เปิดไฟล์ src/PokemonContainer.tsx และแทนที่เนื้อหาด้วยโค้ดต่อไปนี้:


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

##### เปิดเบราว์เซอร์ของคุณและตรวจสอบแอปพลิเคชันว่ามีการเปลี่ยนแปลงในพฤติกรรมหรือไม่

### (ตัวเลือก) ปรับใช้งานดีไซน์

เราจะติดตั้ง CSS library เพื่อทำให้ดูดีขึ้นเล็กน้อย

- คำแนะนำ:
  - เกี่ยวกับ CSS/Component library
    - โดยทั่วไป CSS libraries และ component libraries มีจุดประสงค์ที่แตกต่างกันในการพัฒนา frontend
    - CSS libraries เช่น Tailwind CSS จัดเตรียมสไตล์และคลาสที่สร้างไว้ล่วงหน้าซึ่งสามารถใช้จัดรูปแบบองค์ประกอบ HTML ได้
    - Component libraries เช่น Bootstrap มีคอมโพเนนต์ UI ที่สร้างไว้ล่วงหน้าซึ่งสามารถใช้เพื่อสร้าง UI ที่สอดคล้องกันและดูเป็นมืออาชีพ
    - ตัวเลือกระหว่างทั้งสองขึ้นอยู่กับความต้องการของโครงการ ความชอบส่วนบุคคล และระดับของการปรับแต่งที่จำเป็น

#### 1. ติดตั้ง Tailwind CSS

##### หยุดแอป

คุณสามารถใช้ Ctrl + c เพื่อหยุดการเรียกใช้แอป React+Vite ใน Command Line ของคุณ

##### ติดตั้ง Tailwind CSS

ตรวจสอบให้แน่ใจว่าไดเร็กทอรีปัจจุบันอยู่ภายใต้โปรเจ็กต์ React ที่คุณสร้างขึ้นโดยตรง และเรียกใช้คำสั่งต่อไปนี้:

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

##### เพิ่มเส้นทางไปยังไฟล์เทมเพลตทั้งหมดในไฟล์ tailwind.config.js ของคุณ

เปิดไฟล์ src/tailwind.config.js และแทนที่เนื้อหาด้วยโค้ดต่อไปนี้:

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

##### เพิ่ม Tailwind directives ใน CSS ของคุณ

เปิดไฟล์ src/index.css และแทนที่เนื้อหาด้วยโค้ดต่อไปนี้:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 2. ปรับใช้ CSS

##### เปิดไฟล์ src/PokemonContainer.tsx และแทนที่เนื้อหาด้วยโค้ดต่อไปนี้:


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

ด้านล่างนี้คือข้อแตกต่างก่อนและหลังการตั้งค่า CSS สำหรับการอ้างอิงเท่านั้น  
**อย่าคัดลอกและวางโค้ด**  
เครื่องหมาย "-" หมายถึงก่อนหน้านี้ "+" หมายถึงหลังจากนี้

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

##### เปิดไฟล์ src/ItemDisplay.tsx และแทนที่เนื้อหาด้วยโค้ดต่อไปนี้:


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

ด้านล่างนี้คือข้อแตกต่างก่อนและหลังการตั้งค่า CSS สำหรับการอ้างอิงเท่านั้น  
**อย่าคัดลอกและวางโค้ด**  
เครื่องหมาย "-" หมายถึงก่อนหน้านี้ "+" หมายถึงหลังจากนี้

```jsx
-        <div>
-          <img src={item.imageUrl} alt={item.name} />
-          {item.imageUrl && <p>{item.name}</p>}
+        <div className="mt-4">
+          <img className="w-32 h-32 rounded-full mx-auto mb-2" src={item.imageUrl} alt={item.name} />
+          <p className="text-sm text-gray-500 text-center mt-2">{item.name}</p>
```

##### เรียกใช้กระบวนการ Build ด้วยคำสั่ง npm run dev

ตรวจสอบให้แน่ใจว่าไดเร็กทอรีปัจจุบันอยู่ภายใต้โปรเจ็กต์ React ที่คุณสร้างขึ้นโดยตรง และเรียกใช้คำสั่งต่อไปนี้:

```sh
npm run dev
```

##### 

**หมายเหตุ**: การแสดงผลเปลี่ยนแปลงเป็นดังต่อไปนี้

![Random Pokemon with CSS applied](../public/img/1th/random_pokemon_with_css.png)

### (ตัวเลือก) เหมือน SPA มากขึ้น

เราจะเพิ่มเมนูนำทาง (navbar) และเพิ่มเมนูสุนัขนอกเหนือจาก Pokemon เพื่อทำให้เหมือน SPA มากขึ้น

#### 1. เตรียมการใช้งาน react-router
##### ติดตั้ง react-router

ตรวจสอบให้แน่ใจว่าไดเร็กทอรีปัจจุบันอยู่ภายใต้โปรเจ็กต์ React ที่คุณสร้างขึ้นโดยตรง และเรียกใช้คำสั่งต่อไปนี้:

```sh
npm install react-router-dom
```

- คำแนะนำ:
  - เกี่ยวกับ react-router และการกำหนดเส้นทาง (routing)
    - React Router เป็นไลบรารีการกำหนดเส้นทางยอดนิยมสำหรับแอปพลิเคชัน React
      - ไลบรารีและเฟรมเวิร์กอื่นๆ มีทางออกการกำหนดเส้นทางของตนเอง ตัวอย่างเช่น Angular มี Angular Router, Vue มี Vue Router เป็นต้น
    - การกำหนดเส้นทางเป็นแนวคิดที่ใช้กับไลบรารีและเฟรมเวิร์กต่างๆ นอกเหนือจาก React
      - ในบริบทของการพัฒนาเว็บ การกำหนดเส้นทางเกี่ยวข้องกับการจัดการ URL หรือเส้นทางต่างๆ และ mapping กับส่วน component หรือการดำเนินการเฉพาะภายในแอปพลิเคชันของคุณ ช่วยให้คุณนำทางระหว่าง views หรือ pages และรักษาสถานะของแอปพลิเคชันตาม URL ปัจจุบัน

**หมายเหตุ:**   
ในขณะที่เขียนข้อความนี้ React Router เวอร์ชันที่ใช้งานคือ v6 หากคุณติดตั้งตามคำอธิบายข้างต้นคุณควรสามารถใช้ v6 ได้ หากคุณติดตั้งโดยระบุเวอร์ชันเฉพาะ โปรดทราบว่าการตั้งค่าแตกต่างกันระหว่าง v5 และ v6

#### 2. การใช้งาน navbar

ตอนนี้เมนูมีเฉพาะ Pokémon เท่านั้น  แต่เราจะแนะนำ navbar

#### เปิดไฟล์ src/App.tsx และแทนที่เนื้อหาด้วยโค้ดต่อไปนี้:

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

##### บันทึกไฟล์และเปิดเบราว์เซอร์ของคุณแล้วไปที่ http://localhost:5173 เพื่อดูแอปพลิเคชัน คลิกที่ "Pokemon" ในเมนูบาร์ด้านบนและตรวจสอบว่าหน้า "Get Random Pokemon" ปรากฏขึ้น

![Implementation of a navbar](../public/img/1th/implementation_navbar.png)

#### 3. เพิ่มเมนูสุนัข

เพิ่มเมนูที่แสดงภาพสุนัขแบบสุ่มเหมือนกับ Pokemon

##### สร้างไฟล์ src/DogContainer.tsx และแทนที่เนื้อหาด้วยรหัสต่อไปนี้:

ในไฟล์ DogContainer.tsx ภาพสุนัขจะถูกเรียกแบบสุ่ม คล้ายกับ PokemonContainer.tsx
UI ก็เหมือนกัน  
เราใช้ไฟล์ที่ถูก Refactor และทำเป็น Component อย่าง ItemDisplay.tsx ในทั้ง DogContainer.tsx และ PokemonContainer.tsx


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

#### เปิดไฟล์ src/App.tsx และแทนที่เนื้อหาด้วยโค้ดต่อไปนี้:


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

##### บันทึกไฟล์และเปิดเบราว์เซอร์ของคุณ ไปที่ http://localhost:5173 เพื่อดูแอปพลิเคชัน

"Dog" เมนูถูกเพิ่มเข้าไปใน Navbar ติดตั้งกับ "Pokemon" กดที่เมนู "Dog" เพื่อตรวจสอบว่าหน้าจอแสดงผลและประมวลผลสามารถทำได้เหมือนกับ "Pokemon"

## 3. ในปิดท้าย
นี่เป็นการสรุป hands-on ขอบคุณสำหรับความพยายามของคุณ โค้ดที่สมบูรณ์มีอยู่ [ที่นี่](https://github.com/minakamoto/pschs2023/tree/main/src/webapp/handson-for-catchup/src/1th/first-app)  
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/minakamoto/pschs2023/tree/main/src/webapp/handson-for-catchup/src/1th/first-app)

ยังมีหลายสิ่งที่ต้องแก้ไข เช่น ไม่มีหน้าจอ TOP และการออกแบบที่แย่มาก (การออกแบบที่เรียบง่ายเกินไปคือความตั้งใจ!) โปรดลองปรับปรุง UI นี้หรือเพิ่มคุณสมบัติด้วยแนวคิดของคุณ

### คำแนะนำสำหรับผู้ที่สนใจในการพัฒนา frontend

ในความคิดของฉัน เพื่อเพิ่มทักษะทางเทคนิคด้าน frontend ได้ด้วยตัวคุณเอง คุณควรทำตามขั้นตอนต่อไปนี้
1. เรียนรู้พื้นฐานของ Javascript/Typescript, HTML, CSS
1. คิดแอปพลิเคชันที่คุณต้องการสร้างและลองพัฒนาด้วยตนเอง
1. (หากคุณไม่สามารถคิดขึ้นมาได้) ค้นหา UI หรือแอปพลิเคชันที่คุณต้องการเรียนรู้หรือดัดแปลงจากเว็บ ลอกเลียนแบบและนำมาปรับใช้เอง(แน่นอนว่าการคัดลอกมีไว้เพื่อการศึกษาเท่านั้น)
1. รู้จักเจาะลึกเรื่องความรู้และทักษะที่คุณขาดไปในข้อ 2 และ/หรือ ข้อ 3

## 4. Links

- see [0th's Links](0th.md#3-links)
- Other well-known general sites
  - [freeCodeCamp](https://www.freecodecamp.org/)
  - [w3schools](https://www.w3schools.com/)
  - [scrimba](https://scrimba.com/)
- UI frameworks/libraries
  - หากคุณต้องการศึกษาเฟรมเวิร์กและไลบรารีเพื่อสร้าง UI ลองเริ่มต้นจากที่อยู่ในเว็บไซต์อย่างเป็นทางการของแต่ละเฟรมเวิร์กหรือไลบรารีก่อน
    - e.g.
      - [React tutorial](https://react.dev/learn/tutorial-tic-tac-toe)
      - [Svelte tutorial](https://svelte.dev/tutorial/basics)
