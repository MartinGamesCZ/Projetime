import { TClient, TProject } from "@/types/entities";
import {
  ApiVersion,
  createDeleteEndpoint,
  createGetEndpoint,
  createPostEndpoint,
  createPutEndpoint,
} from "./helpers";

export const API = {
  getHealth: createGetEndpoint<{
    healthy: boolean;
  }>("/health", ApiVersion.v1),

  projects: {
    list: createGetEndpoint<Omit<TProject, "client">[]>(
      "/projects",
      ApiVersion.v1,
    ),
    create: createPostEndpoint<
      TProject,
      {
        clientId: string;
        name: string;
        rate: number;
      }
    >("/projects", ApiVersion.v1),
    id: (projectId: string) => ({
      update: createPutEndpoint<
        TProject,
        Partial<{
          clientId: string;
          name: string;
          rate: number;
        }>
      >(`/projects/${projectId}`, ApiVersion.v1),
      delete: createDeleteEndpoint<TProject>(
        `/projects/${projectId}`,
        ApiVersion.v1,
      ),
    }),
  },

  clients: {
    list: createGetEndpoint<TClient[]>("/clients", ApiVersion.v1),
    create: createPostEndpoint<
      TClient,
      {
        name: string;
      }
    >("/clients", ApiVersion.v1),
    id: (clientId: string) => ({
      update: createPutEndpoint<
        TClient,
        {
          name: string;
        }
      >(`/clients/${clientId}`, ApiVersion.v1),
      delete: createDeleteEndpoint<TClient>(
        `/clients/${clientId}`,
        ApiVersion.v1,
      ),
    }),
  },
};
