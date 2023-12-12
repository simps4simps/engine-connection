import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Canvas from "./Components/Canvas/Canvas";
import WindowManager from "./Assets/WindowManager/WindowManager";

const App = () => {
  const [data, setData] = useState();
  const mainDisplay = useRef(null);

  useEffect(() => {
    const windowManager = new WindowManager("http://localhost:5000");

    windowManager.init("window");
    windowManager.socket.on("sendData", (data) => {
      setData(data);

      setInterval(() => {
        windowManager.update();
      }, 600);
    });
  }, []);

  return (
    <div id="app-wrapper">
      <div id="main-display" ref={mainDisplay}>
        <h1>{console.log(data)}</h1>
      </div>

      <Canvas />
    </div>
  );
};

export default App;
