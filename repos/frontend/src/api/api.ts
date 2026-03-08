import { TProject } from "@/types/entities";
import { ApiVersion, createGetEndpoint } from "./helpers";

export const API = {
  getHealth: createGetEndpoint<{
    healthy: boolean;
  }>("/health", ApiVersion.v1),

  projects: {
    list: createGetEndpoint<Omit<TProject, "client">[]>(
      "/projects",
      ApiVersion.v1,
    ),
  },
};
