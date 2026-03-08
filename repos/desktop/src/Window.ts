import { BrowserWindow } from "electron";

export class Window {
  #appWindow: BrowserWindow;

  constructor(url: string) {
    this.#appWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
    });

    this.#appWindow.loadURL(url);
  }

  show() {
    this.#appWindow.show();
  }
}
