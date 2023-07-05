import { Driver } from '../../../public/interfaces/driver.interface';
import { BankAccount } from './hours-worked-driver.interface';
import { CollectDriver } from '../../collect-driver/interfaces/payment-driver.interface';

export interface Document {
  id: number;
  title: string;
  photoUrl: string;
  documentTypeId: number;
  createdAt: string;
}
export interface DriverDto extends Driver {
  bankAccount: BankAccount;
  documents: Document[];
  paymentsDriver: CollectDriver;
}
