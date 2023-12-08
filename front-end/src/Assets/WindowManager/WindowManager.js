import { io } from "socket.io-client";

class WindowManager {
  socket;
  windows;
  winData;
  id;
  winNumber;
  data;

  constructor(socketString) {
    this.socket = io(socketString);
  }
  init(metaData) {
    this.data = metaData;
    this.buildWinData();

    this.socket.on("windowsChanged", (data) => {
      this.checkNewWindows(data);
    });
  }

  buildWinData() {
    this.socket.emit("getWindows");

    this.socket.on("deliverWindows", (res) => {
      this.winData = new Promise((resolve, reject) => {
        this.windows = res;
        this.id = this.socket.id;
        this.winNumber = res.length;

        resolve({
          id: this.id,
          data: this.data,
          winNumber: this.winNumber + 1,
        });
      }).then((res) => {
        this.winData = res;
        console.log(res);
        this.updateWindows();
      });
    });
  }

  checkNewWindows(data) {
    this.windows = data.windowsOpen;
    if (data.index < this.winData.winNumber) {
      this.winData.winNumber -= 1;

      this.updateWindows();
      console.log(this.winData);
    }
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
