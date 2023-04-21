export interface HoursWorkedDriver {
  id: number;
  name: string;
  phoneNumber: string;
  amountHour: number;
  modality: string;
  modalityId: number;
  hoursWorked: number;
  orderQuantity: number;
  discounts: number;
  fees: number;
  extraFees: number;
  totalFees: number;
  tips: number;
  total: number;
  totalEarning: number;
  quantity: number;
  orders: OrderDto[];
  timings: TimingDto[];
  totalDistance: number;
  totalBonus: number;
  extraEarning: number;
  bankAccount: BankAccount;
  timingExtraAmount: number;
  average: number;
  totalPrepaidAmount: number;
}

export interface BankAccount {
  id: number;
  accountNumber: string;
  bankName: string;
  identityNumber: string;
  accountType: string;
  verified: number;
  driverId: number;
  routingNumber?: string;
  phone?: string;
  name?: string;
  address?: string;
  socialSecurity?: string;
  type: number;
  paymentMethod?: string;
}

export interface OrderDto {
  id: number;
  client: string;
  tip: number;
  createdAt: Date;
  updatedAt: Date;
  to_address: string;
  distance: number;
  modalityId: number;
  earningBase: EarningBase;
  bonus: number;
  tip_original: number;
}

export interface EarningBase {
  minutes: number;
  amountHour: number;
  earning: number;
  tipFinal: number;
  discounts: number;
  totalEarning: number;
  earningDistance: number;
  earningWaiting: number;
}

export interface TimingDto {
  start_timing: Date;
  arrived_at: Date;
  deserted_at?: Date;
  end_timing: Date;
  lastOrderAt: Date;
  lastOrderId: number;
  endFinal: Date;
  timing_id: number;
  startFinal: Date;
}

export interface HoursWorkedDto {
  start: Date;
  end: Date;
  cityId?: number;
}
