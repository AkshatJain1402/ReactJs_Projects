const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = {};

wss.on("connection", (ws) => {
  console.log("new client connected");

  ws.on("message", (message) => {
    const parseMessage = JSON.parse(message);
    const { to, from, content } = parseMessage;

    if (!clients[from]) {
      clients[from] = ws;
    }

    if (clients[to]) {
      clients[to].send(JSON.stringify({ from, content }));
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    Object.keys(clients).forEach((key) => {
      if (clients[key] === ws) {
        delete clients[key];
      }
    });
  });
});

app.get("/", (req, res) => {
  res.json({ msg: "I am healthy" });
});

server.listen(5000, () => {
  console.log("WebSocket server has been started");
});

server.on("error", (error) => {
  console.error(`Server error: ${error.message}`);
});
