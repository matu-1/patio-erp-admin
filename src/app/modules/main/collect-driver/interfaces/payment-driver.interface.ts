export interface CollectDriver {
  id: number;
  userCreation: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  driverId: number;
  name: string;
  paymentMethod?: number;
  amount: number;
  amountPaid?: number;
  paidAt?: Date;
  startDate: Date;
  endDate: Date;
  balance: number;
  reason?: string;
  category: string
}

export interface PayDriverDto {
  amount: number;
  paymentMethod: number;
}

export interface CollectFilterDto {
  start: Date;
  end: Date;
  isPayment?: number;
  type?: number;
}
