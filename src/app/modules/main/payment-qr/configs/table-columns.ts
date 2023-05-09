import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import { PaymentQR } from '../interfaces/payment-qr.interface';
import { formatNumber, formatDate } from '@angular/common';

export const paymentQrColumns: TableColumns<PaymentQR> = [
  {
    field: 'idtransaccion',
    headerName: 'Id Transacción',
  },
  {
    field: 'sistema',
    headerName: 'Sistema',
  },
  {
    field: 'orderid',
    headerName: 'Order Id',
  },
  {
    field: 'monto',
    headerName: 'Monto',
    valueFormatter: ({ monto }) => formatNumber(Number(monto), 'es', '.2-2'),
  },
  {
    field: 'payment_method',
    headerName: 'Método Pago',
  },
  {
    field: 'DateModification',
    headerName: 'Actualizado el',
    valueFormatter: ({ DateModification }) =>
      formatDate(DateModification, 'dd/MM/yyyy HH:mm', 'es'),
  },
];
