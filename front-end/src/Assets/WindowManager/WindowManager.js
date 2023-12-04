import { io } from "socket.io-client";

class WindowManager {
  async init(data, socketString) {
    this.socketString = socketString;
    this.socket = io(socketString);
    let dimensions = this.getDimensions();

    this.windows = await this.getWindows();

    this.winData = {
      dimensions,
      id: this.socket.id,
      data,
      windowNumber: this.windows.length + 1,
    };

    this.updateWindows();
  }

  getWindows() {
    let promise = new Promise((res, rej) => {
      this.socket.emit("getWindows");
      this.socket.on("deliverWindows", (socket) => {
        res(socket);
      });
    });

    return promise;
  }

  updateWindows() {
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

  update() {
    let dimensions = this.getDimensions();

    if (
      dimensions.x != this.winData.dimensions.x ||
      dimensions.y != this.winData.dimensions.y ||
      dimensions.width != this.winData.dimensions.width ||
      dimensions.height != this.winData.dimensions.height
    ) {
      this.winData.dimensions = dimensions;

      this.updateWindows();
    }
  }
}

export default WindowManager;
