export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  webhookUrl: string;
  createdAt: Date; //str
  updatedAt: Date; //str
  deletedAt: null;
}
