import axios from "axios";

export enum ApiVersion {
  v1 = "v1",
}

export type ApiErrorResponse = {
  isOk: false;
  message: string;
};

export type ApiSuccessResponse<ResponseType> = {
  isOk: true;
  data: ResponseType;
};

export type ApiResponse<ResponseType> =
  | ApiSuccessResponse<ResponseType>
  | ApiErrorResponse;

export type ApiGetEndpoint<ResponseType> = () => Promise<
  ApiResponse<ResponseType>
>;

export type ApiPostEndpoint<ResponseType, BodyType> = (
  body: BodyType,
) => Promise<ApiResponse<ResponseType>>;

export type ApiPutEndpoint<ResponseType, BodyType> = (
  body: BodyType,
) => Promise<ApiResponse<ResponseType>>;

export type ApiPatchEndpoint<ResponseType, BodyType> = (
  body: BodyType,
) => Promise<ApiResponse<ResponseType>>;

export type ApiDeleteEndpoint<ResponseType> = () => Promise<
  ApiResponse<ResponseType>
>;

function constructErrorResponse(error: any): ApiErrorResponse {
  return {
    isOk: false as const,
    message: error.message as string,
  };
}

function constructSuccessResponse<ResponseType>(
  data: any,
): ApiSuccessResponse<ResponseType> {
  return {
    isOk: true as const,
    data: data as ResponseType,
  };
}

async function proc<ResponseType>(promise: Promise<any>) {
  const res = await promise.catch((e) => ({
    error: e,
  }));

  if ("error" in res) return constructErrorResponse(res.error);

  return constructSuccessResponse<ResponseType>(res.data);
}

const backend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_ADDRESS,
});

export function createGetEndpoint<ResponseType>(
  path: string,
  version: ApiVersion,
): ApiGetEndpoint<ResponseType> {
  return async () =>
    await proc<ResponseType>(backend.get(`/api/${version}${path}`));
}

export function createPostEndpoint<ResponseType, BodyType>(
  path: string,
  version: ApiVersion,
): ApiPostEndpoint<ResponseType, BodyType> {
  return async (body: BodyType) =>
    await proc<ResponseType>(backend.post(`/api/${version}${path}`, body));
}

export function createPutEndpoint<ResponseType, BodyType>(
  path: string,
  version: ApiVersion,
): ApiPutEndpoint<ResponseType, BodyType> {
  return async (body: BodyType) =>
    await proc<ResponseType>(backend.put(`/api/${version}${path}`, body));
}

export function createPatchEndpoint<ResponseType, BodyType>(
  path: string,
  version: ApiVersion,
): ApiPatchEndpoint<ResponseType, BodyType> {
  return async (body: BodyType) =>
    await proc<ResponseType>(backend.patch(`/api/${version}${path}`, body));
}

export function createDeleteEndpoint<ResponseType>(
  path: string,
  version: ApiVersion,
): ApiDeleteEndpoint<ResponseType> {
  return async () =>
    await proc<ResponseType>(backend.delete(`/api/${version}${path}`));
}
