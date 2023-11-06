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
