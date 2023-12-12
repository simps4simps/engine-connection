import React, { useEffect, useState, useRef } from "react";
import "./Canvas.css";

const Canvas = () => {
  // Dynamic canvas size
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, [window.innerHeight, window.innerWidth]);

  return (
    <>
      <canvas id="main-canvas" width={width} height={height}></canvas>
    </>
  );
};

export default Canvas;
