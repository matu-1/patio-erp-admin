import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import { FormatDate } from 'src/app/utils/format.date.util';
import { Invoice } from '../interfaces/invoice.interface';

export const invoiceColumns: TableColumns<Invoice> = [
  {
    field: 'id',
    headerName: 'Id',
  },
  {
    field: 'merchant',
    headerName: 'Merchant',
  },
  {
    field: 'description',
    headerName: 'Description',
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
  },
  {
    field: 'fee',
    headerName: 'Fee',
  },
  {
    field: 'amount',
    headerName: 'Amount',
  },
  {
    field: 'tips',
    headerName: 'Tips',
  },
  {
    field: 'discounts',
    headerName: 'Discounts',
    valueFormatter: ({ discounts }) =>
      discounts
        .map((discount) => `${discount.description} (${discount.amount} )`)
        .join(', '),
  },
  {
    field: 'total',
    headerName: 'Total',
  },
  {
    field: 'period',
    headerName: 'Period',
    valueFormatter: ({ startDate, endDate }) =>
      `${FormatDate.short(startDate)} to ${FormatDate.short(endDate)}`,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    valueFormatter: ({ createdAt }) => FormatDate.dateMoment(createdAt),
  },
  {
    field: 'backupUrl',
    headerName: 'Backup',
  },
  {
    field: 'actions',
    headerName: 'Actions',
  },
];
