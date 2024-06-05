export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  webhookUrl: string;
  collectorId?: number;
  createdAt: Date; //str
  updatedAt: Date; //str
  deletedAt: null;
}
