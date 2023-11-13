# Hands-on to developing a simple Todo List app

## สิ่งที่เราจะสร้าง

เราจะพัฒนาแอป Todo List แบบง่ายๆ พร้อมด้วยฟังก์ชันต่อไปนี้

- สร้างสิ่งที่ต้องทำใหม่ ตรวจสอบความสมบูรณ์ และลบสิ่งที่ต้องทำ
- มีเพียงหน้าจอเดียวและไม่มีmodal
- ไม่มีแบ็กเอนด์ เป็นเพียงการพัฒนาฟรอนต์เอนด์อย่างง่าย ๆ

## สแต็คเทคโนโลยีหลัก

- [Next.js](https://nextjs.org/)
  - React-based UI framework
  - สแต็กเทคโนโลยีสองรายการต่อไปนี้จะถูกเพิ่มและกำหนดค่าโดยอัตโนมัติเมื่อคุณเลือกเมื่อติดตั้ง Next.js
- [Typescript](https://www.typescriptlang.org/)
  - JavaScript with syntax for types
- [tailwindcss](https://tailwindcss.com/)
  - CSS framework

## การพัฒนา

### เปิดการติดตั้ง Next.js ที่กำหนดค่า IDE บนเบราว์เซอร์

เปิดการติดตั้ง Next.js เทมเพลต IDE [stackblitz template](https://stackblitz.com/edit/nextjs) ที่ใช้เบราว์เซอร์ที่กำหนดค่าไว้

เมื่อเปิดแล้ว การติดตั้งและการกำหนดค่าจะเริ่มขึ้น โปรดรอสักครู่จนกว่าคุณจะเห็นหน้าจอในบานหน้าต่างด้านขวาด้านล่าง (หน้าจอเริ่มต้น Next.js)

stackblitz ประกอบด้วยไดเร็กทอรีของไฟล์ในบานหน้าต่างด้านซ้าย การแก้ไขไฟล์ตรงกลาง และหน้าจอแสดงตัวอย่างในบานหน้าต่างด้านขวา

![Next.js default display on stackblitz](../../static/img/students/1st/nextjs_default_display.png)

### ลบการตั้งค่า CSS ที่ไม่จำเป็น

เปิดไฟล์ `app/globals.css` ใน Files ในแถบด้านข้างซ้าย และแทนที่เนื้อหาด้วยโค้ดต่อไปนี้

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### กำลังพัฒนาแอป Todo List

เปิดไฟล์ `app/page.tsx` ใน Files ที่แถบด้านข้างซ้าย และแทนที่เนื้อหาด้วยโค้ดต่อไปนี้

```tsx
"use client";
import { useState } from "react";
import "tailwindcss/tailwind.css";

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");

  const addTodo = (task: string) => {
    // If multiple todos are created in the same millisecond and the same ID can be generated, consider another means (ex uuid)
    const newTodo: Todo = { id: Date.now(), task, completed: false };
    // add new todo to the top of todo list
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const toggleComplete = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleAddClick = () => {
    addTodo(task);
    setTask("");
  };

  return (
    // using `className` property apply tailwindcss's class
    <div className="flex flex-col items-center min-h-screen py-2">
      <div className="fixed top-0 left-0 right-0 bg-white z-10 shadow-md">
        <div className="flex items-center justify-center pt-5">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter new task"
            className="border-2 border-gray-300 p-2 my-2 rounded-md h-10"
          />
          <button
            onClick={handleAddClick}
            className={`bg-blue-500 text-white px-2 py-1 rounded-md ml-2 h-10 ${
              task ? "" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!task}
          >
            Add
          </button>
        </div>
      </div>
      <div className="mt-20 w-1/3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between p-3 border-b-2 w-100"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              className="mr-2"
            />
            <div
              onClick={() => toggleComplete(todo.id)}
              className={`cursor-pointer ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.task}
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 text-white px-2 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

หลังจากการพัฒนา หน้าจอต่อไปนี้จะแสดงขึ้น (Todoจะถูกเพิ่มจากสถานะเริ่มต้นโดยไม่มีTodo)

![Screen after development on stackblitz](../../static/img/students/1st/screen_after_development.png)

### การตรวจสอบพฤติกรรม

โปรดตรวจสอบการทำงานของแอป Todo List บนหน้าจอแสดงตัวอย่างทางด้านขวา

### ในปิดท้าย

นี่เป็นการสิ้นสุดเซสชั่นภาค hands-on  
สามารถดูโค้ดได้[ที่นี่](https://github.com/minakamoto/pcshscr2023/tree/main/src/webapp/30min-exp-web-tech/1th/todo-list)  

หากคุณสนใจ โปรดไปที่ลิงก์ด้านบนเพื่อตรวจสอบโค้ดและแก้ไขตามที่คุณต้องการ
