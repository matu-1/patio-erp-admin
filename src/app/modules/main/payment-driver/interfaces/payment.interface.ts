export interface Payment {
  id: number;
  userCreation: null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  amount: string;
  paymentMethod: number;
  reason: null;
  paidAt: Date;
  paymentDriverId: number;
}
