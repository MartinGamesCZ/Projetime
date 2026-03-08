import { ChildProcess, spawn } from "child_process";

export class Process {
  #executable: string | null = null;
  #args: string[] = [];
  #environment: Record<string, string> = {};
  #cwd: string | null = null;
  #proc: ChildProcess | null = null;

  setExecutable(executable: string): Process {
    this.#executable = executable;

    return this;
  }

  addArg(arg: string): Process {
    this.#args.push(arg);

    return this;
  }

  setEnv(key: string, value: string): Process {
    this.#environment[key] = value;

    return this;
  }

  setCwd(cwd: string): Process {
    this.#cwd = cwd;

    return this;
  }

  spawn() {
    if (!this.#executable) throw new Error("Invalid exec path");

    this.#proc = spawn(this.#executable, this.#args, {
      cwd: this.#cwd ?? process.cwd(),
      env: { ...process.env, ...this.#environment },
      stdio: "inherit",
      detached: process.platform !== "win32",
    });

    return this;
  }

  kill() {
    if (!this.#proc) return;

    if (this.#proc.pid && process.platform !== "win32") {
      try {
        process.kill(-this.#proc.pid);
      } catch (e) {
        this.#proc.kill();
      }
    } else this.#proc.kill();

    return;
  }
}
