import {
  CollectDriver,
  CollectFilterDto,
} from '../../collect-driver/interfaces/payment-driver.interface';

export interface PaymentDriver extends CollectDriver {}

export interface PayDriverDto {
  amount: number;
  paymentMethod: number;
  paidAt: Date;
}

export interface PaymentFilterDto extends CollectFilterDto {}

type PaymentAmountDto = {
  id: number;
  amount: number;
};
export interface PayDriverMultipleDto extends PayDriverDto {
  paymentAmounts: PaymentAmountDto[];
}

export interface UpdatePaymentDriverDto
  extends Pick<PaymentDriver, 'observation'> {}
