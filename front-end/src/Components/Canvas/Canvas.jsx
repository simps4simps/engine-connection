import React, { useEffect, useState, useRef } from "react";
import "./Canvas.css";

const Canvas = () => {
  // Dynamic canvas size
  const canvas = useRef(null);
  const [size, setSize] = useState({});
  useEffect(() => {
    setSize({
      innerHeight,
      innerWidth,
    });
  }, [innerHeight, innerWidth]);

  return (
    <>
      <canvas
        id="main-canvas"
        ref={canvas}
        width={size.innerWidth}
        height={size.innerWidth}
      ></canvas>
    </>
  );
};

export default Canvas;
