export interface InvoiceDataDetail {
  // ordersSumAll: number;
  // pedidosSum: string;
  // montoNetoSum: string;
  // date: string;
  // mes: number;
  // gestion: string;
  // // id: number;
  // isPagado: boolean;
  // isVisto: boolean;
  // programado: string;
  // telefono: string;
  // email: string;
  urlMultipago: string;
  ///
  quantity: number;
  commissionAmount: number;
  total: number;
  name: string;
  email: string;
  phone: string;
  id: number;
  date: string;
  management: number;
  month: number;
  paymentMerchants: PaymentMerchant[];
}

export interface PaymentMerchant {
  // id_servicio: string;
  // razon_adicional: null | string;
  // porcentaje_comision_local: number;
  // latitude: string;
  // longitude: string;
  clientId: number;
  client: string;
  quantity: number;
  commissionPercentage: number;
  phone: string;
  city: string;
  commissionAmount: number;
  total: number;
  clientStatus: string;
  clientEmail: string;
  email: string;
  excel: PaymentMerchantExcel;
  pdf: PaymentMerchantPDF;
}

export interface PaymentMerchantExcel {
  month: number;
  management: number;
  orders: PaymentMerchantOrder[];
}

export interface PaymentMerchantOrder {
  id: number;
  paymentModeId: number;
  commissionPercentage: number;
  createdAt: Date;
  total: number;
  commissionAmount: number;
}

export interface PaymentMerchantPDF {
  city: string;
  date: string;
  month: number;
  management: number;
  invoiceId: string;
  total: number;
  commissionAmount: number;
  name: string;
  client: string;
  orders: PaymentMerchantOrder[];
}
