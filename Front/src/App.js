import React, { useState, useEffect } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  editTodo,
  deleteAllTodos,
} from "./TodoService";
import "./App.css";
import Popup from "./Popup";
import Stats from "./Stats";
import Stopwatch from "./Stopwatch";
import "./layout.css";
import PriorityButton from "./PriorityButton";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [popupId, setPopupId] = useState(null);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  // const [reminderTime, setReminderTime] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const togglePopup = (id, content) => {
    setPopupId(id);
    setContent(content);
    setIsOpen(!isOpen);
  };

  const handleCreate = async () => {
    if (newTodo.length > 50) {
      setError("Title cannot exceed 50 characters");
      setNewTodo("");
      return;
    }
    try {
      await createTodo({
        title: newTodo,
        completed: false,
        description: "",
        // reminder_time: reminderTime,
      });
      fetchTodos();
      setNewTodo("");
      setError("");
      // setReminderTime("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id, completed) => {
    try {
      await updateTodo(id, { completed: !completed });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id, title) => {
    try {
      await editTodo(id, title, title.priority);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const handleEditClick = (id, title) => {
    setEditingId(id);
    setEditingTitle(title);
  };

  const handleSaveClick = async (id) => {
    await handleEdit(id, editingTitle);
    setEditingId(null);
    setEditingTitle("");
  };

  const handleDeleteAll = async () => {
    await deleteAllTodos();
    fetchTodos();
  };

  const handleSave = (id, description) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, description } : todo
      )
    );
  };

  return (
    <div className="container">
      <div className="sidebar">
        <Stats todos={todos} />
      </div>
      <div className="stopwatch">
        <Stopwatch />
      </div>
      <div className="App">
        <h1>Todo List</h1>
        <input
          type="text"
          value={newTodo}
          placeholder="Enter a title"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        {/* <input type="datetime-local" onChange={(e) => setReminderTime(e.target.value)} /> */}
        <button
          onClick={handleCreate}
          className="top-button"
          disabled={!newTodo}
        >
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 10v-6h2v6h6v2h-6v6h-2v-6h-6v-2h6z"
            />
          </svg>
        </button>
        {error && <p style={{ color: "#e74c3c" }}>{error}</p>}
        <button
          onClick={() => handleDeleteAll()}
          className="icon-button delete top-button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24">
            <g transform="translate(-4,0)">
              <path
                fill="currentColor"
                d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2-5V9h8v10H8v-5zm2 0v3h4v-3h-4z"
              />
            </g>
            <text
              x="15"
              y="23"
              fill="currentColor"
              fontSize="12"
              fontWeight="bold"
              fontFamily="Arial"
            >
              A
            </text>
          </svg>
        </button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                  />
                  <button onClick={() => handleSaveClick(todo.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                    >
                      <path
                        d="M17 20.75H7C6.27065 20.75 5.57118 20.4603 5.05546 19.9445C4.53973 19.4288 4.25 18.7293 4.25 18V6C4.25 5.27065 4.53973 4.57118 5.05546 4.05546C5.57118 3.53973 6.27065 3.25 7 3.25H14.5C14.6988 3.25018 14.8895 3.32931 15.03 3.47L19.53 8C19.6707 8.14052 19.7498 8.33115 19.75 8.53V18C19.75 18.7293 19.4603 19.4288 18.9445 19.9445C18.4288 20.4603 17.7293 20.75 17 20.75ZM7 4.75C6.66848 4.75 6.35054 4.8817 6.11612 5.11612C5.8817 5.35054 5.75 5.66848 5.75 6V18C5.75 18.3315 5.8817 18.6495 6.11612 18.8839C6.35054 19.1183 6.66848 19.25 7 19.25H17C17.3315 19.25 17.6495 19.1183 17.8839 18.8839C18.1183 18.6495 18.25 18.3315 18.25 18V8.81L14.19 4.75H7Z"
                        fill="#ffffff"
                      />
                      <path
                        d="M16.75 20H15.25V13.75H8.75V20H7.25V13.5C7.25 13.1685 7.3817 12.8505 7.61612 12.6161C7.85054 12.3817 8.16848 12.25 8.5 12.25H15.5C15.8315 12.25 16.1495 12.3817 16.3839 12.6161C16.6183 12.8505 16.75 13.1685 16.75 13.5V20Z"
                        fill="#ffffff"
                      />
                      <path
                        d="M12.47 8.75H8.53001C8.3606 8.74869 8.19311 8.71403 8.0371 8.64799C7.88109 8.58195 7.73962 8.48582 7.62076 8.36511C7.5019 8.24439 7.40798 8.10144 7.34437 7.94443C7.28075 7.78741 7.24869 7.61941 7.25001 7.45V4H8.75001V7.25H12.25V4H13.75V7.45C13.7513 7.61941 13.7193 7.78741 13.6557 7.94443C13.592 8.10144 13.4981 8.24439 13.3793 8.36511C13.2604 8.48582 13.1189 8.58195 12.9629 8.64799C12.8069 8.71403 12.6394 8.74869 12.47 8.75Z"
                        fill="#ffffff"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <span>
                    <div className="todo-item">
                      <div className="todo-title">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => handleUpdate(todo.id, todo.completed)}
                          disabled={todo.expired}
                        />
                        <span
                          style={{
                            textDecoration: todo.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {todo.title}
                        </span>
                      </div>
                      <div
                        className="description"
                        onClick={() => togglePopup(todo.id, todo.description)}
                      >
                        {todo.description
                          ? todo.description.length > 30
                            ? `${todo.description.substring(
                                0,
                                30
                              )}... read more`
                            : todo.description
                          : todo.completed || todo.expired
                          ? "No description"
                          : "Add description"}
                      </div>
                    </div>
                  </span>
                  <div className="priority-container">
                    <PriorityButton
                      priority={todo.priority}
                      onPriorityChange={(priority) =>
                        handleEdit(todo.id, { priority })
                      }
                      completed={todo.completed}
                      expired={todo.expired}
                    />
                  </div> 
                  <button
                    onClick={() => handleEditClick(todo.id, todo.title)}
                    disabled={todo.completed || todo.expired}
                    className="icon-button edit"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M16.293 2.293l-13.5 13.5c-0.117 0.117-0.197 0.265-0.231 0.427l-1.5 7.5c-0.111 0.553 0.425 1.036 0.969 0.864l7.5-2.25c0.159-0.048 0.305-0.134 0.422-0.251l13.5-13.5c0.391-0.391 0.391-1.024 0-1.414l-5.75-5.75c-0.391-0.391-1.024-0.391-1.414 0zM4.793 16.707l11.793-11.793 2.5 2.5-11.793 11.793-3.063 0.919 0.563-3.419z"
                      />
                    </svg>
                  </button>
                </>
              )}
              <button
                onClick={() => handleDelete(todo.id)}
                className="icon-button delete"
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2-5V9h8v10H8v-5zm2 0v3h4v-3h-4z"
                  />
                </svg>
              </button>
            </li>
          ))}
          {isOpen && (
            <Popup
              id={popupId}
              content={content}
              handleClose={togglePopup}
              onSave={handleSave}
              completed={todos.find((todo) => todo.id === popupId)?.completed}
              expired={todos.find((todo) => todo.id === popupId)?.expired}
            />
          )}
        </ul>
      </div>
      <div className="extra-section"></div>
    </div>
  );
}

export default App;
