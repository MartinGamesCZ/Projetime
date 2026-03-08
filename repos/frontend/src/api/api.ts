import { ApiVersion, createGetEndpoint } from "./helpers";

export const API = {
  getHealth: createGetEndpoint<{
    healthy: boolean;
  }>("/health", ApiVersion.v1),
};
