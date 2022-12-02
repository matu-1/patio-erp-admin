import { formatDate, formatNumber } from '@angular/common';
import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import { FormatDate } from 'src/app/utils/format.date.util';
import { paymentMethod } from '../constants/payment-method';
import { PaymentDriver } from '../interfaces/payment-driver.interface';
import { Payment } from '../interfaces/payment.interface';

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

export const paymentsColumns: TableColumns<Payment> = [
  {
    field: 'id',
    headerName: 'Id',
  },
  {
    field: 'amount',
    headerName: 'Monto',
    valueFormatter: ({ amount }) => formatNumber(Number(amount), 'es', '.2-2'),
  },
  {
    field: 'paymentMethod',
    headerName: 'Método Pago',
    valueFormatter: (value) => paymentMethod[value.paymentMethod],
  },
  {
    field: 'paidAt',
    headerName: 'Pagado el',
    valueFormatter: ({ paidAt }) => FormatDate.short(paidAt),
  },
  {
    field: 'createdAt',
    headerName: 'Creado el',
    valueFormatter: ({ createdAt }) =>
      formatDate(createdAt, 'dd/MM/yyyy HH:mm', 'es'),
  },
];
