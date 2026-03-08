export class ApplicationProcessConfig {
  static #backendPort: number;
  static #frontendPort: number;

  static get backendPort() {
    if (!ApplicationProcessConfig.#backendPort)
      ApplicationProcessConfig.#backendPort = 8772;

    return ApplicationProcessConfig.#backendPort;
  }

  static get frontendPort() {
    if (!ApplicationProcessConfig.#frontendPort)
      ApplicationProcessConfig.#frontendPort = 8773;

    return ApplicationProcessConfig.#frontendPort;
  }
}
