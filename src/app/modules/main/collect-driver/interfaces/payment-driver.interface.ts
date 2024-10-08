import { HoursWorkedDriver } from '../../report/interfaces/hours-worked-driver.interface';

export interface CollectDriver {
  id: number;
  userCreation: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  driverId: number;
  name: string;
  cityId: number;
  amount: number;
  paidAt?: Date;
  startDate: Date;
  endDate: Date;
  balance: number;
  reason?: string;
  category: string;
  observation?: string;
  averageCompleted?: number;
  detail?: HoursWorkedDriver;
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
  showDetails?: number;
}

export interface CreateCollectDriver
  extends Omit<
    CollectDriver,
    | 'id'
    | 'userCreation'
    | 'createdAt'
    | 'updatedAt'
    | 'deletedAt'
    | 'paidAt'
    | 'startDate'
    | 'endDate'
  > {}
