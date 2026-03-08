import path from "path";
import { Process } from "./Process";
import { ApplicationSecret } from "./ApplicationSecret";
import { app, BrowserWindow, session } from "electron";
import squirrelStarted from "electron-squirrel-startup";
import axios from "axios";
import { Window } from "./Window";
import { ApplicationProcessConfig } from "./ApplicationProcessConfig";

export class Application {
  #frontendProc: Process | null = null;
  #backendProc: Process | null = null;
  #window: Window | null = null;

  init() {
    if (squirrelStarted) return this.quit();

    app.whenReady().then(() => this.start());
  }

  async start() {
    this.#startFrontend();
    this.#startBackend();

    await this.#waitForPort(ApplicationProcessConfig.frontendPort);
    await this.#waitForPort(ApplicationProcessConfig.backendPort);

    session.defaultSession.webRequest.onBeforeSendHeaders(
      (details, callback) => {
        callback({
          requestHeaders: {
            ...details.requestHeaders,
            "x-electron-auth-secret": ApplicationSecret.get(),
          },
        });
      },
    );

    this.#createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) this.#createWindow();
    });

    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") this.quit();
    });
  }

  #waitForPort(port: number) {
    return new Promise<void>(async (resolve) => {
      let lastTime = performance.now();

      while (true) {
        const now = performance.now();
        if (now - lastTime < 1000) continue;

        lastTime = now;

        const res = await this.#checkPort(port);

        if (res) {
          console.log(`Port ${port} is ready`);
          resolve();

          break;
        }
      }
    });
  }

  #checkPort(port: number) {
    return axios
      .get(`http://localhost:${port}`, {
        headers: {
          "x-electron-auth-secret": ApplicationSecret.get(),
        },
      })
      .catch((e) => {
        return e.response?.status > 0;
      });
  }

  #createWindow() {
    this.#window = new Window(
      `http://localhost:${ApplicationProcessConfig.frontendPort}`,
    );

    this.#window.show();
  }

  #startFrontend() {
    const proc = new Process()
      .setExecutable("bun")
      .addArg("run")
      .addArg("dev")
      .addArg("--port")
      .addArg(ApplicationProcessConfig.frontendPort.toString())
      .setCwd(path.join(process.cwd(), "../frontend"))
      .setEnv("ELECTRON_AUTH_SECRET", ApplicationSecret.get())
      .setEnv(
        "NEXT_PUBLIC_BACKEND_ADDRESS",
        `http://localhost:${ApplicationProcessConfig.backendPort}`,
      )
      .spawn();

    this.#frontendProc = proc;
  }

  #startBackend() {
    const proc = new Process()
      .setExecutable("bun")
      .addArg("run")
      .addArg("start:dev")
      .setCwd(path.join(process.cwd(), "../backend"))
      .setEnv("ELECTRON_AUTH_SECRET", ApplicationSecret.get())
      .setEnv("PORT", ApplicationProcessConfig.backendPort.toString())
      .spawn();

    this.#backendProc = proc;
  }

  quit() {
    app.quit();
  }
}
