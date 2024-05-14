import { InvoiceDataDetail } from '../../main/factura/interfaces/invoice-detail.interface';

export interface OrderInvoiceInfo extends InvoiceDataDetail {
  urlMultipago: string;
  invoiceId: number;
  programmed: null;
  viewed: boolean;
  paid: boolean;
}
