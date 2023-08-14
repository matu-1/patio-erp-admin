export interface DriverEarning {
  id: number;
  name: string;
  email: string;
  modality_id: number;
  phone: string;
  modality: string;
  country: string;
  city_id: number;
  detail: EarningDetail[];
  total: number;
}

export interface EarningDetail {
  date: Date;
  quantity: number;
  total: number;
  totalEarning: number;
  tips: number;
  discounts: number;
  extraEarning: number;
  extraEarningPoints: number;
  discountsService: number;
  hoursWorked: number;
  totalFareCustomerDelivery: number;
  totalFareCompanyDelivery: number;
  totalBonus: number;
  timingExtraAmount: number;
  totalDistance: number | null;
  totalPrepaidAmount: number;
  timingBonus: number;
  amountHour?: number;
}
