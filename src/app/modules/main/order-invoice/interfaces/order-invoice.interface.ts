import { PaginationDto } from 'src/app/utils/pagination.dto';

export interface OrderInvoice {
  id: number;
  userCreation: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  city: string;
  cityId: number;
  comments: null;
  commission: number;
  verifiedContact: number;
  email: string;
  status: number;
  clientStatus: string;
  collectionStatus: null;
  collectionDate: null;
  issueDate: Date;
  management: number;
  clientId: number;
  collectorId: null;
  uncollectible: number;
  month: number;
  amount: string;
  reconciledAmount: string;
  uncollectibleAmount: null;
  salesAmount: string;
  nit: null;
  clientName: string;
  collectorName: null;
  invoiceNumber: null;
  paid: number;
  schedules: null;
  businessName: null;
  representative: null;
  balance: string;
  phone: string;
  quantity: number;
  issue_date: string;
}

export interface ParamsOrderInvoice extends PaginationDto {}

export interface RevertPaymentOrderInvoiceDto {
  gloss: string;
  invoiceId: number;
}

export interface SchedulePaymentDto {
  invoiceId: number;
  collectionDate: Date;
}

export interface PayOrderInvoiceDto {
  amount: number;
  paidAt: Date;
  reason?: string; //glosa
  orderInvoiceId: number;
  accountingAccountId?: number;
  cashId?: number; //cajaId
}

export interface UpdateOrderInvoiceDto {
  city: string;
  cityId: number;
  comments?: string;
  commission: number;
  verifiedContact: number;
  email?: string;
  status: number; //[No Recibida, Recibida]
  clientStatus: string;
  collectionStatus?: string; //cobro
  collectionDate?: Date;
  issueDate: Date; //fecha emision
  management: number;
  clientId: number;
  collectorId?: number; //cobrador
  uncollectible: number; //0,1
  month: number;
  amount: number;
  reconciledAmount: number;
  uncollectibleAmount?: number;
  salesAmount: number; //total
  nit?: string;
  clientName: string;
  collectorName?: string;
  invoiceNumber?: number;
  paid: number; //[no,pagado,parcial,conciliado,incobrable]
  schedules?: number;
  businessName?: string;
  representative?: string;
  balance: number;
  phone?: string;
  quantity: number;
}
