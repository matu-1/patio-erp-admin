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
  tip_original: number;
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
  products?: Product[];
  instructions?: string;
}

export interface AssignedDriver {
  id: number;
  name: string;
  driverOrderId: number;
  fare_customer_delivery: number;
  fare_company_delivery: number;
  latitude: number;
  longitude: number;
  phoneNumber: string;
}

export interface Merchant {
  name: string;
}

interface Product {
  price: number;
  quantity: number;
  name: string;
  description: string;
  productId: number;
}
