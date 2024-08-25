// src/App.js
import React, { useState, useEffect, useRef, useCallback } from "react";

const ChatPage = () => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [to, setTo] = useState(""); // Recipient
  const [from, setFrom] = useState(""); // Sender
  const messageEndRef = useRef(null);

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:5000");
    setWs(websocket);

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => websocket.close();
  }, []);

  const sendMessage = useCallback(() => {
    if (ws && input && to && from) {
      const message = {
        from,
        to,
        content: input,
      };
      ws.send(JSON.stringify(message));
      setMessages((prevMessages) => [...prevMessages, message]);
      setInput("");
    }
  }, [ws]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>One-to-One WebSocket Chat</h2>
      <div>
        <input
          type="text"
          placeholder="Your Name"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Recipient Name"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "scroll",
          marginTop: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.from}: </strong>
            {msg.content}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <input
        type="text"
        placeholder="Type a message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "80%", marginRight: "10px", marginTop: "10px" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatPage;
