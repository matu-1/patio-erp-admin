export interface PayOrderTip {
  amount: number;
  orderId: number
}

export interface UpdateTipOrder {
  providerId: number;
  orderId: number
}

export interface PaymentInfo {
  id: string;
  object: string;
  after_expiration: null;
  allow_promotion_codes: null;
  amount_subtotal: number;
  amount_total: number;
  automatic_tax: any;
  billing_address_collection: null;
  cancel_url: null;
  client_reference_id: null;
  client_secret: null;
  consent: null;
  consent_collection: null;
  created: number;
  currency: string;
  currency_conversion: null;
  custom_fields: any[];
  custom_text: any;
  customer: null;
  customer_creation: string;
  customer_details: null;
  customer_email: null;
  expires_at: number;
  invoice: null;
  invoice_creation: any;
  livemode: boolean;
  locale: null;
  metadata: any;
  mode: string;
  payment_intent: null;
  payment_link: null;
  payment_method_collection: string;
  payment_method_configuration_details: any;
  payment_method_options: any;
  payment_method_types: string[];
  payment_status: string;
  phone_number_collection: any;
  recovered_from: null;
  setup_intent: null;
  shipping_address_collection: null;
  shipping_cost: null;
  shipping_details: null;
  shipping_options: any[];
  status: string;
  submit_type: null;
  subscription: null;
  success_url: string;
  total_details: any;
  ui_mode: string;
  url: string;
}
