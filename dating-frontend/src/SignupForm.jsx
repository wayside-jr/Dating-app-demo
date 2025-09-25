import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://127.0.0.1:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Please log in.");
        navigate("/");
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ padding: "10px" }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ padding: "10px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ padding: "10px" }}
      />
      <button type="submit" style={{ padding: "10px", backgroundColor: "#4CAF50", color: "#fff" }}>
        Sign Up
      </button>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </form>
  );
}
