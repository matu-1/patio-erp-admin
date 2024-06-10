export interface OrderInvoiceParams {
  cityId?: number;
  startDate: Date;
  endDate: Date;
}

export interface InvoiceData {
  clientId: number;
  client: string;
  quantity: number;
  commissionPercentage: number;
  phone: string;
  city: string;
  commissionAmount: number;
  total: number;
  totalOrder: number;
  clientStatus: string;
  clientEmail: string;
}

export interface CreateMultiOrderInvoiceDto {
  startDate: Date;
  endDate: Date;
  cityId?: number;
}
