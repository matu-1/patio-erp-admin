import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import { OrderInvoice } from '../interfaces/order-invoice.interface';
import { FormatDate } from 'src/app/utils/format.date.util';

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
    valueFormatter: (v) => v.collectorName ?? '---',
  },
  {
    field: 'reconciledAmount',
    headerName: 'Monto',
  },
  {
    field: 'balance',
    headerName: 'Saldo',
  },
  {
    field: 'status',
    headerName: 'Estado',
  },
  {
    field: 'collectionDate',
    headerName: 'Fecha Cobro',
    valueFormatter: (v) =>
      v.collectionDate ? FormatDate.shortMoment(v.collectionDate!) : '---',
  },
  {
    field: 'schedules',
    headerName: 'Rep.',
  },
  {
    field: 'commission',
    headerName: 'Comisión',
  },
  {
    field: 'actions',
    headerName: 'Acciones',
  },
];
