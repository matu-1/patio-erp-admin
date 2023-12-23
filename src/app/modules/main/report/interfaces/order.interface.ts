import { EarningBase } from './hours-worked-driver.interface';

export interface Order {
  id: number;
  from_address_geocoder: string;
  to_address_geocoder: string;
  from_address: string;
  from_latitude: number;
  from_longitude: number;
  to_address: string;
  to_latitude: number;
  to_longitude: number;
  h3_hexagon_id: string;
  meters_estimated_distance: number;
  phone_user: string;
  name_user: string;
  status: string;
  tip: number;
  tip_original: number;
  total: number;
  discount: number;
  merchant_id: number | null;
  city_id: number;
  createdAt: Date;
  updatedAt: Date;
  creation_date: Date;
  payment_mode_id: number;
  details: null | string;
  coverage_id: number;
  user_id: number;
  comment: null | string;
  order_ready: number;
  order_ready_at: null;
  photo_delivery_url: null;
  rating: null;
  accepted_by: null;
  accepted_at: null;
  paymentModeId: number;
  merchant: Merchant | null;
  assignedDrivers: AssignedDriver[] | null;
  orderStatus: OrderStatus[] | null;
  earningBase: EarningBase;
  bonus: number;
  is_pickup: number;
  is_refund: number;
  store_name: string;
  instructions: string;
  has_drink: number;
  multiple_delivery: number;
  order_provider: string;
  provider_id: string;
  fullProvider: string;
}

export interface Merchant {
  name: string;
}

export interface AssignedDriver {
  id: number;
  name: string;
  modality: string;
  driverOrderId: number;
  fare_company_delivery: number;
  fare_customer_delivery: number;
}

export interface OrderStatus {
  status: string;
  createdAt: Date;
  userId: number;
}

export type FilterOrder = {
  cityId?: number;
  merchantId?: number;
  startDate: Date;
  endDate: Date;
  driverStatus?: string;
};
