const { Server } = require("socket.io");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

/**
 * io
 * @type {Server}
 */
const io = new Server(server, {
  cors: "http://localhost:5000",
});

app.get("/", (req, res) => {
  console.log("hello");
});

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("getShape", (socket) => {
    console.log(socket);
  });

  io.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(5000, () => {
  console.log("listening on port 5000");
});
