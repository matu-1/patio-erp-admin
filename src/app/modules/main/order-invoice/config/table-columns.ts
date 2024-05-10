import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import { OrderInvoice } from '../interfaces/order-invoice.interface';

export const orderInvoiceColumns: TableColumns<OrderInvoice> = [
  {
    field: 'id',
    headerName: 'Recibo #',
  },
  {
    field: 'periodo',
    headerName: 'Periodo',
    valueFormatter: (v) => `${v.management}-${v.month}`,
  },
  {
    field: 'clientName',
    headerName: 'Cliente',
  },
  {
    field: 'collectorName',
    headerName: 'Cobrador',
  },
];
