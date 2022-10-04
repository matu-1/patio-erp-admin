export interface HoursWorkedDriver {
  id: number;
  name: string;
  phoneNumber: string;
  amountHour: number;
  modality: string;
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
}

export interface OrderDto {
  id: number;
  client: string;
  tip: number;
  createdAt: Date;
  updatedAt: Date;
  to_address: string;
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
}

export interface HoursWorkedDto {
  start: Date;
  end: Date;
  cityId?: number;
}
