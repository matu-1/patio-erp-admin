export interface OrderDto {
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
  total: number;
  discount: number;
  merchant_id: number;
  city_id: number;
  createdAt: Date;
  updatedAt: Date;
  payment_mode_id: number;
  details: string;
  coverage_id: number;
  user_id: number;
  comment: string;
  order_ready: number;
  order_ready_at: null;
  photo_delivery_url: null;
  rating: null;
  accepted_by: null;
  accepted_at: null;
  paymentModeId: number;
  merchant: Merchant;
  assignedDrivers?: AssignedDriver[];
}

export interface AssignedDriver {
  id: number;
  name: string;
  driverOrderId: number;
  fare_customer_delivery: number;
  fare_company_delivery: number;
  latitude: number;
  longitude: number;
}

export interface Merchant {
  name: string;
}

export interface Driver {
  id: number;
  name: string;
  lastname: string;
  phone: string;
  email: string;
  rating: number;
  status: string;
  wallet: number;
  last_login: Date;
  app_version: string;
  device: string;
  referred_code: string;
  birthday: Date;
  last_latitude: string;
  last_longitude: string;
  last_sync: null;
  role: string;
  city_id: number;
  orderCapacity: number;
  timezone_id: number;
  photoUrl: null;
  contractUrl: string;
  signatureUrl: null;
  identityNumber: null;
  address: null;
  extraAmount: number;
  modalityId: number;
  paymentOption: number;
  warrantyAmount: number;
  bearing: number;
  jugnoId: null;
  createdAt: Date;
  updatedAt: Date;
  city: Ity;
  modality: Ity;
}

export interface Ity {
  name: string;
}
