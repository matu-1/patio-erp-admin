import { formatDate, formatNumber } from '@angular/common';
import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import { FormatDate } from 'src/app/utils/format.date.util';
import { paymentMethod } from '../constants/payment-method';
import { PaymentDriver } from '../interfaces/payment-driver.interface';
import { Payment } from '../interfaces/payment.interface';
import { paymentsDriverColumns as collectsDriverColumns } from '../../collect-driver/configs/table-columns';

export const paymentsDriverColumns: TableColumns<PaymentDriver> = [
  ...collectsDriverColumns,
];
paymentsDriverColumns.splice(8, 2)

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
