import { TableColumns } from 'src/app/components/data-table/data-table.interface';
import {
  InvoiceDetail,
  PDFArray,
} from '../../main/factura/interfaces/invoice-info.interface';
import { formatDate, formatNumber } from '@angular/common';

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
