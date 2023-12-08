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
  socket.on("setWindows", (data) => {
    if (windowsOpen.length != 0) {
      for (let index = 0; index < windowsOpen.length; index++) {
        if (windowsOpen[index].id == data.id) {
          windowsOpen[index] = data;
          return;
        }
      }
    }
    windowsOpen.push(data);
    console.log(windowsOpen);
  });

  socket.on("getWindows", () => {
    socket.emit("deliverWindows", windowsOpen);
  });

  socket.on("disconnect", () => {
    for (let index = 0; index < windowsOpen.length; index++) {
      if (windowsOpen[index].id != socket.id) continue;
      windowsOpen.splice(index, 1);
      io.sockets.emit("windowsChanged", {
        index,
        windowsOpen,
      });
    }
  });
});

server.listen(5000, () => {
  console.log("listening on port 5000");
});
