import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import {
  InvoiceDetail,
  PDFArray,
} from '../../main/factura/interfaces/invoice-info.interface';
import { formatDate, formatNumber } from '@angular/common';
import {
  InvoiceDataDetail,
  PaymentMerchant,
  PaymentMerchantOrder,
} from '../../main/factura/interfaces/invoice-detail.interface';
import { formatToNumber } from 'src/app/utils/utils';
import { PAYMENT_MODE_ID } from 'src/app/constants/constant';

export const additionalServiceColumns: TableColumns<InvoiceDetail> = [
  {
    field: 'id',
    headerName: 'Id',
  },
  {
    field: 'razon_adicional',
    headerName: 'Local',
    valueFormatter: (value) => `${value.razon_adicional} * ${value.local}`,
  },
  {
    field: 'nro_pedidos',
    headerName: 'Cant. Pedidos',
    valueFormatter: ({ nro_pedidos }) => formatNumber(nro_pedidos, 'es'),
  },
  {
    field: 'monto',
    headerName: 'Monto',
    valueFormatter: ({ monto }) => formatNumber(Number(monto), 'es', '.2-2'),
  },
];

export const salesColumns: TableColumns<InvoiceDetail> = [
  {
    field: 'id',
    headerName: 'Id',
  },
  {
    field: 'local',
    headerName: 'Local',
  },
  {
    field: 'nro_pedidos',
    headerName: 'Cant. Pedidos',
    valueFormatter: ({ nro_pedidos }) => formatNumber(nro_pedidos, 'es'),
  },
  {
    field: 'monto_sin_comision',
    headerName: 'Monto pedidos',
    valueFormatter: ({ monto_sin_comision }) =>
      formatNumber(Number(monto_sin_comision), 'es', '.2-2'),
  },
  {
    field: 'porcentaje_comision',
    headerName: 'Comisión',
    valueFormatter: ({ porcentaje_comision }) =>
      formatNumber(Number(porcentaje_comision), 'es', '.2-2'),
  },
  {
    field: 'monto',
    // field: 'monto_conciliado',
    headerName: 'Monto',
    valueFormatter: ({ monto }) => formatNumber(Number(monto), 'es', '.2-2'),
  },
  {
    field: 'actions',
    headerName: 'Acciones',
  },
];

export const salesExcelColumns: TableColumns<PDFArray> = [
  {
    field: 'id_pedido',
    headerName: 'Id Pedido',
  },
  {
    field: 'fecha',
    headerName: 'Fecha',
    valueFormatter: ({ fecha }) => formatDate(fecha, 'dd/MM/yyyy', 'es'),
  },
  {
    field: 'fecha_hora',
    headerName: 'Fecha Hora',
    valueFormatter: ({ fecha_hora }) =>
      formatDate(fecha_hora, 'dd/MM/yyyy HH:mm', 'es'),
  },
  {
    field: 'monto',
    headerName: 'Monto por Pedido',
    valueFormatter: ({ monto }) => formatNumber(Number(monto), 'es', '.2-2'),
  },
  {
    field: 'porcentaje_comision',
    headerName: 'Comisión',
    valueFormatter: ({ porcentaje_comision }) =>
      formatNumber(Number(porcentaje_comision), 'es'),
  },
  {
    field: 'monto_neto',
    headerName: 'Monto por Pagar',
    valueFormatter: ({ monto_neto }) =>
      formatNumber(Number(monto_neto), 'es', '.2-2'),
  },
  {
    field: 'metodo_pago',
    headerName: 'Método Pago',
  },
];

export const paymentMerchantsColumns: TableColumns<PaymentMerchant> = [
  {
    field: 'merchantId',
    headerName: 'Id',
  },
  {
    field: 'merchant',
    headerName: 'Local',
  },
  {
    field: 'quantity',
    headerName: 'Cant. Pedidos',
    valueFormatter: ({ quantity }) => quantity,
  },
  {
    field: 'total',
    headerName: 'Monto pedidos',
    valueFormatter: ({ total }) => formatToNumber(total),
  },
  {
    field: 'totalOrder',
    headerName: 'Total Order',
    valueFormatter: ({ totalOrder }) => formatToNumber(totalOrder),
  },
  {
    field: 'commissionPercentage',
    headerName: 'Comisión',
    valueFormatter: ({ commissionPercentage }) =>
      formatToNumber(commissionPercentage),
  },
  {
    // field: 'monto',
    field: 'commissionAmount',
    headerName: 'Monto',
    valueFormatter: ({ commissionAmount }) => formatToNumber(commissionAmount),
  },
  {
    field: 'actions',
    headerName: 'Acciones',
  },
];

export const paymentMerchantExcelColumns: TableColumns<PaymentMerchantOrder> = [
  {
    field: 'id',
    headerName: 'Id Pedido',
  },
  {
    field: 'createdAt',
    headerName: 'Fecha',
    valueFormatter: ({ createdAt }) =>
      formatDate(createdAt, 'dd/MM/yyyy HH:mm', 'es'),
  },
  {
    field: 'monto',
    headerName: 'Monto por Pedido',
    valueFormatter: ({ total }) => formatToNumber(Number(total)),
  },
  {
    field: 'commissionPercentage',
    headerName: 'Comisión',
    valueFormatter: ({ commissionPercentage }) =>
      formatToNumber(Number(commissionPercentage)),
  },
  {
    field: 'monto_neto',
    headerName: 'Monto por Pagar',
    valueFormatter: ({ commissionAmount }) =>
      formatToNumber(Number(commissionAmount)),
  },
  {
    field: 'paymentModeId',
    headerName: 'Método Pago',
    valueFormatter: ({ paymentModeId }) => PAYMENT_MODE_ID[paymentModeId],
  },
];
