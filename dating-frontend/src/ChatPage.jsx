import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "alice", message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "No response." },
      ]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error contacting server." },
      ]);
    }

    setInput("");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxWidth: "600px",
        margin: "0 auto",
        border: "1px solid #ddd",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "10px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f7f7f7",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            border: "none",
            background: "transparent",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ←
        </button>
        <h3 style={{ margin: 0 }}>Chat with Bot</h3>
        <div style={{ width: "30px" }} /> {/* Spacer */}
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          overflowY: "auto",
          background: "#fafafa",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "10px 14px",
                borderRadius: "18px",
                maxWidth: "70%",
                wordWrap: "break-word",
                background: msg.role === "user" ? "#DCF8C6" : "#E5E5EA",
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        style={{
          display: "flex",
          borderTop: "1px solid #ddd",
          padding: "10px",
          background: "#fff",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            outline: "none",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 16px",
            borderRadius: "20px",
            border: "none",
            background: "#4CAF50",
            color: "white",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
