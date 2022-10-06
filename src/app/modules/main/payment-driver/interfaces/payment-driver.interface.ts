import { CollectFilterDto } from '../../collect-driver/interfaces/payment-driver.interface';

export interface PaymentDriver {
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
}

export interface PayDriverDto {
  amount: number;
  paymentMethod: number;
}

export interface PaymentFilterDto extends CollectFilterDto {}
