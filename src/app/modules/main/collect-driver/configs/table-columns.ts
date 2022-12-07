import { formatDate, formatNumber } from '@angular/common';
import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import { PaymentDriver } from '../interfaces/payment-driver.interface';

export const paymentsDriverColumns: TableColumns<PaymentDriver> = [
  {
    field: 'driverId',
    headerName: 'Id Driver',
  },
  {
    field: 'name',
    headerName: 'Nombre',
  },
  {
    field: 'phoneNumber',
    headerName: 'Telefono',
  },
  {
    field: 'amount',
    headerName: 'Monto',
    valueFormatter: ({ amount }) => formatNumber(amount, 'es', '.2-2'),
  },
  {
    field: 'balance',
    headerName: 'Saldo',
    valueFormatter: ({ balance }) =>
      balance ? formatNumber(balance, 'es', '.2-2') : '---',
  },
  {
    field: 'paidAt',
    headerName: 'Pagado el',
    valueFormatter: ({ paidAt }) =>
      paidAt ? formatDate(paidAt, 'dd/MM/yyyy HH:mm', 'es') : '---',
  },
  {
    field: 'startDate',
    headerName: 'Fechas',
    valueFormatter: ({ startDate, endDate }) =>
      formatDate(startDate, 'dd/MM/yyyy', 'es') +
      ' - ' +
      formatDate(endDate, 'dd/MM/yyyy', 'es'),
  },
  {
    field: 'createdAt',
    headerName: 'Creado el',
    valueFormatter: ({ createdAt }) =>
      formatDate(createdAt, 'dd/MM/yyyy HH:mm', 'es'),
  },
  {
    field: 'actions',
    headerName: 'Acciones',
  },
];
