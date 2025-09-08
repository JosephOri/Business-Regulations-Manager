import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    // Fetch users from backend API
    fetch("http://localhost:3001/api/users")
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponse(data.message);
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setResponse("Error sending message");
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Express</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>Connected to Express backend API</p>
      </div>

      <div className="card">
        <h3>Backend API Demo</h3>
        <h4>Users from Backend:</h4>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message"
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <button type="submit">Send to Backend</button>
        </form>

        {response && <p style={{ marginTop: "10px", color: "green" }}>Server response: {response}</p>}
      </div>

      <p className="read-the-docs">Full-stack application with React frontend and Express backend</p>
    </>
  );
}

export default App;
