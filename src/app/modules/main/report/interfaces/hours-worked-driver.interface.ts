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
}

export interface BankAccount {
  id: number;
  accountNumber: string;
  bankName: string;
  identityNumber: string;
  accountType: string;
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
}

interface EarningBase {
  minutes: number;
  amountHour: number;
  earning: number;
  tipFinal: number;
  discounts: number;
  totalEarning: number;
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
