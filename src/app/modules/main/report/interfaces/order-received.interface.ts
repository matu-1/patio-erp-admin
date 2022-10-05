export interface OrderReceived {
  driver_id: number;
  order_id: number;
  driver: string;
  merchant: string;
  client: string;
  to_address: string;
  earning: number;
  tip: number;
  total: number;
  moneyReceived: number;
  moneyToReturn: number;
  createdAt: string;
}
