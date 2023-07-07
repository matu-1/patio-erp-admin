export interface OrderCashDto {
  driverId: number;
  driver: string;
  driverPhone: string;
  createdAt: string;
  driverOrderCreatedAt: string;
  client: string;
  merchant: string;
  id: number;
  total: number;
}

export interface FindCashOrderDto {
  start: Date;
  end: Date;
  cityId: number;
}
