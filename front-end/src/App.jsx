import React, { useEffect } from "react";
import "./App.css";
import Canvas from "./Components/Canvas/Canvas";
import WindowManager from "./Assets/WindowManager/WindowManager";

const App = () => {
  useEffect(() => {
    const windowManager = new WindowManager("http://localhost:5000");

    windowManager.init("window");
  }, []);
  return (
    <div id="app-wrapper">
      <div id="main-display"></div>

      <Canvas />
    </div>
  );
};

export default App;
