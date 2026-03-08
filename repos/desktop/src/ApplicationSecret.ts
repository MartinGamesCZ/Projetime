import { randomBytes } from "crypto";

export class ApplicationSecret {
  static #secret: string;

  static get() {
    if (!ApplicationSecret.#secret)
      ApplicationSecret.#secret = randomBytes(64).toString("base64");

    return ApplicationSecret.#secret;
  }
}
