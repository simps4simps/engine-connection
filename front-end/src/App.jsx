import React from "react";
import "./App.css";
import Canvas from "./Components/Canvas/Canvas";

const App = () => {
  return (
    <div id="app-wrapper">
      <div id="main-display"></div>

      <Canvas />
    </div>
  );
};

export default App;
