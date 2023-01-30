export interface CollectMerchantParams {
  start: Date;
  end: Date;
  merchants: string;
}

export interface CollectMerchantDto {
  '#': number;
  'RESTAURANT NAME': string;
  'STORE NAME': string;
  'FROM ADDRESS': string;
  'TO ADDRESS': string;
  LATITUDE: number;
  LONGITUDE: number;
  'ID PROVIDER': string;
  'ID TCC': number;
  'BASIC FEE': number;
  'TIP ORIGINAL': number;
  TIP: number;
  'USER NAME': string;
  'USER PHONE': string;
  'ORDER PROVIDER': string;
  'DRIVER NAME'?: string;
  'PREPARATION TIME': number;
  'DELIVERY TIME': Number;
  'DISTANCE MILES': number;
  SUBTOTAL: number;
  DATE: string;
  status: string;
  ISSUE?: string;
  COMMENT: string;
  photo_delivery_url?: string;
}
