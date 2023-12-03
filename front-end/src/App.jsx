import React, { useEffect } from "react";
import "./App.css";
import Canvas from "./Components/Canvas/Canvas";
import { io } from "socket.io-client";

const App = () => {
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.emit("getShape", {
      x: window.screenLeft,
      y: window.screenTop,
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);
  return (
    <div id="app-wrapper">
      <div id="main-display"></div>

      <Canvas />
    </div>
  );
};

export default App;
