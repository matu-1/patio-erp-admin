export interface OrderInvoiceParams {
  cityId?: number;
  startDate: Date;
  endDate: Date;
}

export interface InvoiceData {
  merchant_id: number;
  merchant: string;
  quantity: number;
  commissionPercentage: number;
  phone: string;
  city: string;
  commissionAmount: number;
  total: number;
  merchantStatus: string;
  merchantEmail: string;
}
