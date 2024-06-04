import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        // Fetch all todos from the API
        axios
            .get("http://localhost:8000/todo")
            .then((response) => setTodos(response.data))
            .catch((error) => console.error("Error fetching todos:", error));
    }, []);

    const handleInputChange = (event) => {
        setNewTodo(event.target.value);
    };

    const handleAddTodo = () => {
        // Send a POST request to create a new todo
        axios
            .post("http://localhost:8000/todo", { task: newTodo })
            .then((response) => {
                setTodos([...todos, response.data]);
                setNewTodo("");
            })
            .catch((error) => console.error("Error creating todo:", error));
    };

    // Update handleCheckBoxChange function in App.js
    const handleCheckboxChange = (id, completed) => {
        // Send a PUT request to update the todo item with the completed status
        axios
            .put(`http://localhost:8000/todo/${id}`, {
                completed: !completed,
                task: "",
            }) // Include a dummy task value
            .then((response) => {
                // Update the todo list in the state after successful update
                const updatedTodos = todos.map((todo) =>
                    todo.id === id ? { ...todo, completed: !completed } : todo
                );
                setTodos(updatedTodos);
            })
            .catch((error) => console.error("Error updating todo:", error));
    };

    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                maxWidth: "400px",
                margin: "0 auto",
                padding: "20px",
            }}
        >
            <h1
                style={{
                    fontSize: "24px",
                    marginBottom: "20px",
                    textAlign: "center",
                }}
            >
                ToDo List
            </h1>
            <div style={{ display: "flex", marginBottom: "20px" }}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={handleInputChange}
                    style={{
                        flex: "1",
                        padding: "8px",
                        marginRight: "10px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        outline: "none",
                    }}
                    placeholder="Enter your todo"
                />
                <button
                    onClick={handleAddTodo}
                    style={{
                        padding: "8px 20px",
                        fontSize: "16px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Add Todo
                </button>
            </div>
            <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        style={{
                            fontSize: "18px",
                            marginBottom: "10px",
                            borderBottom: "1px solid #ccc",
                            paddingBottom: "5px",
                            textDecoration: todo.completed
                                ? "line-through"
                                : "none",
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() =>
                                handleCheckboxChange(todo.id, todo.completed)
                            }
                            style={{ marginRight: "10px", cursor: "pointer" }}
                        />
                        {todo.task}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
