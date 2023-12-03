import { io } from "socket.io-client";

class WindowManager {
  constructor(socketString) {
    this.socket = io(socketString);
  }

  init(data) {
    let dimensions = this.getDimensions();

    this.socket.emit("getWindows");
    this.socket.on("deliverWindows", (socket) => {
      this.id = socket.length + 1;
      console.log(this.id);
    });

    this.winData = {
      dimensions,
      id: this.id,
      data,
    };

    this.socket.emit("setWindows", this.winData);
  }

  getDimensions() {
    let dimensions = {
      x: window.screenLeft,
      y: window.screenTop,
      width: window.innerWidth,
      height: window.innerHeight,
    };

    return dimensions;
  }
}

export default WindowManager;
