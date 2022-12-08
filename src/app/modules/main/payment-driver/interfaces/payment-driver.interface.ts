import {
  CollectDriver,
  CollectFilterDto,
} from '../../collect-driver/interfaces/payment-driver.interface';

export interface PaymentDriver extends CollectDriver {}

export interface PayDriverDto {
  amount: number;
  paymentMethod: number;
}

export interface PaymentFilterDto extends CollectFilterDto {}
