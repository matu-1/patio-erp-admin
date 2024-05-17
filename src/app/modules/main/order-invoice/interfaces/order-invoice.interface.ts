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
}

export interface ParamsOrderInvoice extends PaginationDto {}

export interface RevertPaymentOrderInvoiceDto {
  gloss: string;
  invoiceId: number;
}
