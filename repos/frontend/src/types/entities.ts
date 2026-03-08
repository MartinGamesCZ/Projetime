export interface ICUDTimestamp {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type TProject = {
  id: string;
  name: string;
  rate: number;
  client: TClient;
} & ICUDTimestamp;

export type TClient = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
} & ICUDTimestamp;
