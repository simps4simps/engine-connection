const { Server } = require("socket.io");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

let windowsOpen = [];

/**
 * io
 * @type {Server}
 */
const io = new Server(server, {
  cors: "http://localhost:5000",
});

io.on("connection", (socket) => {
  socket.on("setWindows", (socket) => {
    windowsOpen.push(socket);
  });
  socket.on("getWindows", () => {
    socket.emit("deliverWindows", windowsOpen);
  });

  socket.on("disconnect", (socket) => {
    let item = windowsOpen.indexOf(socket);
    windowsOpen.pop(item);
  });
});

server.listen(5000, () => {
  console.log("listening on port 5000");
});
